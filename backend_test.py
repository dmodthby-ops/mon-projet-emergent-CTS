#!/usr/bin/env python3
"""
CASHTOK System Backend API Tests
Tests all endpoints for the CASHTOK landing page and business management system
"""

import requests
import json
import uuid
from datetime import datetime
import time

# Backend URL from frontend/.env
BACKEND_URL = "https://tiktok-income-3.preview.emergentagent.com"

class CashtokAPITester:
    def __init__(self, base_url):
        self.base_url = base_url
        self.session = requests.Session()
        self.test_results = []
        
    def log_test(self, test_name, success, details=""):
        """Log test results"""
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}")
        if details:
            print(f"   Details: {details}")
        self.test_results.append({
            "test": test_name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        })
        
    def test_health_endpoints(self):
        """Test health check and root endpoints"""
        print("\n=== TESTING HEALTH ENDPOINTS ===")
        
        # Test health check
        try:
            response = self.session.get(f"{self.base_url}/api/health")
            if response.status_code == 200:
                data = response.json()
                if "status" in data and data["status"] == "healthy":
                    self.log_test("Health Check", True, f"Status: {data['status']}")
                else:
                    self.log_test("Health Check", False, f"Unexpected response: {data}")
            else:
                self.log_test("Health Check", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Health Check", False, f"Exception: {str(e)}")
            
        # Test root endpoint
        try:
            response = self.session.get(f"{self.base_url}/api/")
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "CASHTOK" in data["message"]:
                    self.log_test("Root Endpoint", True, f"Message: {data['message']}")
                else:
                    self.log_test("Root Endpoint", False, f"Unexpected response: {data}")
            else:
                self.log_test("Root Endpoint", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Root Endpoint", False, f"Exception: {str(e)}")
    
    def test_testimonials(self):
        """Test testimonials endpoints"""
        print("\n=== TESTING TESTIMONIALS ===")
        
        try:
            response = self.session.get(f"{self.base_url}/api/testimonials")
            if response.status_code == 200:
                testimonials = response.json()
                if isinstance(testimonials, list) and len(testimonials) > 0:
                    # Check if testimonials have required fields
                    first_testimonial = testimonials[0]
                    required_fields = ["name", "text", "platform", "revenue", "rating"]
                    has_all_fields = all(field in first_testimonial for field in required_fields)
                    
                    if has_all_fields:
                        self.log_test("Get Testimonials", True, f"Retrieved {len(testimonials)} testimonials")
                        
                        # Verify seeded data
                        sophie_found = any(t.get("name") == "Sophie Martinez" for t in testimonials)
                        marc_found = any(t.get("name") == "Marc Dubois" for t in testimonials)
                        
                        if sophie_found and marc_found:
                            self.log_test("Testimonials Seeding", True, "Found expected seeded testimonials")
                        else:
                            self.log_test("Testimonials Seeding", False, "Missing expected seeded testimonials")
                    else:
                        self.log_test("Get Testimonials", False, f"Missing required fields in testimonials")
                else:
                    self.log_test("Get Testimonials", False, "No testimonials returned or invalid format")
            else:
                self.log_test("Get Testimonials", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Get Testimonials", False, f"Exception: {str(e)}")
    
    def test_faqs(self):
        """Test FAQ endpoints"""
        print("\n=== TESTING FAQs ===")
        
        try:
            response = self.session.get(f"{self.base_url}/api/faqs")
            if response.status_code == 200:
                faqs = response.json()
                if isinstance(faqs, list) and len(faqs) > 0:
                    # Check if FAQs have required fields
                    first_faq = faqs[0]
                    required_fields = ["question", "answer", "order"]
                    has_all_fields = all(field in first_faq for field in required_fields)
                    
                    if has_all_fields:
                        self.log_test("Get FAQs", True, f"Retrieved {len(faqs)} FAQs")
                        
                        # Verify seeded data and ordering
                        expected_first_question = "Cette formation est-elle adaptée aux débutants complets ?"
                        if faqs[0].get("question") == expected_first_question:
                            self.log_test("FAQs Seeding & Ordering", True, "FAQs properly seeded and ordered")
                        else:
                            self.log_test("FAQs Seeding & Ordering", False, "FAQs not properly ordered or seeded")
                    else:
                        self.log_test("Get FAQs", False, f"Missing required fields in FAQs")
                else:
                    self.log_test("Get FAQs", False, "No FAQs returned or invalid format")
            else:
                self.log_test("Get FAQs", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Get FAQs", False, f"Exception: {str(e)}")
    
    def test_email_marketing(self):
        """Test email marketing endpoints"""
        print("\n=== TESTING EMAIL MARKETING ===")
        
        # Test email subscription
        test_email_data = {
            "email": "marie.dupont@cashtok.com",
            "source": "hero_section",
            "interests": ["tiktok", "instagram"]
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/api/emails/subscribe",
                json=test_email_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                subscriber = response.json()
                if "email" in subscriber and subscriber["email"] == test_email_data["email"]:
                    self.log_test("Email Subscription", True, f"Subscribed: {subscriber['email']}")
                else:
                    self.log_test("Email Subscription", False, f"Unexpected response: {subscriber}")
            else:
                self.log_test("Email Subscription", False, f"Status code: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test("Email Subscription", False, f"Exception: {str(e)}")
        
        # Test duplicate email subscription
        try:
            response = self.session.post(
                f"{self.base_url}/api/emails/subscribe",
                json=test_email_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                self.log_test("Duplicate Email Handling", True, "Duplicate email handled properly")
            else:
                self.log_test("Duplicate Email Handling", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Duplicate Email Handling", False, f"Exception: {str(e)}")
        
        # Test email stats
        try:
            response = self.session.get(f"{self.base_url}/api/emails/stats")
            if response.status_code == 200:
                stats = response.json()
                if "total_subscribers" in stats and "sources" in stats:
                    self.log_test("Email Stats", True, f"Total subscribers: {stats['total_subscribers']}")
                else:
                    self.log_test("Email Stats", False, f"Missing required fields in stats")
            else:
                self.log_test("Email Stats", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Email Stats", False, f"Exception: {str(e)}")
    
    def test_analytics(self):
        """Test analytics endpoints"""
        print("\n=== TESTING ANALYTICS ===")
        
        # Test analytics tracking
        test_session_id = f"test_session_{uuid.uuid4().hex[:8]}"
        test_event_data = {
            "event_type": "page_view",
            "page": "/",
            "device_type": "desktop",
            "session_id": test_session_id
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/api/analytics/track",
                json=test_event_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                event = response.json()
                if "event_type" in event and event["event_type"] == test_event_data["event_type"]:
                    self.log_test("Analytics Tracking", True, f"Tracked event: {event['event_type']}")
                else:
                    self.log_test("Analytics Tracking", False, f"Unexpected response: {event}")
            else:
                self.log_test("Analytics Tracking", False, f"Status code: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test("Analytics Tracking", False, f"Exception: {str(e)}")
        
        # Test multiple event types
        event_types = ["cta_click", "section_view", "form_submit"]
        for event_type in event_types:
            try:
                event_data = {
                    "event_type": event_type,
                    "page": "/",
                    "section": "offers",
                    "device_type": "mobile",
                    "session_id": test_session_id
                }
                
                response = self.session.post(
                    f"{self.base_url}/api/analytics/track",
                    json=event_data,
                    headers={"Content-Type": "application/json"}
                )
                
                if response.status_code == 200:
                    self.log_test(f"Analytics - {event_type}", True, f"Tracked {event_type} event")
                else:
                    self.log_test(f"Analytics - {event_type}", False, f"Status code: {response.status_code}")
            except Exception as e:
                self.log_test(f"Analytics - {event_type}", False, f"Exception: {str(e)}")
        
        # Test analytics stats
        try:
            response = self.session.get(f"{self.base_url}/api/analytics/stats")
            if response.status_code == 200:
                stats = response.json()
                required_fields = ["total_visitors", "total_page_views", "conversion_rate", "device_breakdown"]
                has_all_fields = all(field in stats for field in required_fields)
                
                if has_all_fields:
                    self.log_test("Analytics Stats", True, f"Visitors: {stats['total_visitors']}, Page views: {stats['total_page_views']}")
                else:
                    self.log_test("Analytics Stats", False, f"Missing required fields in stats")
            else:
                self.log_test("Analytics Stats", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Analytics Stats", False, f"Exception: {str(e)}")
    
    def test_chat(self):
        """Test chat endpoints"""
        print("\n=== TESTING CHAT SYSTEM ===")
        
        test_session_id = f"chat_session_{uuid.uuid4().hex[:8]}"
        
        # Test sending a chat message
        test_message_data = {
            "message": "Bonjour, j'aimerais en savoir plus sur la formation CASHTOK. Quels sont les résultats garantis ?",
            "user_name": "Pierre Martin",
            "session_id": test_session_id
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/api/chat/message",
                json=test_message_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                message = response.json()
                if "message" in message and message["message"] == test_message_data["message"]:
                    self.log_test("Send Chat Message", True, f"Message sent by: {message.get('user_name')}")
                else:
                    self.log_test("Send Chat Message", False, f"Unexpected response: {message}")
            else:
                self.log_test("Send Chat Message", False, f"Status code: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test("Send Chat Message", False, f"Exception: {str(e)}")
        
        # Wait a moment for auto-response
        time.sleep(1)
        
        # Test retrieving chat messages
        try:
            response = self.session.get(f"{self.base_url}/api/chat/messages/{test_session_id}")
            if response.status_code == 200:
                messages = response.json()
                if isinstance(messages, list) and len(messages) >= 1:
                    # Should have at least the user message, possibly auto-response
                    user_message_found = any(msg.get("user_name") == "Pierre Martin" for msg in messages)
                    auto_response_found = any(msg.get("is_admin") == True for msg in messages)
                    
                    if user_message_found:
                        self.log_test("Get Chat Messages", True, f"Retrieved {len(messages)} messages")
                        
                        if auto_response_found:
                            self.log_test("Chat Auto-Response", True, "Auto-response generated")
                        else:
                            self.log_test("Chat Auto-Response", False, "No auto-response found")
                    else:
                        self.log_test("Get Chat Messages", False, "User message not found in retrieved messages")
                else:
                    self.log_test("Get Chat Messages", False, "No messages returned or invalid format")
            else:
                self.log_test("Get Chat Messages", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Get Chat Messages", False, f"Exception: {str(e)}")
        
        # Test sending another message to verify conversation flow
        follow_up_message = {
            "message": "Merci pour votre réponse. Pouvez-vous me donner plus de détails sur les prix ?",
            "user_name": "Pierre Martin",
            "session_id": test_session_id
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/api/chat/message",
                json=follow_up_message,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                self.log_test("Chat Conversation Flow", True, "Follow-up message sent successfully")
            else:
                self.log_test("Chat Conversation Flow", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Chat Conversation Flow", False, f"Exception: {str(e)}")
    
    def test_leads(self):
        """Test leads endpoints"""
        print("\n=== TESTING LEADS SYSTEM ===")
        
        # Test creating a lead
        test_lead_data = {
            "email": "prospect@entreprise.fr",
            "name": "Julie Moreau",
            "interest_level": "high",
            "source": "website",
            "notes": "Intéressée par la formation complète, demande un appel de suivi"
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/api/leads",
                json=test_lead_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                lead = response.json()
                if "email" in lead and lead["email"] == test_lead_data["email"]:
                    self.log_test("Create Lead", True, f"Lead created: {lead['name']} ({lead['email']})")
                else:
                    self.log_test("Create Lead", False, f"Unexpected response: {lead}")
            else:
                self.log_test("Create Lead", False, f"Status code: {response.status_code}, Response: {response.text}")
        except Exception as e:
            self.log_test("Create Lead", False, f"Exception: {str(e)}")
        
        # Test creating another lead with different interest level
        test_lead_data_2 = {
            "email": "contact@startup.com",
            "name": "Alexandre Dubois",
            "interest_level": "medium",
            "source": "facebook_ad",
            "notes": "Découvert via publicité Facebook, souhaite plus d'informations"
        }
        
        try:
            response = self.session.post(
                f"{self.base_url}/api/leads",
                json=test_lead_data_2,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                self.log_test("Create Multiple Leads", True, "Second lead created successfully")
            else:
                self.log_test("Create Multiple Leads", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Create Multiple Leads", False, f"Exception: {str(e)}")
        
        # Test duplicate lead handling
        try:
            response = self.session.post(
                f"{self.base_url}/api/leads",
                json=test_lead_data,  # Same as first lead
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                self.log_test("Duplicate Lead Handling", True, "Duplicate lead handled properly")
            else:
                self.log_test("Duplicate Lead Handling", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Duplicate Lead Handling", False, f"Exception: {str(e)}")
        
        # Test lead stats
        try:
            response = self.session.get(f"{self.base_url}/api/leads/stats")
            if response.status_code == 200:
                stats = response.json()
                if "total_leads" in stats and "status_breakdown" in stats and "source_breakdown" in stats:
                    self.log_test("Lead Stats", True, f"Total leads: {stats['total_leads']}")
                else:
                    self.log_test("Lead Stats", False, f"Missing required fields in stats")
            else:
                self.log_test("Lead Stats", False, f"Status code: {response.status_code}")
        except Exception as e:
            self.log_test("Lead Stats", False, f"Exception: {str(e)}")
    
    def test_data_persistence(self):
        """Test data persistence across requests"""
        print("\n=== TESTING DATA PERSISTENCE ===")
        
        # Create a unique email subscriber
        unique_email = f"persistence_test_{uuid.uuid4().hex[:8]}@cashtok.com"
        subscriber_data = {
            "email": unique_email,
            "source": "persistence_test",
            "interests": ["tiktok"]
        }
        
        try:
            # Subscribe
            response = self.session.post(
                f"{self.base_url}/api/emails/subscribe",
                json=subscriber_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 200:
                # Check if it appears in stats
                time.sleep(1)  # Brief wait for database consistency
                
                stats_response = self.session.get(f"{self.base_url}/api/emails/stats")
                if stats_response.status_code == 200:
                    stats = stats_response.json()
                    if stats.get("total_subscribers", 0) > 0:
                        self.log_test("Data Persistence - Email", True, "Email subscription persisted in database")
                    else:
                        self.log_test("Data Persistence - Email", False, "Email subscription not found in stats")
                else:
                    self.log_test("Data Persistence - Email", False, "Could not retrieve stats to verify persistence")
            else:
                self.log_test("Data Persistence - Email", False, f"Failed to create test subscription")
        except Exception as e:
            self.log_test("Data Persistence - Email", False, f"Exception: {str(e)}")
    
    def test_error_handling(self):
        """Test error handling for invalid requests"""
        print("\n=== TESTING ERROR HANDLING ===")
        
        # Test invalid email format
        try:
            invalid_email_data = {
                "email": "invalid-email-format",
                "source": "test"
            }
            
            response = self.session.post(
                f"{self.base_url}/api/emails/subscribe",
                json=invalid_email_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 422:  # Validation error
                self.log_test("Email Validation", True, "Invalid email format properly rejected")
            else:
                self.log_test("Email Validation", False, f"Expected 422, got {response.status_code}")
        except Exception as e:
            self.log_test("Email Validation", False, f"Exception: {str(e)}")
        
        # Test missing required fields
        try:
            incomplete_data = {
                "source": "test"
                # Missing email field
            }
            
            response = self.session.post(
                f"{self.base_url}/api/emails/subscribe",
                json=incomplete_data,
                headers={"Content-Type": "application/json"}
            )
            
            if response.status_code == 422:  # Validation error
                self.log_test("Required Field Validation", True, "Missing required fields properly rejected")
            else:
                self.log_test("Required Field Validation", False, f"Expected 422, got {response.status_code}")
        except Exception as e:
            self.log_test("Required Field Validation", False, f"Exception: {str(e)}")
    
    def run_all_tests(self):
        """Run all test suites"""
        print("🚀 Starting CASHTOK System Backend API Tests")
        print(f"🔗 Testing against: {self.base_url}")
        print("=" * 60)
        
        start_time = time.time()
        
        # Run all test suites
        self.test_health_endpoints()
        self.test_testimonials()
        self.test_faqs()
        self.test_email_marketing()
        self.test_analytics()
        self.test_chat()
        self.test_leads()
        self.test_data_persistence()
        self.test_error_handling()
        
        end_time = time.time()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = sum(1 for result in self.test_results if result["success"])
        failed_tests = total_tests - passed_tests
        
        print(f"Total Tests: {total_tests}")
        print(f"✅ Passed: {passed_tests}")
        print(f"❌ Failed: {failed_tests}")
        print(f"⏱️  Duration: {end_time - start_time:.2f} seconds")
        print(f"📈 Success Rate: {(passed_tests/total_tests)*100:.1f}%")
        
        if failed_tests > 0:
            print("\n🔍 FAILED TESTS:")
            for result in self.test_results:
                if not result["success"]:
                    print(f"   ❌ {result['test']}: {result['details']}")
        
        print("\n🎯 CASHTOK System Backend Testing Complete!")
        
        return {
            "total": total_tests,
            "passed": passed_tests,
            "failed": failed_tests,
            "success_rate": (passed_tests/total_tests)*100,
            "duration": end_time - start_time,
            "results": self.test_results
        }

def main():
    """Main test execution"""
    tester = CashtokAPITester(BACKEND_URL)
    results = tester.run_all_tests()
    
    # Exit with appropriate code
    if results["failed"] == 0:
        print("\n🎉 All tests passed!")
        exit(0)
    else:
        print(f"\n⚠️  {results['failed']} test(s) failed!")
        exit(1)

if __name__ == "__main__":
    main()