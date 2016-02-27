var blacklist = {
    //control keys
    "\u0000": "NUL",
    "\u0001": "SOH",
    "\u0002": "STX",
    "\u0003": "ETX",
    "\u0004": "EOT",
    "\u0005": "ENQ",
    "\u0006": "ACK",
    "\u0007": "BEL",
    "\u0008": "BS",

    "\u000B": "VT",
    "\u000C": "FF",
    "\u000E": "SO",
    "\u000F": "SI",
    "\u0010": "DLE",
    "\u0011": "DC1",
    "\u0012": "DC2",
    "\u0013": "DC3",
    "\u0014": "DC4",
    "\u0015": "NAK",
    "\u0016": "SYN",
    "\u0017": "ETB",
    "\u0018": "CAN",
    "\u0019": "EM",
    "\u001A": "SIB",
    "\u001B": "ESC",
    "\u001C": "FS",
    "\u001D": "GS",
    "\u001E": "RS",
    "\u001F": "US",
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
    "\u0009": "....", //tab
    "\u000A": "\\n\u21a9",// \n
    "\u000D": "\\r\u21a9" // \r
};


