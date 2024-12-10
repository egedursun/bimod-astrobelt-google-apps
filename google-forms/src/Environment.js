// ####################################################################################################
// ####################################################################################################
// INSERT SERVER URL HERE
// ####################################################################################################
const GLOBAL_SERVER_URL = 'https://db25-181-26-32-241.ngrok-free.app';
// ####################################################################################################
// ####################################################################################################

// ####################################################################################################
// ####################################################################################################
// APPLICATION PARAMETERS
// ####################################################################################################
const APPLICATION_NAME = 'Bimod Astrobelt Forms';
const APPLICATION_COMMAND_PANEL_NAME = 'AstroBelt Command Panel';
const SIDEBAR_FILE_NAME = "Sidebar";

const AUTH_KEY_SPECIFIER = 'AUTH_KEY';
const SIDEBAR_RENDER_FUNCTION_NAME = 'showSidebar';
const SET_AUTHENTICATION_KEY_RENDER_FUNCTION_NAME = 'setAuthKey';

const MENU_ITEM_NAME_SET_AUTHENTICATION_KEY = 'Set BimodLab Forms Authentication Key';
const MENU_CONTENT_INSTRUCTION_SET_AUTHENTICATION_KEY = 'Please enter your Bimod.io Forms Authentication Key:';
const MENU_ALERT_SUCCESS_SET_AUTHENTICATION_KEY = 'Authentication key has been saved successfully.';
const MENU_ALERT_EMPTY_INPUT_SET_AUTHENTICATION_KEY = 'No valid authentication key has been entered.';

const APPLICATION_PROCESS_ERROR_NO_AUTHENTICATION_KEY = 'Authentication key is missing. Please set it from the Bimod Astrobelt Forms menu.';
const APPLICATION_PROCESS_ERROR_UNSUPPORTED_COMMAND_TYPE = 'Unsupported command type detected. Please enter a valid command type.';
const APPLICATION_PROCESS_ERROR_NO_CURSOR_PLACEMENT_FOUND = 'Please place the cursor where you want the output to be inserted.';
const APPLICATION_PROCESS_ERROR_NO_VALID_INSERTION_POINT = 'Failed to find a valid insertion point for the text.';

const COMMAND_NAME__AI = "ai";
const COMMAND_NAME__AUTO = "auto";
const COMMAND_NAME__WEB = "web";
const COMMAND_NAME__SQL = "sql";
const COMMAND_NAME__NOSQL = "noql";
const COMMAND_NAME__SSH = "ssh";
const COMMAND_NAME__VECT = "vect";
const COMMAND_NAME__REPO = "repo";
const COMMAND_NAME__SITE = "site";

const COMMAND_ENDPOINT__AI = '/app/formica/public/generate/commands/ai/';
const COMMAND_ENDPOINT__AUTO = '/app/formica/public/generate/commands/auto/';
const COMMAND_ENDPOINT__WEB = '/app/formica/public/generate/commands/web/';
const COMMAND_ENDPOINT__SQL = '/app/formica/public/generate/commands/sql/';
const COMMAND_ENDPOINT__NOSQL = '/app/formica/public/generate/commands/nosql/';
const COMMAND_ENDPOINT__SSH = '/app/formica/public/generate/commands/ssh/';
const COMMAND_ENDPOINT__VECT = '/app/formica/public/generate/commands/vect/';
const COMMAND_ENDPOINT__REPO = '/app/formica/public/generate/commands/repo/';
const COMMAND_ENDPOINT__SITE = '/app/formica/public/generate/commands/site/';

const INSERTION_TYPE_COMMANDS = [
    "ai",
    "web",
    "img",
    "sql",
    "nosql",
    "ssh",
    "vect",
    "repo",
    "site",
];

// Form Question Types
const FORM_QUESTION_TYPE__SHORT_OPEN_ENDED = "short_open_ended";
const FORM_QUESTION_TYPE__LONG_OPEN_ENDED = "long_open_ended";
const FORM_QUESTION_TYPE__MULTIPLE_CHOICE = "multiple_choice";
const FORM_QUESTION_TYPE__CHECKBOXES = "checkboxes";
const FORM_QUESTION_TYPE__DROPDOWN_CHOICES = "dropdown_choices";
const FORM_QUESTION_TYPE__LINEAR_SCALE = "linear_scale";
const FORM_QUESTION_TYPE__RATING_STARS = "rating_stars";
const FORM_QUESTION_TYPE__DATE = "date";
const FORM_QUESTION_TYPE__TIME = "time";

const DEFAULT_SIDEBAR_WIDTH_PX = 300;
// ####################################################################################################
// ####################################################################################################