// ####################################################################################################
// ####################################################################################################
// INSERT SERVER URL HERE
// ####################################################################################################
const GLOBAL_SERVER_URL = 'https://www.bimod.io';
// ####################################################################################################
// ####################################################################################################

// ####################################################################################################
// ####################################################################################################
// APPLICATION PARAMETERS
// ####################################################################################################
const APPLICATION_NAME = 'Bimod Astrobelt Spreadsheets';
const APPLICATION_COMMAND_PANEL_NAME = 'AstroBelt Command Panel';
const SIDEBAR_FILE_NAME = "Sidebar";

const AUTH_KEY_SPECIFIER = 'AUTH_KEY';
const SIDEBAR_RENDER_FUNCTION_NAME = 'showSidebar';
const SET_AUTHENTICATION_KEY_RENDER_FUNCTION_NAME = 'setAuthKey';

const MENU_ITEM_NAME_SET_AUTHENTICATION_KEY = 'Set BimodLab Sheetos Authentication Key';
const MENU_CONTENT_INSTRUCTION_SET_AUTHENTICATION_KEY = 'Please enter your Bimod.io Sheetos Authentication Key:';
const MENU_ALERT_SUCCESS_SET_AUTHENTICATION_KEY = 'Authentication key has been saved successfully.';
const MENU_ALERT_EMPTY_INPUT_SET_AUTHENTICATION_KEY = 'No valid authentication key has been entered.';

const APPLICATION_PROCESS_ERROR_NO_AUTHENTICATION_KEY = 'Authentication key is missing. Please set it from the Bimod Astrobelt Sheetos menu.';
const APPLICATION_PROCESS_ERROR_UNSUPPORTED_COMMAND_TYPE = 'Unsupported command type detected. Please enter a valid command type.';
const APPLICATION_PROCESS_ERROR_NO_CURSOR_PLACEMENT_FOUND = 'Please place the cursor where you want the output to be inserted.';
const APPLICATION_PROCESS_ERROR_NO_VALID_INSERTION_POINT = 'Failed to find a valid insertion point for the text.';
const APPLICATION_PROCESS_ERROR_NO_SELECTED_TEXT_TO_MODIFY = 'Please select a text to be modified.';

const COMMAND_NAME__AI = "ai";
const COMMAND_NAME__AUTO = "auto";
const COMMAND_NAME__SELECT = "select";
const COMMAND_NAME__WEB = "web";
const COMMAND_NAME__SQL = "sql";
const COMMAND_NAME__NOSQL = "noql";
const COMMAND_NAME__SSH = "ssh";
const COMMAND_NAME__VECT = "vect";
const COMMAND_NAME__REPO = "repo";

const COMMAND_ENDPOINT__AI = '/app/sheetos/public/generate/commands/ai/';
const COMMAND_ENDPOINT__AUTO = '/app/sheetos/public/generate/commands/auto/';
const COMMAND_ENDPOINT__SELECT = '/app/sheetos/public/generate/commands/select/';
const COMMAND_ENDPOINT__WEB = '/app/sheetos/public/generate/commands/web/';
const COMMAND_ENDPOINT__SQL = '/app/sheetos/public/generate/commands/sql/';
const COMMAND_ENDPOINT__NOSQL = '/app/sheetos/public/generate/commands/nosql/';
const COMMAND_ENDPOINT__SSH = '/app/sheetos/public/generate/commands/ssh/';
const COMMAND_ENDPOINT__VECT = '/app/sheetos/public/generate/commands/vect/';
const COMMAND_ENDPOINT__REPO = '/app/sheetos/public/generate/commands/repo/';

const INSERTION_TYPE_COMMANDS = [
  "ai",
  "web",
  "sql",
  "nosql",
  "ssh",
  "vect",
  "repo",
];

const DEFAULT_SIDEBAR_WIDTH_PX = 300;
// ####################################################################################################
// ####################################################################################################