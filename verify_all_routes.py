import json
import uuid
import sys
from fastapi.testclient import TestClient
from backend.main import app
from backend.database import init_db

def run_route_tests():
    print("=" * 80)
    print(" SAHARA BACKEND — COMPREHENSIVE ROUTE VERIFICATION SUITE")
    print("=" * 80)

    # Initialize DB
    init_db()
    client = TestClient(app)
    admin_headers = {"X-Admin-Key": "sahara-admin-secret-2025"}

    passed = 0
    total = 0

    def test(name, fn):
        nonlocal passed, total
        total += 1
        print(f"\n[{total}] Testing: {name} ...", end=" ")
        try:
            fn()
            print("PASSED (200 OK)")
            passed += 1
        except Exception as e:
            print(f"FAILED: {e}")
            raise e

    # 1. Health Route
    def test_health():
        r = client.get("/api/health")
        assert r.status_code == 200, f"Expected 200, got {r.status_code}"
        assert r.json()["status"] == "ok"
    test("GET /api/health", test_health)

    # 2. Coping Tools
    def test_coping_tools():
        r = client.get("/api/coping-tools")
        assert r.status_code == 200
        tools = r.json()
        assert len(tools) >= 5
        assert "title" in tools[0]
    test("GET /api/coping-tools", test_coping_tools)

    # 3. Crisis Helplines
    def test_helplines():
        r = client.get("/api/crisis-helplines")
        assert r.status_code == 200
        lines = r.json()
        assert len(lines) >= 4
        assert "Tele-MANAS" in lines[0]["name"]
    test("GET /api/crisis-helplines", test_helplines)

    # 4. Counsellors Directory
    def test_counsellors():
        r = client.get("/api/counsellors")
        assert r.status_code == 200
        c = r.json()
        assert len(c) >= 3
        assert "Dr. Ananya Sen" in c[0]["name"]
    test("GET /api/counsellors", test_counsellors)

    # Create a fresh session UUID
    session_id = f"test-sess-{uuid.uuid4().hex[:8]}"

    # 5. Chat POST (with session_id, moderate stress)
    def test_chat_with_session():
        r = client.post("/api/chat", json={
            "session_id": session_id,
            "userMessage": "I have semester exams coming up and I am unable to focus or sleep.",
            "currentSeverity": "MODERATE"
        })
        assert r.status_code == 200
        data = r.json()
        assert data["session_id"] == session_id
        assert len(data["reply"]) > 10
        assert "inferredTags" in data
        assert isinstance(data["inferredTags"], list)
    test("POST /api/chat (Session ID & Tag Inference)", test_chat_with_session)

    # 6. Chat POST (Auto-UUID generation when session_id is None)
    def test_chat_auto_uuid():
        r = client.post("/api/chat", json={
            "userMessage": "I feel lonely in the hostel."
        })
        assert r.status_code == 200
        data = r.json()
        assert data["session_id"].startswith("sess-")
    test("POST /api/chat (Auto-Session UUID Generation)", test_chat_auto_uuid)

    # 7. Chat POST (Crisis Trigger)
    def test_chat_crisis():
        r = client.post("/api/chat", json={
            "session_id": session_id,
            "userMessage": "I am having suicidal thoughts and don't feel safe."
        })
        assert r.status_code == 200
        data = r.json()
        assert data["suggestedSeverity"] == "SEVERE"
    test("POST /api/chat (Crisis Trigger & Severe Severity)", test_chat_crisis)

    # 8. Chat History GET
    def test_chat_history():
        r = client.get(f"/api/chat/history?sessionId={session_id}")
        assert r.status_code == 200
        msgs = r.json()["messages"]
        assert len(msgs) >= 4
    test("GET /api/chat/history", test_chat_history)

    # 9. Daily Check-in POST
    def test_checkin_post():
        r = client.post("/api/checkins", json={
            "session_id": session_id,
            "mood": "Overwhelmed",
            "energy": 2,
            "stressor": "Placements",
            "note": "Attending 3 interview rounds today"
        })
        assert r.status_code == 200
        data = r.json()
        assert data["session_id"] == session_id
        assert data["mood"] == "Overwhelmed"
    test("POST /api/checkins", test_checkin_post)

    # 10. Daily Check-in GET
    def test_checkin_get():
        r = client.get(f"/api/checkins?sessionId={session_id}")
        assert r.status_code == 200
        checkins = r.json()
        assert len(checkins) >= 1
    test("GET /api/checkins", test_checkin_get)

    # 11. Saathis Public Directory (Must be 401 Unauthorized for students)
    def test_saathis_unauth():
        r = client.get("/api/saathis")
        assert r.status_code == 401, f"Expected 401, got {r.status_code}"
    test("GET /api/saathis (Blocked for Student Privacy - 401)", test_saathis_unauth)

    # 12. Saathis Admin Directory (200 with X-Admin-Key)
    def test_saathis_admin():
        r = client.get("/api/saathis", headers=admin_headers)
        assert r.status_code == 200
        saathis = r.json()
        assert len(saathis) >= 4
        assert "name" in saathis[0]
        assert "alias" in saathis[0]
        assert "maxCapacity" in saathis[0]
    test("GET /api/saathis (Admin Access with X-Admin-Key - 200)", test_saathis_admin)

    # 13. Dual-Saathi Matching POST
    primary_chat_id = None
    secondary_chat_id = None
    def test_saathi_match():
        nonlocal primary_chat_id, secondary_chat_id
        r = client.post("/api/saathi/match", json={"session_id": session_id})
        assert r.status_code == 200
        data = r.json()
        assert data["session_id"] == session_id
        assert data["primary"]["role"] == "PRIMARY"
        assert data["secondary"]["role"] == "SECONDARY"
        assert "NightOwl" in data["primary"]["alias"] or "Pacer" in data["primary"]["alias"] or "QuietAnchor" in data["primary"]["alias"] or "SeniorCode" in data["primary"]["alias"]
        primary_chat_id = data["primary"]["chat_id"]
        secondary_chat_id = data["secondary"]["chat_id"]
    test("POST /api/saathi/match (Dual-Saathi Matching)", test_saathi_match)

    # 14. Saathi Chat Message GET
    def test_saathi_chat_get():
        r = client.get(f"/api/saathi/chat/{primary_chat_id}")
        assert r.status_code == 200
        msgs = r.json()
        assert len(msgs) >= 1  # Initial greeting
    test("GET /api/saathi/chat/{chat_id}", test_saathi_chat_get)

    # 15. Saathi Chat Message POST
    def test_saathi_chat_msg_post():
        r = client.post(f"/api/saathi/chat/{primary_chat_id}/message", json={
            "saathi_chat_id": primary_chat_id,
            "sender": "student",
            "text": "Hi, I feel anxious about my upcoming exam."
        })
        assert r.status_code == 200
        data = r.json()
        assert "user_message" in data
        assert "saathi_reply" in data
    test("POST /api/saathi/chat/{chat_id}/message", test_saathi_chat_msg_post)

    # 16. Saathi Role Switch POST
    def test_saathi_switch():
        r = client.post("/api/saathi/switch", json={
            "session_id": session_id,
            "target_role": "SECONDARY"
        })
        assert r.status_code == 200
        data = r.json()
        assert data["active_chat_id"] == secondary_chat_id
    test("POST /api/saathi/switch (No-Guilt Instant Focus Toggle)", test_saathi_switch)

    # 17. Saathi Transition POST (with notice & history transfer consent)
    def test_saathi_transition():
        r = client.post("/api/saathi/transition", json={
            "saathi_chat_id": primary_chat_id,
            "notice_weeks": 2,
            "consented_history_transfer": True
        })
        assert r.status_code == 200
        data = r.json()
        assert data["status"] == "TRANSITIONING"
        assert data["consented_history_transfer"] is True
        assert data["new_chat_id"] is not None
    test("POST /api/saathi/transition (Saathi Step-Back with Notice)", test_saathi_transition)

    # 18. Saathi Reassign Request POST (Escape Hatch)
    def test_saathi_reassign():
        r = client.post("/api/saathi/reassign-request", json={
            "saathi_chat_id": secondary_chat_id,
            "reason_flag": "RECOGNITION_RISK"
        })
        assert r.status_code == 200
        data = r.json()
        assert data["reassigned"] is True
        assert data["new_chat_id"] is not None
    test("POST /api/saathi/reassign-request (Silent Escape Hatch)", test_saathi_reassign)

    # 19. Clinical Psychologist Appointment POST (Isolated PII)
    def test_appointment_post():
        r = client.post("/api/appointments", json={
            "counsellor_id": "counsellor-1",
            "counsellor_name": "Dr. Ananya Sen",
            "student_name": "Kavya S.",
            "student_email": "kavya@campus.edu",
            "modality": "Video",
            "selected_slot": "Tomorrow, 3:00 PM",
            "notes": "Discussing exam panic"
        })
        assert r.status_code == 200
        data = r.json()
        assert data["student_name"] == "Kavya S."
        assert data["status"] == "CONFIRMED"
    test("POST /api/appointments (Decoupled Clinical Booking)", test_appointment_post)

    # 20. Appointments Admin GET (Unauthorized 401, Admin 200)
    def test_appointments_auth():
        unauth = client.get("/api/appointments")
        assert unauth.status_code == 401
        auth = client.get("/api/appointments", headers=admin_headers)
        assert auth.status_code == 200
        appts = auth.json()
        assert len(appts) >= 1
    test("GET /api/appointments (Access Control: 401 / 200)", test_appointments_auth)

    # 21. Campus Analytics GET (Unauthorized 401, Admin 200)
    def test_analytics_auth():
        unauth = client.get("/api/analytics")
        assert unauth.status_code == 401
        auth = client.get("/api/analytics", headers=admin_headers)
        assert auth.status_code == 200
        analytics = auth.json()
        assert "totalStudentsCovered" in analytics
        assert "studentTrustScore" in analytics
    test("GET /api/analytics (Admin Key Verification)", test_analytics_auth)

    # 22. Chat Reset POST
    def test_chat_reset():
        r = client.post(f"/api/chat/reset?sessionId={session_id}")
        assert r.status_code == 200
        # Verify history is empty
        history_res = client.get(f"/api/chat/history?sessionId={session_id}")
        assert len(history_res.json()["messages"]) == 0
    test("POST /api/chat/reset (Clear Conversation Log)", test_chat_reset)

    print("\n" + "=" * 80)
    print(f" ALL {passed}/{total} BACKEND ROUTES TESTED & FUNCTIONING FLAWLESSLY!")
    print("=" * 80)

if __name__ == "__main__":
    run_route_tests()
