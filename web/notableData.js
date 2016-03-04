var blacklist = {
    //control keys
    "\u0000": "NUL",
    "\u0001": "START OF HEADING",
    "\u0002": "START OF TEXT",
    "\u0003": "END OF TEXT",
    "\u0004": "END OF TRANSMISSION",
    "\u0005": "ENQUIRY",
    "\u0006": "ACKNOWLEDGE",
    "\u0007": "BELL",
    "\u0008": "BACKSPACE",

    "\u000B": "VERTICAL TAB",
    "\u000C": "NP FORM FEED",
    "\u000E": "SHIFT OUT",
    "\u000F": "SHIFT IN",
    "\u0010": "DATA LINK ESCAPE",
    "\u0011": "DC1",
    "\u0012": "DC2",
    "\u0013": "DC3",
    "\u0014": "DC4",
    "\u0015": "NEGATIVE ACKNOWLEDGE",
    "\u0016": "SYNCHRONOUS IDLE",
    "\u0017": "END OF TRANS. BLOCK",
    "\u0018": "CANCEL",
    "\u0019": "END OF MEDIUM",
    "\u001A": "SUBSTITUTE",
    "\u001B": "ESC",
    "\u001C": "FILE SEPARATOR",
    "\u001D": "GROUP SEPARATOR",
    "\u001E": "RECORD SEPARATOR",
    "\u001F": "UNIT SEPARATOR",
    //del
    "\u007F": "DEL",
    //special whitespace
    "\u00A0": "NO-BREAK SPACE",
    "\u1680": "OGHAM SPACE",
    "\u180E": "MONGOLIAN VOWEL SEPARATOR",
    "\u2000": "EN QUAD",
    "\u2001": "EM QUAD",
    "\u2002": "EN SPACE",
    "\u2003": "EM SPACE",
    "\u2004": "THREE-PER-EM SPACE",
    "\u2005": "FOUR-PER-EM SPACE",
    "\u2006": "SIX-PER-EM SPACE",
    "\u2007": "FIGURE SPACE",
    "\u2008": "PUNCTUATION SPACE",
    "\u2009": "THIN SPACE",
    "\u200A": "HAIR SPACE",
    "\u200B": "ZERO WIDTH SPACE",
    "\u202F": "NARROW NO-BREAK SPACE",
    "\u205F": "MEDIUM MATHEMATICAL SPACE",
    "\u3000": "IDEOGRAPHIC SPACE",
    "\uFEFF": "ZERO WIDTH NO-BREAK SPACE"
};

var whitelist = {
    "\u0009": "\u21e5", //tab
    "\u000A": "\\n\u21b5",// \n
    "\u000D": "\\r\u21a9" // \r
};


