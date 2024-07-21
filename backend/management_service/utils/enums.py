from enum import Enum

class RoleEnum(str, Enum):
    DEVELOPER = 'Developer'
    DESIGNER = 'Designer'
    MANAGER = 'Manager'

class StageEnum(str, Enum):
    FIRST = '1'
    SECOND = '2'
    THIRD = '3'