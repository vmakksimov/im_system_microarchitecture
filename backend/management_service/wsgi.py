from app import create_app
import sys

project_home = "D:/vm/Python/interview-system-microarchitecture/backend/management_service"
if project_home not in sys.path:
    sys.path = [project_home] + sys.path
app = create_app()