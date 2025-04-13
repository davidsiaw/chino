/*
 * Objective-J.js
 * Objective-J
 *
 * Created by Francisco Tolmasky.
 * Copyright 2008-2010, 280 North, Inc.
 *
 * This library is free software; you can redistribute it and/or
 * modify it under the terms of the GNU Lesser General Public
 * License as published by the Free Software Foundation; either
 * version 2.1 of the License, or (at your option) any later version.
 *
 * This library is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * Lesser General Public License for more details.
 *
 * You should have received a copy of the GNU Lesser General Public
 * License along with this library; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA 02110-1301 USA
 */

var ObjectiveJ = {};
(function(global, exports)
{
    if (!Object.create)
    {
        Object.create =         function(o)
        {
            if (arguments.length > 1)
                throw new Error('Object.create implementation only accepts the first parameter.');
            function F()
            {
            }
            F.prototype = o;
            return new F();
        };
    }
    if (!Object.keys)
    {
        Object.keys = (        function()
        {
            var hasOwnProperty = Object.prototype.hasOwnProperty,
                hasDontEnumBug = !{toString: null}.propertyIsEnumerable('toString'),
                dontEnums = ['toString', 'toLocaleString', 'valueOf', 'hasOwnProperty', 'isPrototypeOf', 'propertyIsEnumerable', 'constructor'],
                dontEnumsLength = dontEnums.length;
            return             function(obj)
            {
                if (typeof obj !== 'object' && typeof obj !== 'function' || obj === null)
                    throw new TypeError('Object.keys called on non-object');
                var result = [];
                for (var prop in obj)
                {
                    if (hasOwnProperty.call(obj, prop))
                        result.push(prop);
                }
                if (hasDontEnumBug)
                {
                    for (var i = 0; i < dontEnumsLength; i++)
                    {
                        if (hasOwnProperty.call(obj, dontEnums[i]))
                            result.push(dontEnums[i]);
                    }
                }
                return result;
            };
        })();
    }
    if (!Array.prototype.indexOf)
    {
        Array.prototype.indexOf =         function(searchElement)
        {
            "use strict";
            if (this === null)
                throw new TypeError();
            var t = new Object(this),
                len = t.length >>> 0;
            if (len === 0)
                return -1;
            var n = 0;
            if (arguments.length > 1)
            {
                n = Number(arguments[1]);
                if (n != n)
                    n = 0;
                else if (n !== 0 && n != Infinity && n != -Infinity)
                    n = (n > 0 || -1) * Math.floor(Math.abs(n));
            }
            if (n >= len)
                return -1;
            var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
            for (; k < len; k++)
            {
                if (k in t && t[k] === searchElement)
                    return k;
            }
            return -1;
        };
    }
    if (!Array.prototype.findIndex)
    {
        Object.defineProperty(Array.prototype, 'findIndex', {value:         function(predicate)
        {
            if (this == null)
            {
                throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            var len = o.length >>> 0;
            if (typeof predicate !== 'function')
            {
                throw new TypeError('predicate must be a function');
            }
            var thisArg = arguments[1];
            var k = 0;
            while (k < len)
            {
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o))
                {
                    return k;
                }
                k++;
            }
            return -1;
        }, configurable: true, writable: true});
    }
    if (!String.prototype.startsWith)
    {
        String.prototype.startsWith =         function(searchString, position)
        {
            position = position || 0;
            return this.substr(position, searchString.length) === searchString;
        };
    }
    if (!String.prototype.endsWith)
    {
        String.prototype.endsWith =         function(searchString, position)
        {
            var subjectString = this.toString();
            if (typeof position !== 'number' || !isFinite(position) || Math.floor(position) !== position || position > subjectString.length)
            {
                position = subjectString.length;
            }
            position -= searchString.length;
            var lastIndex = subjectString.indexOf(searchString, position);
            return lastIndex !== -1 && lastIndex === position;
        };
    }
;
    if (!Array.prototype.includes)
    {
        Object.defineProperty(Array.prototype, 'includes', {value:         function(searchElement, fromIndex)
        {
            if (this == null)
            {
                throw new TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            var len = o.length >>> 0;
            if (len === 0)
            {
                return false;
            }
            var n = fromIndex | 0;
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
            while (k < len)
            {
                if (o[k] === searchElement)
                {
                    return true;
                }
                k++;
            }
            return false;
        }});
    }
    if (!Array.prototype.find)
    {
        Object.defineProperty(Array.prototype, 'find', {value:         function(predicate)
        {
            if (this == null)
            {
                throw TypeError('"this" is null or not defined');
            }
            var o = Object(this);
            var len = o.length >>> 0;
            if (typeof predicate !== 'function')
            {
                throw TypeError('predicate must be a function');
            }
            var thisArg = arguments[1];
            var k = 0;
            while (k < len)
            {
                var kValue = o[k];
                if (predicate.call(thisArg, kValue, k, o))
                {
                    return kValue;
                }
                k++;
            }
            return undefined;
        }, configurable: true, writable: true});
    }
    if (!this.JSON)
    {
        JSON = {};
    }
    (    function()
    {
        function f(n)
        {
            return n < 10 ? '0' + n : n;
        }
        if (typeof Date.prototype.toJSON !== 'function')
        {
            Date.prototype.toJSON =             function(key)
            {
                return this.getUTCFullYear() + '-' + f(this.getUTCMonth() + 1) + '-' + f(this.getUTCDate()) + 'T' + f(this.getUTCHours()) + ':' + f(this.getUTCMinutes()) + ':' + f(this.getUTCSeconds()) + 'Z';
            };
            String.prototype.toJSON = Number.prototype.toJSON = Boolean.prototype.toJSON =             function(key)
            {
                return this.valueOf();
            };
        }
        var cx = new RegExp('[\\u0000\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]', "g");
        var escapable = new RegExp('[\\\\\\"\\x00-\\x1f\\x7f-\\x9f\\u00ad\\u0600-\\u0604\\u070f\\u17b4\\u17b5\\u200c-\\u200f\\u2028-\\u202f\\u2060-\\u206f\\ufeff\\ufff0-\\uffff]', "g");
        var gap,
            indent,
            meta = {'\b': '\\b', '\t': '\\t', '\n': '\\n', '\f': '\\f', '\r': '\\r', '"': '\\"', '\\': '\\\\'},
            rep;
        function quote(string)
        {
            escapable.lastIndex = 0;
            return escapable.test(string) ? '"' + string.replace(escapable,             function(a)
            {
                var c = meta[a];
                return typeof c === 'string' ? c : '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
            }) + '"' : '"' + string + '"';
        }
        function str(key, holder)
        {
            var i,
                k,
                v,
                length,
                mind = gap,
                partial,
                value = holder[key];
            if (value && typeof value === 'object' && typeof value.toJSON === 'function')
            {
                value = value.toJSON(key);
            }
            if (typeof rep === 'function')
            {
                value = rep.call(holder, key, value);
            }
            switch(typeof value) {
                case 'string':
                    return quote(value);
                case 'number':
                    return isFinite(value) ? String(value) : 'null';
                case 'boolean':
                case 'null':
                    return String(value);
                case 'object':
                    if (!value)
                    {
                        return 'null';
                    }
                    gap += indent;
                    partial = [];
                    if (Object.prototype.toString.apply(value) === '[object Array]')
                    {
                        length = value.length;
                        for (i = 0; i < length; i += 1)
                        {
                            partial[i] = str(i, value) || 'null';
                        }
                        v = partial.length === 0 ? '[]' : gap ? '[\n' + gap + partial.join(',\n' + gap) + '\n' + mind + ']' : '[' + partial.join(',') + ']';
                        gap = mind;
                        return v;
                    }
                    if (rep && typeof rep === 'object')
                    {
                        length = rep.length;
                        for (i = 0; i < length; i += 1)
                        {
                            k = rep[i];
                            if (typeof k === 'string')
                            {
                                v = str(k, value);
                                if (v)
                                {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    }
                    else
                    {
                        for (k in value)
                        {
                            if (Object.hasOwnProperty.call(value, k))
                            {
                                v = str(k, value);
                                if (v)
                                {
                                    partial.push(quote(k) + (gap ? ': ' : ':') + v);
                                }
                            }
                        }
                    }
                    v = partial.length === 0 ? '{}' : gap ? '{\n' + gap + partial.join(',\n' + gap) + '\n' + mind + '}' : '{' + partial.join(',') + '}';
                    gap = mind;
                    return v;
            }
        }
        if (typeof JSON.stringify !== 'function')
        {
            JSON.stringify =             function(value, replacer, space)
            {
                var i;
                gap = '';
                indent = '';
                if (typeof space === 'number')
                {
                    for (i = 0; i < space; i += 1)
                    {
                        indent += ' ';
                    }
                }
                else if (typeof space === 'string')
                {
                    indent = space;
                }
                rep = replacer;
                if (replacer && typeof replacer !== 'function' && (typeof replacer !== 'object' || typeof replacer.length !== 'number'))
                {
                    throw new Error('JSON.stringify');
                }
                return str('', {'': value});
            };
        }
        if (typeof JSON.parse !== 'function')
        {
            JSON.parse =             function(text, reviver)
            {
                var j;
                function walk(holder, key)
                {
                    var k,
                        v,
                        value = holder[key];
                    if (value && typeof value === 'object')
                    {
                        for (k in value)
                        {
                            if (Object.hasOwnProperty.call(value, k))
                            {
                                v = walk(value, k);
                                if (v !== undefined)
                                {
                                    value[k] = v;
                                }
                                else
                                {
                                    delete value[k];
                                }
                            }
                        }
                    }
                    return reviver.call(holder, key, value);
                }
                cx.lastIndex = 0;
                if (cx.test(text))
                {
                    text = text.replace(cx,                     function(a)
                    {
                        return '\\u' + ('0000' + a.charCodeAt(0).toString(16)).slice(-4);
                    });
                }
                if (/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, '')))
                {
                    j = eval('(' + text + ')');
                    return typeof reviver === 'function' ? walk({'': j}, '') : j;
                }
                throw new SyntaxError('JSON.parse');
            };
        }
    })();
    var formatRegex = /([^%]+|%(?:\d+\$)?[\+\-\ \#0]*[0-9\*]*(.[0-9\*]+)?[hlL]?[cbBdieEfgGosuxXpn%@])/g,
        tagRegex = /(%)(?:(\d+)\$)?([\+\-\ \#0]*)([0-9\*]*)((?:.[0-9\*]+)?)([hlL]?)([cbBdieEfgGosuxXpn%@])/;
    exports.sprintf =     function(format)
    {
        var format = arguments[0],
            tokens = format.match(formatRegex),
            index = 0,
            result = "",
            arg = 1;
        for (var i = 0; i < tokens.length; i++)
        {
            var t = tokens[i];
            if (format.substring(index, index + t.length) !== t)
                return result;
            index += t.length;
            if (t.charAt(0) !== "%")
                result += t;
            else if (t === "%%")
                result += "%";
            else
            {
                var subtokens = t.match(tagRegex);
                if (subtokens.length !== 8 || subtokens[0] !== t)
                    return result;
                var percentSign = subtokens[1],
                    argIndex = subtokens[2],
                    flags = subtokens[3],
                    widthString = subtokens[4],
                    precisionString = subtokens[5],
                    length = subtokens[6],
                    specifier = subtokens[7];
                if (argIndex === undefined || argIndex === null || argIndex === "")
                    argIndex = arg++;
                else
                    argIndex = Number(argIndex);
                var width = null;
                if (widthString == "*")
                    width = arguments[argIndex];
                else if (widthString !== "")
                    width = Number(widthString);
                var precision = null;
                if (precisionString === ".*")
                    precision = arguments[argIndex];
                else if (precisionString !== "")
                    precision = Number(precisionString.substring(1));
                var leftJustify = flags.indexOf("-") >= 0,
                    padZeros = flags.indexOf("0") >= 0,
                    subresult = "";
                if (/[bBdiufeExXo]/.test(specifier))
                {
                    var num = Number(arguments[argIndex]),
                        sign = "";
                    if (num < 0)
                    {
                        sign = "-";
                    }
                    else
                    {
                        if (flags.indexOf("+") >= 0)
                            sign = "+";
                        else if (flags.indexOf(" ") >= 0)
                            sign = " ";
                    }
                    if (specifier === "d" || specifier === "i" || specifier === "u")
                    {
                        var number = String(Math.abs(Math.floor(num)));
                        subresult = justify(sign, "", number, "", width, leftJustify, padZeros);
                    }
                    if (specifier == "f")
                    {
                        var number = String(precision !== null ? Math.abs(num).toFixed(precision) : Math.abs(num)),
                            suffix = flags.indexOf("#") >= 0 && number.indexOf(".") < 0 ? "." : "";
                        subresult = justify(sign, "", number, suffix, width, leftJustify, padZeros);
                    }
                    if (specifier === "e" || specifier === "E")
                    {
                        var number = String(Math.abs(num).toExponential(precision !== null ? precision : 21)),
                            suffix = flags.indexOf("#") >= 0 && number.indexOf(".") < 0 ? "." : "";
                        subresult = justify(sign, "", number, suffix, width, leftJustify, padZeros);
                    }
                    if (specifier == "x" || specifier == "X")
                    {
                        var number = String(Math.abs(num).toString(16));
                        var prefix = flags.indexOf("#") >= 0 && num != 0 ? "0x" : "";
                        subresult = justify(sign, prefix, number, "", width, leftJustify, padZeros);
                    }
                    if (specifier == "b" || specifier == "B")
                    {
                        var number = String(Math.abs(num).toString(2));
                        var prefix = flags.indexOf("#") >= 0 && num != 0 ? "0b" : "";
                        subresult = justify(sign, prefix, number, "", width, leftJustify, padZeros);
                    }
                    if (specifier == "o")
                    {
                        var number = String(Math.abs(num).toString(8));
                        var prefix = flags.indexOf("#") >= 0 && num != 0 ? "0" : "";
                        subresult = justify(sign, prefix, number, "", width, leftJustify, padZeros);
                    }
                    if (/[A-Z]/.test(specifier))
                        subresult = subresult.toUpperCase();
                    else
                        subresult = subresult.toLowerCase();
                }
                else
                {
                    var subresult = "";
                    if (specifier === "%")
                        subresult = "%";
                    else if (specifier === "c")
                        subresult = String(arguments[argIndex]).charAt(0);
                    else if (specifier === "s" || specifier === "@")
                        subresult = String(arguments[argIndex]);
                    else if (specifier === "p" || specifier === "n")
                        subresult = "";
                    subresult = justify("", "", subresult, "", width, leftJustify, false);
                }
                result += subresult;
            }
        }
        return result;
    };
    function justify(sign, prefix, string, suffix, width, leftJustify, padZeros)
    {
        var length = sign.length + prefix.length + string.length + suffix.length;
        if (leftJustify)
        {
            return sign + prefix + string + suffix + pad(width - length, " ");
        }
        else
        {
            if (padZeros)
                return sign + prefix + pad(width - length, "0") + string + suffix;
            else
                return pad(width - length, " ") + sign + prefix + string + suffix;
        }
    }
    function pad(n, ch)
    {
        return Array(MAX(0, n) + 1).join(ch);
    }
;
    CPLogDisable = false;
    var CPLogDefaultTitle = "Cappuccino";
    var CPLogLevels = ["fatal", "error", "warn", "info", "debug", "trace"];
    var CPLogDefaultLevel = CPLogLevels[3];
    var _CPLogLevelsInverted = {};
    for (var i = 0; i < CPLogLevels.length; i++)
        _CPLogLevelsInverted[CPLogLevels[i]] = i;
    var _CPLogRegistrations = {};
    CPLogRegister =     function(aProvider, aMaxLevel, aFormatter)
    {
        CPLogRegisterRange(aProvider, CPLogLevels[0], aMaxLevel || CPLogLevels[CPLogLevels.length - 1], aFormatter);
    };
    CPLogRegisterRange =     function(aProvider, aMinLevel, aMaxLevel, aFormatter)
    {
        var min = _CPLogLevelsInverted[aMinLevel];
        var max = _CPLogLevelsInverted[aMaxLevel];
        if (min !== undefined && max !== undefined && min <= max)
            for (var i = min; i <= max; i++)
                CPLogRegisterSingle(aProvider, CPLogLevels[i], aFormatter);
    };
    CPLogRegisterSingle =     function(aProvider, aLevel, aFormatter)
    {
        if (!_CPLogRegistrations[aLevel])
            _CPLogRegistrations[aLevel] = [];
        for (var i = 0; i < _CPLogRegistrations[aLevel].length; i++)
            if (_CPLogRegistrations[aLevel][i][0] === aProvider)
            {
                _CPLogRegistrations[aLevel][i][1] = aFormatter;
                return;
            }
        _CPLogRegistrations[aLevel].push([aProvider, aFormatter]);
    };
    CPLogUnregister =     function(aProvider)
    {
        for (var aLevel in _CPLogRegistrations)
            for (var i = 0; i < _CPLogRegistrations[aLevel].length; i++)
                if (_CPLogRegistrations[aLevel][i][0] === aProvider)
                    _CPLogRegistrations[aLevel].splice(i--, 1);
    };
    function _CPLogDispatch(parameters, aLevel, aTitle)
    {
        if (aTitle == undefined)
            aTitle = CPLogDefaultTitle;
        if (aLevel == undefined)
            aLevel = CPLogDefaultLevel;
        var message = typeof parameters[0] == "string" && parameters.length > 1 ? exports.sprintf.apply(null, parameters) : String(parameters[0]);
        if (_CPLogRegistrations[aLevel])
            for (var i = 0; i < _CPLogRegistrations[aLevel].length; i++)
            {
                var logger = _CPLogRegistrations[aLevel][i];
                logger[0](message, aLevel, aTitle, logger[1]);
            }
    }
    CPLog =     function()
    {
        _CPLogDispatch(arguments);
    };
    for (var i = 0; i < CPLogLevels.length; i++)
        CPLog[CPLogLevels[i]] = (        function(level)
        {
            return             function()
            {
                _CPLogDispatch(arguments, level);
            };
        })(CPLogLevels[i]);
    var _CPFormatLogMessage =     function(aString, aLevel, aTitle)
    {
        var now = new Date(),
            titleAndLevel;
        if (aLevel === null)
            aLevel = "";
        else
        {
            aLevel = aLevel || "info";
            aLevel = "[" + CPLogColorize(aLevel, aLevel) + "]";
        }
        aTitle = aTitle || "";
        if (aTitle && aLevel)
            aTitle += " ";
        titleAndLevel = aTitle + aLevel;
        if (titleAndLevel)
            titleAndLevel += ": ";
        if (typeof exports.sprintf == "function")
            return exports.sprintf("%4d-%02d-%02d %02d:%02d:%02d.%03d %s%s", now.getFullYear(), now.getMonth() + 1, now.getDate(), now.getHours(), now.getMinutes(), now.getSeconds(), now.getMilliseconds(), titleAndLevel, aString);
        else
            return now + " " + titleAndLevel + ": " + aString;
    };
    CPLogConsole =     function(aString, aLevel, aTitle, aFormatter)
    {
        if (typeof console != "undefined")
        {
            var message = (aFormatter || _CPFormatLogMessage)(aString, aLevel, aTitle),
                logger = {"fatal": "error", "error": "error", "warn": "warn", "info": "info", "debug": "debug", "trace": "debug"}[aLevel];
            if (logger && console[logger])
                console[logger](message);
            else if (console.log)
                console.log(message);
        }
    };
    CPLogColorize =     function(aString, aLevel)
    {
        return aString;
    };
    CPLogAlert =     function(aString, aLevel, aTitle, aFormatter)
    {
        if (typeof alert != "undefined" && !CPLogDisable)
        {
            var message = (aFormatter || _CPFormatLogMessage)(aString, aLevel, aTitle);
            CPLogDisable = !confirm(message + "\n\n(Click cancel to stop log alerts)");
        }
    };
    var CPLogWindow = null;
    CPLogPopup =     function(aString, aLevel, aTitle, aFormatter)
    {
        try {
            if (CPLogDisable || window.open == undefined)
                return;
            if (!CPLogWindow || !CPLogWindow.document)
            {
                CPLogWindow = window.open("", "_blank", "width=600,height=400,status=no,resizable=yes,scrollbars=yes");
                if (!CPLogWindow)
                {
                    CPLogDisable = !confirm(aString + "\n\n(Disable pop-up blocking for CPLog window; Click cancel to stop log alerts)");
                    return;
                }
                _CPLogInitPopup(CPLogWindow);
            }
            var logDiv = CPLogWindow.document.createElement("div");
            logDiv.setAttribute("class", aLevel || "fatal");
            var message = (aFormatter || _CPFormatLogMessage)(aString, aFormatter ? aLevel : null, aTitle);
            logDiv.appendChild(CPLogWindow.document.createTextNode(message));
            CPLogWindow.log.appendChild(logDiv);
            if (CPLogWindow.focusEnabled.checked)
                CPLogWindow.focus();
            if (CPLogWindow.blockEnabled.checked)
                CPLogWindow.blockEnabled.checked = CPLogWindow.confirm(message + "\nContinue blocking?");
            if (CPLogWindow.scrollEnabled.checked)
                CPLogWindow.scrollToBottom();
        }
        catch(e) {
        }
    };
    var CPLogPopupStyle = '<style type="text/css" media="screen"> \
body{font:10px Monaco,Courier,"Courier New",monospace,mono;padding-top:15px;} \
div > .fatal,div > .error,div > .warn,div > .info,div > .debug,div > .trace{display:none;overflow:hidden;white-space:pre;padding:0px 5px 0px 5px;margin-top:2px;-moz-border-radius:5px;-webkit-border-radius:5px;} \
div[wrap="yes"] > div{white-space:normal;} \
.fatal{background-color:#ffb2b3;} \
.error{background-color:#ffe2b2;} \
.warn{background-color:#fdffb2;} \
.info{background-color:#e4ffb2;} \
.debug{background-color:#a0e5a0;} \
.trace{background-color:#99b9ff;} \
.enfatal .fatal,.enerror .error,.enwarn .warn,.eninfo .info,.endebug .debug,.entrace .trace{display:block;} \
div#header{background-color:rgba(240,240,240,0.82);position:fixed;top:0px;left:0px;width:100%;border-bottom:1px solid rgba(0,0,0,0.33);text-align:center;} \
ul#enablers{display:inline-block;margin:1px 15px 0 15px;padding:2px 0 2px 0;} \
ul#enablers li{display:inline;padding:0px 5px 0px 5px;margin-left:4px;-moz-border-radius:5px;-webkit-border-radius:5px;} \
[enabled="no"]{opacity:0.25;} \
ul#options{display:inline-block;margin:0 15px 0px 15px;padding:0 0px;} \
ul#options li{margin:0 0 0 0;padding:0 0 0 0;display:inline;} \
</style>';
    function _CPLogInitPopup(logWindow)
    {
        var doc = logWindow.document;
        doc.writeln("<html><head><title></title>" + CPLogPopupStyle + "</head><body></body></html>");
        doc.title = CPLogDefaultTitle + " Run Log";
        var head = doc.getElementsByTagName("head")[0];
        var body = doc.getElementsByTagName("body")[0];
        var base = window.location.protocol + "//" + window.location.host + window.location.pathname;
        base = base.substring(0, base.lastIndexOf("/") + 1);
        var div = doc.createElement("div");
        div.setAttribute("id", "header");
        body.appendChild(div);
        var ul = doc.createElement("ul");
        ul.setAttribute("id", "enablers");
        div.appendChild(ul);
        for (var i = 0; i < CPLogLevels.length; i++)
        {
            var li = doc.createElement("li");
            li.setAttribute("id", "en" + CPLogLevels[i]);
            li.setAttribute("class", CPLogLevels[i]);
            li.setAttribute("onclick", "toggle(this);");
            li.setAttribute("enabled", "yes");
            li.appendChild(doc.createTextNode(CPLogLevels[i]));
            ul.appendChild(li);
        }
        var ul = doc.createElement("ul");
        ul.setAttribute("id", "options");
        div.appendChild(ul);
        var options = {"focus": ["Focus", false], "block": ["Block", false], "wrap": ["Wrap", false], "scroll": ["Scroll", true], "close": ["Close", true]};
        for (o in options)
        {
            var li = doc.createElement("li");
            ul.appendChild(li);
            logWindow[o + "Enabled"] = doc.createElement("input");
            logWindow[o + "Enabled"].setAttribute("id", o);
            logWindow[o + "Enabled"].setAttribute("type", "checkbox");
            if (options[o][1])
                logWindow[o + "Enabled"].setAttribute("checked", "checked");
            li.appendChild(logWindow[o + "Enabled"]);
            var label = doc.createElement("label");
            label.setAttribute("for", o);
            label.appendChild(doc.createTextNode(options[o][0]));
            li.appendChild(label);
        }
        logWindow.log = doc.createElement("div");
        logWindow.log.setAttribute("class", "enerror endebug enwarn eninfo enfatal entrace");
        body.appendChild(logWindow.log);
        logWindow.toggle =         function(elem)
        {
            var enabled = elem.getAttribute("enabled") == "yes" ? "no" : "yes";
            elem.setAttribute("enabled", enabled);
            if (enabled == "yes")
                logWindow.log.className += " " + elem.id;
            else
                logWindow.log.className = logWindow.log.className.replace(new RegExp("[\\s]*" + elem.id, "g"), "");
        };
        logWindow.scrollToBottom =         function()
        {
            logWindow.scrollTo(0, body.offsetHeight);
        };
        logWindow.wrapEnabled.addEventListener("click",         function()
        {
            logWindow.log.setAttribute("wrap", logWindow.wrapEnabled.checked ? "yes" : "no");
        }, false);
        logWindow.addEventListener("keydown",         function(e)
        {
            var e = e || logWindow.event;
            if (e.keyCode == 75 && (e.ctrlKey || e.metaKey))
            {
                while (logWindow.log.firstChild)
                {
                    logWindow.log.removeChild(logWindow.log.firstChild);
                }
                e.preventDefault();
            }
        }, "false");
        window.addEventListener("unload",         function()
        {
            if (logWindow && logWindow.closeEnabled && logWindow.closeEnabled.checked)
            {
                CPLogDisable = true;
                logWindow.close();
            }
        }, false);
        logWindow.addEventListener("unload",         function()
        {
            if (!CPLogDisable)
            {
                CPLogDisable = !confirm("Click cancel to stop logging");
            }
        }, false);
    }
    CPLogDefault = typeof window === "object" && window.console ? CPLogConsole : CPLogPopup;
    var undefined;
    if (typeof window !== "undefined")
    {
        window.setNativeTimeout = window.setTimeout || setTimeout;
        window.clearNativeTimeout = window.clearTimeout || clearTimeout;
        window.setNativeInterval = window.setInterval || setInterval;
        window.clearNativeInterval = window.clearInterval || clearInterval;
    }
    NO = false;
    YES = true;
    nil = null;
    Nil = null;
    NULL = null;
    ABS = Math.abs;
    ASIN = Math.asin;
    ACOS = Math.acos;
    ATAN = Math.atan;
    ATAN2 = Math.atan2;
    SIN = Math.sin;
    COS = Math.cos;
    TAN = Math.tan;
    EXP = Math.exp;
    POW = Math.pow;
    CEIL = Math.ceil;
    FLOOR = Math.floor;
    ROUND = Math.round;
    MIN = Math.min;
    MAX = Math.max;
    RAND = Math.random;
    SQRT = Math.sqrt;
    E = Math.E;
    LN2 = Math.LN2;
    LN10 = Math.LN10;
    LOG = Math.log;
    LOG2E = Math.LOG2E;
    LOG10E = Math.LOG10E;
    PI = Math.PI;
    PI2 = Math.PI * 2.0;
    PI_2 = Math.PI / 2.0;
    SQRT1_2 = Math.SQRT1_2;
    SQRT2 = Math.SQRT2;
    function EventDispatcher(anOwner)
    {
        this._eventListenersForEventNames = {};
        this._owner = anOwner;
    }
    EventDispatcher.prototype.addEventListener =     function(anEventName, anEventListener)
    {
        var eventListenersForEventNames = this._eventListenersForEventNames;
        if (!hasOwnProperty.call(eventListenersForEventNames, anEventName))
        {
            var eventListenersForEventName = [];
            eventListenersForEventNames[anEventName] = eventListenersForEventName;
        }
        else
            var eventListenersForEventName = eventListenersForEventNames[anEventName];
        var index = eventListenersForEventName.length;
        while (index--)
            if (eventListenersForEventName[index] === anEventListener)
                return;
        eventListenersForEventName.push(anEventListener);
    };
    EventDispatcher.prototype.removeEventListener =     function(anEventName, anEventListener)
    {
        var eventListenersForEventNames = this._eventListenersForEventNames;
        if (!hasOwnProperty.call(eventListenersForEventNames, anEventName))
            return;
        var eventListenersForEventName = eventListenersForEventNames[anEventName],
            index = eventListenersForEventName.length;
        while (index--)
            if (eventListenersForEventName[index] === anEventListener)
                return eventListenersForEventName.splice(index, 1);
    };
    EventDispatcher.prototype.dispatchEvent =     function(anEvent)
    {
        var type = anEvent.type,
            eventListenersForEventNames = this._eventListenersForEventNames;
        if (hasOwnProperty.call(eventListenersForEventNames, type))
        {
            var eventListenersForEventName = this._eventListenersForEventNames[type],
                index = 0,
                count = eventListenersForEventName.length;
            for (; index < count; ++index)
                eventListenersForEventName[index](anEvent);
        }
        var manual = (this._owner || this)["on" + type];
        if (manual)
            manual(anEvent);
    };
    var asynchronousTimeoutCount = 0,
        asynchronousTimeoutId = null,
        asynchronousFunctionQueue = [];
    function Asynchronous(aFunction)
    {
        var currentAsynchronousTimeoutCount = asynchronousTimeoutCount;
        if (asynchronousTimeoutId === null)
        {
            window.setNativeTimeout(            function()
            {
                var queue = asynchronousFunctionQueue,
                    index = 0,
                    count = asynchronousFunctionQueue.length;
                ++asynchronousTimeoutCount;
                asynchronousTimeoutId = null;
                asynchronousFunctionQueue = [];
                for (; index < count; ++index)
                    queue[index]();
            }, 0);
        }
        return         function()
        {
            var args = arguments;
            if (asynchronousTimeoutCount > currentAsynchronousTimeoutCount)
                aFunction.apply(this, args);
            else
                asynchronousFunctionQueue.push(                function()
                {
                    aFunction.apply(this, args);
                });
        };
    }
    var NativeRequest = null;
    if (window.XMLHttpRequest)
    {
        NativeRequest = window.XMLHttpRequest;
    }
    else if (window.ActiveXObject !== undefined)
    {
        var MSXML_XMLHTTP_OBJECTS = ["Msxml2.XMLHTTP.3.0", "Msxml2.XMLHTTP.6.0"],
            index = MSXML_XMLHTTP_OBJECTS.length;
        while (index--)
        {
            try {
                var MSXML_XMLHTTP = MSXML_XMLHTTP_OBJECTS[index];
                new ActiveXObject(MSXML_XMLHTTP);
                NativeRequest =                 function()
                {
                    return new ActiveXObject(MSXML_XMLHTTP);
                };
                break;
            }
            catch(anException) {
            }
        }
    }
    CFHTTPRequest =     function()
    {
        this._isOpen = false;
        this._requestHeaders = {};
        this._mimeType = null;
        this._eventDispatcher = new EventDispatcher(this);
        this._nativeRequest = new NativeRequest();
        this._withCredentials = false;
        this._timeout = 60000;
        var self = this;
        this._stateChangeHandler =         function()
        {
            determineAndDispatchHTTPRequestEvents(self);
        };
        this._timeoutHandler =         function()
        {
            dispatchTimeoutHTTPRequestEvents(self);
        };
        this._nativeRequest.onreadystatechange = this._stateChangeHandler;
        this._nativeRequest.ontimeout = this._timeoutHandler;
        if (CFHTTPRequest.AuthenticationDelegate !== nil)
            this._eventDispatcher.addEventListener("HTTP403",             function()
            {
                CFHTTPRequest.AuthenticationDelegate(self);
            });
    };
    CFHTTPRequest.UninitializedState = 0;
    CFHTTPRequest.LoadingState = 1;
    CFHTTPRequest.LoadedState = 2;
    CFHTTPRequest.InteractiveState = 3;
    CFHTTPRequest.CompleteState = 4;
    CFHTTPRequest.AuthenticationDelegate = nil;
    CFHTTPRequest.prototype.status =     function()
    {
        try {
            return this._nativeRequest.status || 0;
        }
        catch(anException) {
            return 0;
        }
    };
    CFHTTPRequest.prototype.statusText =     function()
    {
        try {
            return this._nativeRequest.statusText || "";
        }
        catch(anException) {
            return "";
        }
    };
    CFHTTPRequest.prototype.readyState =     function()
    {
        return this._nativeRequest.readyState;
    };
    CFHTTPRequest.prototype.success =     function()
    {
        var status = this.status();
        if (status >= 200 && status < 300)
            return YES;
        return status === 0 && this.responseText() && this.responseText().length;
    };
    CFHTTPRequest.prototype.responseXML =     function()
    {
        var responseXML = this._nativeRequest.responseXML;
        if (responseXML && NativeRequest === window.XMLHttpRequest && responseXML.documentRoot)
            return responseXML;
        return parseXML(this.responseText());
    };
    CFHTTPRequest.prototype.responsePropertyList =     function()
    {
        var responseText = this.responseText();
        if (CFPropertyList.sniffedFormatOfString(responseText) === CFPropertyList.FormatXML_v1_0)
            return CFPropertyList.propertyListFromXML(this.responseXML());
        return CFPropertyList.propertyListFromString(responseText);
    };
    CFHTTPRequest.prototype.responseText =     function()
    {
        return this._nativeRequest.responseText;
    };
    CFHTTPRequest.prototype.setRequestHeader =     function(aHeader, aValue)
    {
        this._requestHeaders[aHeader] = aValue;
    };
    CFHTTPRequest.prototype.getResponseHeader =     function(aHeader)
    {
        return this._nativeRequest.getResponseHeader(aHeader);
    };
    CFHTTPRequest.prototype.setTimeout =     function(aTimeout)
    {
        this._timeout = aTimeout;
        if (this._isOpen)
            this._nativeRequest.timeout = aTimeout;
    };
    CFHTTPRequest.prototype.getTimeout =     function(aTimeout)
    {
        return this._timeout;
    };
    CFHTTPRequest.prototype.getAllResponseHeaders =     function()
    {
        return this._nativeRequest.getAllResponseHeaders();
    };
    CFHTTPRequest.prototype.overrideMimeType =     function(aMimeType)
    {
        this._mimeType = aMimeType;
    };
    CFHTTPRequest.prototype.open =     function(aMethod, aURL, isAsynchronous, aUser, aPassword)
    {
        var retval;
        this._isOpen = true;
        this._URL = aURL;
        this._async = isAsynchronous;
        this._method = aMethod;
        this._user = aUser;
        this._password = aPassword;
        requestReturnValue = this._nativeRequest.open(aMethod, aURL, isAsynchronous, aUser, aPassword);
        if (this._async)
        {
            this._nativeRequest.withCredentials = this._withCredentials;
            this._nativeRequest.timeout = this._timeout;
        }
        return requestReturnValue;
    };
    CFHTTPRequest.prototype.send =     function(aBody)
    {
        if (!this._isOpen)
        {
            delete this._nativeRequest.onreadystatechange;
            delete this._nativeRequest.ontimeout;
            this._nativeRequest.open(this._method, this._URL, this._async, this._user, this._password);
            this._nativeRequest.ontimeout = this._timeoutHandler;
            this._nativeRequest.onreadystatechange = this._stateChangeHandler;
        }
        for (var i in this._requestHeaders)
        {
            if (this._requestHeaders.hasOwnProperty(i))
                this._nativeRequest.setRequestHeader(i, this._requestHeaders[i]);
        }
        if (this._mimeType && "overrideMimeType" in this._nativeRequest)
            this._nativeRequest.overrideMimeType(this._mimeType);
        this._isOpen = false;
        try {
            return this._nativeRequest.send(aBody);
        }
        catch(anException) {
            this._eventDispatcher.dispatchEvent({type: "failure", request: this});
        }
    };
    CFHTTPRequest.prototype.abort =     function()
    {
        this._isOpen = false;
        return this._nativeRequest.abort();
    };
    CFHTTPRequest.prototype.addEventListener =     function(anEventName, anEventListener)
    {
        this._eventDispatcher.addEventListener(anEventName, anEventListener);
    };
    CFHTTPRequest.prototype.removeEventListener =     function(anEventName, anEventListener)
    {
        this._eventDispatcher.removeEventListener(anEventName, anEventListener);
    };
    CFHTTPRequest.prototype.setWithCredentials =     function(willSendWithCredentials)
    {
        this._withCredentials = willSendWithCredentials;
        if (this._isOpen && this._async)
            this._nativeRequest.withCredentials = willSendWithCredentials;
    };
    CFHTTPRequest.prototype.withCredentials =     function()
    {
        return this._withCredentials;
    };
    CFHTTPRequest.prototype.isTimeoutRequest =     function()
    {
        return !this.success() && !this._nativeRequest.response && !this._nativeRequest.responseText && !this._nativeRequest.responseType && !this._nativeRequest.responseURL && !this._nativeRequest.responseXML;
    };
    function dispatchTimeoutHTTPRequestEvents(aRequest)
    {
        aRequest._eventDispatcher.dispatchEvent({type: "timeout", request: aRequest});
    }
    function determineAndDispatchHTTPRequestEvents(aRequest)
    {
        var eventDispatcher = aRequest._eventDispatcher,
            readyStates = ["uninitialized", "loading", "loaded", "interactive", "complete"];
        eventDispatcher.dispatchEvent({type: "readystatechange", request: aRequest});
        if (readyStates[aRequest.readyState()] === "complete")
        {
            var status = "HTTP" + aRequest.status();
            eventDispatcher.dispatchEvent({type: status, request: aRequest});
            var result = aRequest.success() ? "success" : "failure";
            eventDispatcher.dispatchEvent({type: result, request: aRequest});
            eventDispatcher.dispatchEvent({type: readyStates[aRequest.readyState()], request: aRequest});
        }
        else
        {
            eventDispatcher.dispatchEvent({type: readyStates[aRequest.readyState()], request: aRequest});
        }
    }
    function FileRequest(aURL, onsuccess, onfailure, onprogress)
    {
        var request = new CFHTTPRequest();
        if (aURL.pathExtension() === "plist")
            request.overrideMimeType("text/xml");
        var loaded = 0,
            progressHandler = null;
        function progress(progressEvent)
        {
            onprogress(progressEvent.loaded - loaded);
            loaded = progressEvent.loaded;
        }
        function success(anEvent)
        {
            if (onprogress && progressHandler === null)
                onprogress(anEvent.request.responseText().length);
            onsuccess(anEvent);
        }
        if (exports.asyncLoader)
        {
            request.onsuccess = Asynchronous(success);
            request.onfailure = Asynchronous(onfailure);
        }
        else
        {
            request.onsuccess = success;
            request.onfailure = onfailure;
        }
        if (onprogress)
        {
            var supportsProgress = true;
            if (document.all)
                supportsProgress = !!window.atob;
            if (supportsProgress)
            {
                try {
                    progressHandler = exports.asyncLoader ? Asynchronous(progress) : progress;
                    request._nativeRequest.onprogress = progressHandler;
                }
                catch(anException) {
                    progressHandler = null;
                }
            }
        }
        request.open("GET", aURL.absoluteString(), exports.asyncLoader);
        request.send("");
    }
    exports.asyncLoader = YES;
    exports.Asynchronous = Asynchronous;
    exports.determineAndDispatchHTTPRequestEvents = determineAndDispatchHTTPRequestEvents;
    var OBJECT_COUNT = 0;
    objj_generateObjectUID =     function()
    {
        return OBJECT_COUNT++;
    };
    CFPropertyList =     function()
    {
        this._UID = objj_generateObjectUID();
    };
    CFPropertyList.DTDRE = /^\s*(?:<\?\s*xml\s+version\s*=\s*\"1.0\"[^>]*\?>\s*)?(?:<\!DOCTYPE[^>]*>\s*)?/i;
    CFPropertyList.XMLRE = /^\s*(?:<\?\s*xml\s+version\s*=\s*\"1.0\"[^>]*\?>\s*)?(?:<\!DOCTYPE[^>]*>\s*)?<\s*plist[^>]*\>/i;
    CFPropertyList.FormatXMLDTD = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<!DOCTYPE plist PUBLIC \"-//Apple//DTD PLIST 1.0//EN\" \"http://www.apple.com/DTDs/PropertyList-1.0.dtd\">";
    CFPropertyList.Format280NorthMagicNumber = "280NPLIST";
    (CFPropertyList.FormatOpenStep = 1, CFPropertyList.FormatXML_v1_0 = 100, CFPropertyList.FormatBinary_v1_0 = 200, CFPropertyList.Format280North_v1_0 = -1000);
    CFPropertyList.sniffedFormatOfString =     function(aString)
    {
        if (aString.match(CFPropertyList.XMLRE))
            return CFPropertyList.FormatXML_v1_0;
        if (aString.substr(0, CFPropertyList.Format280NorthMagicNumber.length) === CFPropertyList.Format280NorthMagicNumber)
            return CFPropertyList.Format280North_v1_0;
        return NULL;
    };
    CFPropertyList.dataFromPropertyList =     function(aPropertyList, aFormat)
    {
        var data = new CFMutableData();
        data.setRawString(CFPropertyList.stringFromPropertyList(aPropertyList, aFormat));
        return data;
    };
    CFPropertyList.stringFromPropertyList =     function(aPropertyList, aFormat)
    {
        if (!aFormat)
            aFormat = CFPropertyList.Format280North_v1_0;
        var serializers = CFPropertyListSerializers[aFormat];
        return serializers["start"]() + serializePropertyList(aPropertyList, serializers) + serializers["finish"]();
    };
    function serializePropertyList(aPropertyList, serializers)
    {
        var type = typeof aPropertyList,
            valueOf = aPropertyList.valueOf(),
            typeValueOf = typeof valueOf;
        if (type !== typeValueOf)
        {
            type = typeValueOf;
            aPropertyList = valueOf;
        }
        if (aPropertyList === YES || aPropertyList === NO)
            type = "boolean";
        else if (type === "number")
        {
            if (FLOOR(aPropertyList) === aPropertyList && ("" + aPropertyList).indexOf('e') == -1)
                type = "integer";
            else
                type = "real";
        }
        else if (type !== "string")
        {
            if (aPropertyList.slice)
                type = "array";
            else
                type = "dictionary";
        }
        return serializers[type](aPropertyList, serializers);
    }
    var CFPropertyListSerializers = {};
    CFPropertyListSerializers[CFPropertyList.FormatXML_v1_0] = {"start":     function()
    {
        return CFPropertyList.FormatXMLDTD + "<plist version = \"1.0\">";
    }, "finish":     function()
    {
        return "</plist>";
    }, "string":     function(aString)
    {
        return "<string>" + encodeHTMLComponent(aString) + "</string>";
    }, "boolean":     function(aBoolean)
    {
        return aBoolean ? "<true/>" : "<false/>";
    }, "integer":     function(anInteger)
    {
        return "<integer>" + anInteger + "</integer>";
    }, "real":     function(aFloat)
    {
        return "<real>" + aFloat + "</real>";
    }, "array":     function(anArray, serializers)
    {
        var index = 0,
            count = anArray.length,
            string = "<array>";
        for (; index < count; ++index)
            string += serializePropertyList(anArray[index], serializers);
        return string + "</array>";
    }, "dictionary":     function(aDictionary, serializers)
    {
        var keys = aDictionary._keys,
            index = 0,
            count = keys.length,
            string = "<dict>";
        for (; index < count; ++index)
        {
            var key = keys[index];
            string += "<key>" + key + "</key>";
            string += serializePropertyList(aDictionary.valueForKey(key), serializers);
        }
        return string + "</dict>";
    }};
    var ARRAY_MARKER = "A",
        DICTIONARY_MARKER = "D",
        FLOAT_MARKER = "f",
        INTEGER_MARKER = "d",
        STRING_MARKER = "S",
        TRUE_MARKER = "T",
        FALSE_MARKER = "F",
        KEY_MARKER = "K",
        END_MARKER = "E";
    CFPropertyListSerializers[CFPropertyList.Format280North_v1_0] = {"start":     function()
    {
        return CFPropertyList.Format280NorthMagicNumber + ";1.0;";
    }, "finish":     function()
    {
        return "";
    }, "string":     function(aString)
    {
        return STRING_MARKER + ';' + aString.length + ';' + aString;
    }, "boolean":     function(aBoolean)
    {
        return (aBoolean ? TRUE_MARKER : FALSE_MARKER) + ';';
    }, "integer":     function(anInteger)
    {
        var string = "" + anInteger;
        return INTEGER_MARKER + ';' + string.length + ';' + string;
    }, "real":     function(aFloat)
    {
        var string = "" + aFloat;
        return FLOAT_MARKER + ';' + string.length + ';' + string;
    }, "array":     function(anArray, serializers)
    {
        var index = 0,
            count = anArray.length,
            string = ARRAY_MARKER + ';';
        for (; index < count; ++index)
            string += serializePropertyList(anArray[index], serializers);
        return string + END_MARKER + ';';
    }, "dictionary":     function(aDictionary, serializers)
    {
        var keys = aDictionary._keys,
            index = 0,
            count = keys.length,
            string = DICTIONARY_MARKER + ';';
        for (; index < count; ++index)
        {
            var key = keys[index];
            string += KEY_MARKER + ';' + key.length + ';' + key;
            string += serializePropertyList(aDictionary.valueForKey(key), serializers);
        }
        return string + END_MARKER + ';';
    }};
    var XML_XML = "xml",
        XML_DOCUMENT = "#document",
        PLIST_PLIST = "plist",
        PLIST_KEY = "key",
        PLIST_DICTIONARY = "dict",
        PLIST_ARRAY = "array",
        PLIST_STRING = "string",
        PLIST_DATE = "date",
        PLIST_BOOLEAN_TRUE = "true",
        PLIST_BOOLEAN_FALSE = "false",
        PLIST_NUMBER_REAL = "real",
        PLIST_NUMBER_INTEGER = "integer",
        PLIST_DATA = "data";
    var textContent =     function(nodes)
    {
        var text = "",
            index = 0,
            count = nodes.length;
        for (; index < count; ++index)
        {
            var node = nodes[index];
            if (node.nodeType === 3 || node.nodeType === 4)
                text += node.nodeValue;
            else if (node.nodeType !== 8)
                text += textContent(node.childNodes);
        }
        return text;
    };
    var _plist_traverseNextNode =     function(anXMLNode, stayWithin, stack)
    {
        var node = anXMLNode;
        {
            node = node.firstChild;
            if (node != NULL && (node.nodeType === 8 || node.nodeType === 3 || node.nodeType === 7))
                while ((node = node.nextSibling) && (node.nodeType === 8 || node.nodeType === 3 || node.nodeType === 7));
        }
;
        if (node)
            return node;
        if (String(anXMLNode.nodeName) === PLIST_ARRAY || String(anXMLNode.nodeName) === PLIST_DICTIONARY)
            stack.pop();
        else
        {
            if (node === stayWithin)
                return NULL;
            node = anXMLNode;
            while ((node = node.nextSibling) && (node.nodeType === 8 || node.nodeType === 3 || node.nodeType === 7));
;
            if (node)
                return node;
        }
        node = anXMLNode;
        while (node)
        {
            var next = node;
            while ((next = next.nextSibling) && (next.nodeType === 8 || next.nodeType === 3 || next.nodeType === 7));
;
            if (next)
                return next;
            var node = node.parentNode;
            if (stayWithin && node === stayWithin)
                return NULL;
            stack.pop();
        }
        return NULL;
    };
    CFPropertyList.propertyListFromData =     function(aData, aFormat)
    {
        return CFPropertyList.propertyListFromString(aData.rawString(), aFormat);
    };
    CFPropertyList.propertyListFromString =     function(aString, aFormat)
    {
        if (!aFormat)
            aFormat = CFPropertyList.sniffedFormatOfString(aString);
        if (aFormat === CFPropertyList.FormatXML_v1_0)
            return CFPropertyList.propertyListFromXML(aString);
        if (aFormat === CFPropertyList.Format280North_v1_0)
            return propertyListFrom280NorthString(aString);
        return NULL;
    };
    var ARRAY_MARKER = "A",
        DICTIONARY_MARKER = "D",
        FLOAT_MARKER = "f",
        INTEGER_MARKER = "d",
        STRING_MARKER = "S",
        TRUE_MARKER = "T",
        FALSE_MARKER = "F",
        KEY_MARKER = "K",
        END_MARKER = "E";
    function propertyListFrom280NorthString(aString)
    {
        var stream = new MarkedStream(aString),
            marker = NULL,
            key = "",
            object = NULL,
            plistObject = NULL,
            containers = [],
            currentContainer = NULL;
        while (marker = stream.getMarker())
        {
            if (marker === END_MARKER)
            {
                containers.pop();
                continue;
            }
            var count = containers.length;
            if (count)
                currentContainer = containers[count - 1];
            if (marker === KEY_MARKER)
            {
                key = stream.getString();
                marker = stream.getMarker();
            }
            switch(marker) {
                case ARRAY_MARKER:
                    object = [];
                    containers.push(object);
                    break;
                case DICTIONARY_MARKER:
                    object = new CFMutableDictionary();
                    containers.push(object);
                    break;
                case FLOAT_MARKER:
                    object = parseFloat(stream.getString());
                    break;
                case INTEGER_MARKER:
                    object = parseInt(stream.getString(), 10);
                    break;
                case STRING_MARKER:
                    object = stream.getString();
                    break;
                case TRUE_MARKER:
                    object = YES;
                    break;
                case FALSE_MARKER:
                    object = NO;
                    break;
default:
                    throw new Error("*** " + marker + " marker not recognized in Plist.");
            }
            if (!plistObject)
                plistObject = object;
            else if (currentContainer)
                if (currentContainer.slice)
                    currentContainer.push(object);
                else
                    currentContainer.setValueForKey(key, object);
        }
        return plistObject;
    }
    function encodeHTMLComponent(aString)
    {
        return aString.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/'/g, '&apos;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    }
    function decodeHTMLComponent(aString)
    {
        return aString.replace(/&quot;/g, '"').replace(/&apos;/g, '\'').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');
    }
    function parseXML(aString)
    {
        if (window.DOMParser)
            return new window.DOMParser().parseFromString(aString, "text/xml") && new window.DOMParser().parseFromString(aString, "text/xml").documentElement;
        else if (window.ActiveXObject)
        {
            XMLNode = new ActiveXObject("Microsoft.XMLDOM");
            var matches = aString.match(CFPropertyList.DTDRE);
            if (matches)
                aString = aString.substr(matches[0].length);
            XMLNode.loadXML(aString);
            return XMLNode;
        }
        return NULL;
    }
    CFPropertyList.propertyListFromXML =     function(aStringOrXMLNode)
    {
        var XMLNode = aStringOrXMLNode;
        if (aStringOrXMLNode.valueOf && typeof aStringOrXMLNode.valueOf() === "string")
            XMLNode = parseXML(aStringOrXMLNode);
        while (XMLNode && (String(XMLNode.nodeName) === XML_DOCUMENT || String(XMLNode.nodeName) === XML_XML))
        {
            {
                XMLNode = XMLNode.firstChild;
                if (XMLNode != NULL && (XMLNode.nodeType === 8 || XMLNode.nodeType === 3 || XMLNode.nodeType === 7))
                    while ((XMLNode = XMLNode.nextSibling) && (XMLNode.nodeType === 8 || XMLNode.nodeType === 3 || XMLNode.nodeType === 7));
            }
;
        }
        if (XMLNode && XMLNode.nodeType === 10)
            while ((XMLNode = XMLNode.nextSibling) && (XMLNode.nodeType === 8 || XMLNode.nodeType === 3 || XMLNode.nodeType === 7));
;
        if (!XMLNode || !(String(XMLNode.nodeName) === PLIST_PLIST))
            return NULL;
        var key = "",
            object = NULL,
            plistObject = NULL,
            plistNode = XMLNode,
            containers = [],
            currentContainer = NULL;
        while (XMLNode = _plist_traverseNextNode(XMLNode, plistNode, containers))
        {
            var count = containers.length;
            if (count)
                currentContainer = containers[count - 1];
            if (String(XMLNode.nodeName) === PLIST_KEY)
            {
                key = XMLNode.textContent || XMLNode.textContent !== "" && textContent([XMLNode]);
                while ((XMLNode = XMLNode.nextSibling) && (XMLNode.nodeType === 8 || XMLNode.nodeType === 3 || XMLNode.nodeType === 7));
;
            }
            switch(String(String(XMLNode.nodeName))) {
                case PLIST_ARRAY:
                    object = [];
                    containers.push(object);
                    break;
                case PLIST_DICTIONARY:
                    object = new CFMutableDictionary();
                    containers.push(object);
                    break;
                case PLIST_NUMBER_REAL:
                    object = parseFloat(XMLNode.textContent || XMLNode.textContent !== "" && textContent([XMLNode]));
                    break;
                case PLIST_NUMBER_INTEGER:
                    object = parseInt(XMLNode.textContent || XMLNode.textContent !== "" && textContent([XMLNode]), 10);
                    break;
                case PLIST_STRING:
                    if (XMLNode.getAttribute("type") === "base64")
                        object = XMLNode.firstChild ? CFData.decodeBase64ToString(XMLNode.textContent || XMLNode.textContent !== "" && textContent([XMLNode])) : "";
                    else
                        object = decodeHTMLComponent(XMLNode.firstChild ? XMLNode.textContent || XMLNode.textContent !== "" && textContent([XMLNode]) : "");
                    break;
                case PLIST_DATE:
                    var timestamp = Date.parseISO8601(XMLNode.textContent || XMLNode.textContent !== "" && textContent([XMLNode]));
                    object = isNaN(timestamp) ? new Date() : new Date(timestamp);
                    break;
                case PLIST_BOOLEAN_TRUE:
                    object = YES;
                    break;
                case PLIST_BOOLEAN_FALSE:
                    object = NO;
                    break;
                case PLIST_DATA:
                    object = new CFMutableData();
                    var data_bytes = XMLNode.firstChild ? CFData.decodeBase64ToArray(XMLNode.textContent || XMLNode.textContent !== "" && textContent([XMLNode]), YES) : [];
                    object.setBytes(data_bytes);
                    break;
default:
                    throw new Error("*** " + String(XMLNode.nodeName) + " tag not recognized in Plist.");
            }
            if (!plistObject)
                plistObject = object;
            else if (currentContainer)
                if (currentContainer.slice)
                    currentContainer.push(object);
                else
                    currentContainer.setValueForKey(key, object);
        }
        return plistObject;
    };
    kCFPropertyListOpenStepFormat = CFPropertyList.FormatOpenStep;
    kCFPropertyListXMLFormat_v1_0 = CFPropertyList.FormatXML_v1_0;
    kCFPropertyListBinaryFormat_v1_0 = CFPropertyList.FormatBinary_v1_0;
    kCFPropertyList280NorthFormat_v1_0 = CFPropertyList.Format280North_v1_0;
    CFPropertyListCreate =     function()
    {
        return new CFPropertyList();
    };
    CFPropertyListCreateFromXMLData =     function(data)
    {
        return CFPropertyList.propertyListFromData(data, CFPropertyList.FormatXML_v1_0);
    };
    CFPropertyListCreateXMLData =     function(aPropertyList)
    {
        return CFPropertyList.dataFromPropertyList(aPropertyList, CFPropertyList.FormatXML_v1_0);
    };
    CFPropertyListCreateFrom280NorthData =     function(data)
    {
        return CFPropertyList.propertyListFromData(data, CFPropertyList.Format280North_v1_0);
    };
    CFPropertyListCreate280NorthData =     function(aPropertyList)
    {
        return CFPropertyList.dataFromPropertyList(aPropertyList, CFPropertyList.Format280North_v1_0);
    };
    CPPropertyListCreateFromData =     function(data, aFormat)
    {
        return CFPropertyList.propertyListFromData(data, aFormat);
    };
    CPPropertyListCreateData =     function(aPropertyList, aFormat)
    {
        return CFPropertyList.dataFromPropertyList(aPropertyList, aFormat);
    };
    CFDictionary =     function(aDictionary)
    {
        this._keys = [];
        this._count = 0;
        this._buckets = {};
        this._UID = objj_generateObjectUID();
    };
    var indexOf = Array.prototype.indexOf,
        hasOwnProperty = Object.prototype.hasOwnProperty;
    CFDictionary.prototype.copy =     function()
    {
        return this;
    };
    CFDictionary.prototype.mutableCopy =     function()
    {
        var newDictionary = new CFMutableDictionary(),
            keys = this._keys,
            count = this._count;
        newDictionary._keys = keys.slice();
        newDictionary._count = count;
        var index = 0,
            buckets = this._buckets,
            newBuckets = newDictionary._buckets;
        for (; index < count; ++index)
        {
            var key = keys[index];
            newBuckets[key] = buckets[key];
        }
        return newDictionary;
    };
    CFDictionary.prototype.containsKey =     function(aKey)
    {
        return hasOwnProperty.apply(this._buckets, [aKey]);
    };
    CFDictionary.prototype.containsKey.displayName = "CFDictionary . prototype . containsKey";
    CFDictionary.prototype.containsValue =     function(anObject)
    {
        var keys = this._keys,
            buckets = this._buckets,
            index = 0,
            count = keys.length;
        for (; index < count; ++index)
            if (buckets[keys[index]] === anObject)
                return YES;
        return NO;
    };
    CFDictionary.prototype.containsValue.displayName = "CFDictionary . prototype . containsValue";
    CFDictionary.prototype.count =     function()
    {
        return this._count;
    };
    CFDictionary.prototype.count.displayName = "CFDictionary . prototype . count";
    CFDictionary.prototype.countOfKey =     function(aKey)
    {
        return this.containsKey(aKey) ? 1 : 0;
    };
    CFDictionary.prototype.countOfKey.displayName = "CFDictionary . prototype . countOfKey";
    CFDictionary.prototype.countOfValue =     function(anObject)
    {
        var keys = this._keys,
            buckets = this._buckets,
            index = 0,
            count = keys.length,
            countOfValue = 0;
        for (; index < count; ++index)
            if (buckets[keys[index]] === anObject)
                ++countOfValue;
        return countOfValue;
    };
    CFDictionary.prototype.countOfValue.displayName = "CFDictionary . prototype . countOfValue";
    CFDictionary.prototype.keys =     function()
    {
        return this._keys.slice();
    };
    CFDictionary.prototype.keys.displayName = "CFDictionary . prototype . keys";
    CFDictionary.prototype.valueForKey =     function(aKey)
    {
        var buckets = this._buckets;
        if (!hasOwnProperty.apply(buckets, [aKey]))
            return nil;
        return buckets[aKey];
    };
    CFDictionary.prototype.valueForKey.displayName = "CFDictionary . prototype . valueForKey";
    CFDictionary.prototype.toString =     function()
    {
        var string = "{\n",
            keys = this._keys,
            index = 0,
            count = this._count;
        for (; index < count; ++index)
        {
            var key = keys[index];
            string += "\t" + key + " = \"" + String(this.valueForKey(key)).split('\n').join("\n\t") + "\"\n";
        }
        return string + "}";
    };
    CFDictionary.prototype.toString.displayName = "CFDictionary . prototype . toString";
    CFMutableDictionary =     function(aDictionary)
    {
        CFDictionary.apply(this, []);
    };
    CFMutableDictionary.prototype = new CFDictionary();
    CFMutableDictionary.prototype.copy =     function()
    {
        return this.mutableCopy();
    };
    CFMutableDictionary.prototype.addValueForKey =     function(aKey, aValue)
    {
        if (this.containsKey(aKey))
            return;
        ++this._count;
        this._keys.push(aKey);
        this._buckets[aKey] = aValue;
    };
    CFMutableDictionary.prototype.addValueForKey.displayName = "CFMutableDictionary . prototype . addValueForKey";
    CFMutableDictionary.prototype.removeValueForKey =     function(aKey)
    {
        var indexOfKey = -1;
        if (indexOf)
            indexOfKey = indexOf.call(this._keys, aKey);
        else
        {
            var keys = this._keys,
                index = 0,
                count = keys.length;
            for (; index < count; ++index)
                if (keys[index] === aKey)
                {
                    indexOfKey = index;
                    break;
                }
        }
        if (indexOfKey === -1)
            return;
        --this._count;
        this._keys.splice(indexOfKey, 1);
        delete this._buckets[aKey];
    };
    CFMutableDictionary.prototype.removeValueForKey.displayName = "CFMutableDictionary . prototype . removeValueForKey";
    CFMutableDictionary.prototype.removeAllValues =     function()
    {
        this._count = 0;
        this._keys = [];
        this._buckets = {};
    };
    CFMutableDictionary.prototype.removeAllValues.displayName = "CFMutableDictionary . prototype . removeAllValues";
    CFMutableDictionary.prototype.replaceValueForKey =     function(aKey, aValue)
    {
        if (!this.containsKey(aKey))
            return;
        this._buckets[aKey] = aValue;
    };
    CFMutableDictionary.prototype.replaceValueForKey.displayName = "CFMutableDictionary . prototype . replaceValueForKey";
    CFMutableDictionary.prototype.setValueForKey =     function(aKey, aValue)
    {
        if (aValue == nil)
            this.removeValueForKey(aKey);
        else if (this.containsKey(aKey))
            this.replaceValueForKey(aKey, aValue);
        else
            this.addValueForKey(aKey, aValue);
    };
    CFMutableDictionary.prototype.setValueForKey.displayName = "CFMutableDictionary . prototype . setValueForKey";
    kCFErrorLocalizedDescriptionKey = "CPLocalizedDescription";
    kCFErrorLocalizedFailureReasonKey = "CPLocalizedFailureReason";
    kCFErrorLocalizedRecoverySuggestionKey = "CPLocalizedRecoverySuggestion";
    kCFErrorDescriptionKey = "CPDescription";
    kCFErrorUnderlyingErrorKey = "CPUnderlyingError";
    kCFErrorURLKey = "CPURL";
    kCFErrorFilePathKey = "CPFilePath";
    kCFErrorDomainCappuccino = "CPCappuccinoErrorDomain";
    kCFErrorDomainCocoa = kCFErrorDomainCappuccino;
    CFError =     function(domain, code, userInfo)
    {
        this._domain = domain || NULL;
        this._code = code || 0;
        this._userInfo = userInfo || new CFDictionary();
        this._UID = objj_generateObjectUID();
    };
    CFError.prototype.domain =     function()
    {
        return this._domain;
    };
    CFError.prototype.domain.displayName = "CFError . prototype . domain";
    CFError.prototype.code =     function()
    {
        return this._code;
    };
    CFError.prototype.code.displayName = "CFError . prototype . code";
    CFError.prototype.description =     function()
    {
        var localizedDesc = this._userInfo.valueForKey(kCFErrorLocalizedDescriptionKey);
        if (localizedDesc)
            return localizedDesc;
        var reason = this._userInfo.valueForKey(kCFErrorLocalizedFailureReasonKey);
        if (reason)
        {
            var operationFailedStr = "The operation couldn\u2019t be completed. " + reason;
            return operationFailedStr;
        }
        var result = "",
            desc = this._userInfo.valueForKey(kCFErrorDescriptionKey);
        if (desc)
        {
            var result = "The operation couldn\u2019t be completed. (error " + this._code + " - " + desc + ")";
        }
        else
        {
            var result = "The operation couldn\u2019t be completed. (error " + this._code + ")";
        }
        return result;
    };
    CFError.prototype.description.displayName = "CFError . prototype . description";
    CFError.prototype.failureReason =     function()
    {
        return this._userInfo.valueForKey(kCFErrorLocalizedFailureReasonKey);
    };
    CFError.prototype.failureReason.displayName = "CFError . prototype . failureReason";
    CFError.prototype.recoverySuggestion =     function()
    {
        return this._userInfo.valueForKey(kCFErrorLocalizedRecoverySuggestionKey);
    };
    CFError.prototype.recoverySuggestion.displayName = "CFError . prototype . recoverySuggestion";
    CFError.prototype.userInfo =     function()
    {
        return this._userInfo;
    };
    CFError.prototype.userInfo.displayName = "CFError . prototype . userInfo";
    CFErrorCreate =     function(domain, code, userInfo)
    {
        return new CFError(domain, code, userInfo);
    };
    CFErrorCreateWithUserInfoKeysAndValues =     function(domain, code, userInfoKeys, userInfoValues, numUserInfoValues)
    {
        var userInfo = new CFMutableDictionary();
        while (numUserInfoValues--)
            userInfo.setValueForKey(userInfoKeys[numUserInfoValues], userInfoValues[numUserInfoValues]);
        return new CFError(domain, code, userInfo);
    };
    CFErrorGetCode =     function(err)
    {
        return err.code();
    };
    CFErrorGetDomain =     function(err)
    {
        return err.domain();
    };
    CFErrorCopyDescription =     function(err)
    {
        return err.description();
    };
    CFErrorCopyUserInfo =     function(err)
    {
        return err.userInfo();
    };
    CFErrorCopyFailureReason =     function(err)
    {
        return err.failureReason();
    };
    CFErrorCopyRecoverySuggestion =     function(err)
    {
        return err.recoverySuggestion();
    };
    kCFURLErrorUnknown = -998;
    kCFURLErrorCancelled = -999;
    kCFURLErrorBadURL = -1000;
    kCFURLErrorTimedOut = -1001;
    kCFURLErrorUnsupportedURL = -1002;
    kCFURLErrorCannotFindHost = -1003;
    kCFURLErrorCannotConnectToHost = -1004;
    kCFURLErrorNetworkConnectionLost = -1005;
    kCFURLErrorDNSLookupFailed = -1006;
    kCFURLErrorHTTPTooManyRedirects = -1007;
    kCFURLErrorResourceUnavailable = -1008;
    kCFURLErrorNotConnectedToInternet = -1009;
    kCFURLErrorRedirectToNonExistentLocation = -1010;
    kCFURLErrorBadServerResponse = -1011;
    kCFURLErrorUserCancelledAuthentication = -1012;
    kCFURLErrorUserAuthenticationRequired = -1013;
    kCFURLErrorZeroByteResource = -1014;
    kCFURLErrorCannotDecodeRawData = -1015;
    kCFURLErrorCannotDecodeContentData = -1016;
    kCFURLErrorCannotParseResponse = -1017;
    kCFURLErrorRequestBodyStreamExhausted = -1021;
    kCFURLErrorFileDoesNotExist = -1100;
    kCFURLErrorFileIsDirectory = -1101;
    kCFURLErrorNoPermissionsToReadFile = -1102;
    kCFURLErrorDataLengthExceedsMaximum = -1103;
    CFData =     function()
    {
        this._rawString = NULL;
        this._propertyList = NULL;
        this._propertyListFormat = NULL;
        this._JSONObject = NULL;
        this._bytes = NULL;
        this._base64 = NULL;
    };
    CFData.prototype.propertyList =     function()
    {
        if (!this._propertyList)
            this._propertyList = CFPropertyList.propertyListFromString(this.rawString());
        return this._propertyList;
    };
    CFData.prototype.JSONObject =     function()
    {
        if (!this._JSONObject)
        {
            try {
                this._JSONObject = JSON.parse(this.rawString());
            }
            catch(anException) {
            }
        }
        return this._JSONObject;
    };
    CFData.prototype.rawString =     function()
    {
        if (this._rawString === NULL)
        {
            if (this._propertyList)
                this._rawString = CFPropertyList.stringFromPropertyList(this._propertyList, this._propertyListFormat);
            else if (this._JSONObject)
                this._rawString = JSON.stringify(this._JSONObject);
            else if (this._bytes)
                this._rawString = CFData.bytesToString(this._bytes);
            else if (this._base64)
                this._rawString = CFData.decodeBase64ToString(this._base64, true);
            else
                throw new Error("Can't convert data to string.");
        }
        return this._rawString;
    };
    CFData.prototype.bytes =     function()
    {
        if (this._bytes === NULL)
        {
            var bytes = CFData.stringToBytes(this.rawString());
            this.setBytes(bytes);
        }
        return this._bytes;
    };
    CFData.prototype.base64 =     function()
    {
        if (this._base64 === NULL)
        {
            var base64;
            if (this._bytes)
                base64 = CFData.encodeBase64Array(this._bytes);
            else
                base64 = CFData.encodeBase64String(this.rawString());
            this.setBase64String(base64);
        }
        return this._base64;
    };
    CFMutableData =     function()
    {
        CFData.call(this);
    };
    CFMutableData.prototype = new CFData();
    function clearMutableData(aData)
    {
        this._rawString = NULL;
        this._propertyList = NULL;
        this._propertyListFormat = NULL;
        this._JSONObject = NULL;
        this._bytes = NULL;
        this._base64 = NULL;
    }
    CFMutableData.prototype.setPropertyList =     function(aPropertyList, aFormat)
    {
        clearMutableData(this);
        this._propertyList = aPropertyList;
        this._propertyListFormat = aFormat;
    };
    CFMutableData.prototype.setJSONObject =     function(anObject)
    {
        clearMutableData(this);
        this._JSONObject = anObject;
    };
    CFMutableData.prototype.setRawString =     function(aString)
    {
        clearMutableData(this);
        this._rawString = aString;
    };
    CFMutableData.prototype.setBytes =     function(bytes)
    {
        clearMutableData(this);
        this._bytes = bytes;
    };
    CFMutableData.prototype.setBase64String =     function(aBase64String)
    {
        clearMutableData(this);
        this._base64 = aBase64String;
    };
    var base64_map_to = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z", "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z", "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "+", "/", "="],
        base64_map_from = [];
    for (var i = 0; i < base64_map_to.length; i++)
        base64_map_from[base64_map_to[i].charCodeAt(0)] = i;
    CFData.decodeBase64ToArray =     function(input, strip)
    {
        if (strip)
            input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");
        var pad = (input[input.length - 1] == "=" ? 1 : 0) + (input[input.length - 2] == "=" ? 1 : 0),
            length = input.length,
            output = [];
        var i = 0;
        while (i < length)
        {
            var bits = base64_map_from[input.charCodeAt(i++)] << 18 | base64_map_from[input.charCodeAt(i++)] << 12 | base64_map_from[input.charCodeAt(i++)] << 6 | base64_map_from[input.charCodeAt(i++)];
            output.push((bits & 0xFF0000) >> 16);
            output.push((bits & 0xFF00) >> 8);
            output.push(bits & 0xFF);
        }
        if (pad > 0)
            return output.slice(0, -1 * pad);
        return output;
    };
    CFData.encodeBase64Array =     function(input)
    {
        var pad = (3 - input.length % 3) % 3,
            length = input.length + pad,
            output = [];
        if (pad > 0)
            input.push(0);
        if (pad > 1)
            input.push(0);
        var i = 0;
        while (i < length)
        {
            var bits = input[i++] << 16 | input[i++] << 8 | input[i++];
            output.push(base64_map_to[(bits & 0xFC0000) >> 18]);
            output.push(base64_map_to[(bits & 0x3F000) >> 12]);
            output.push(base64_map_to[(bits & 0xFC0) >> 6]);
            output.push(base64_map_to[bits & 0x3F]);
        }
        if (pad > 0)
        {
            output[output.length - 1] = "=";
            input.pop();
        }
        if (pad > 1)
        {
            output[output.length - 2] = "=";
            input.pop();
        }
        return output.join("");
    };
    CFData.decodeBase64ToString =     function(input, strip)
    {
        return CFData.bytesToString(CFData.decodeBase64ToArray(input, strip));
    };
    CFData.decodeBase64ToUtf16String =     function(input, strip)
    {
        return CFData.bytesToUtf16String(CFData.decodeBase64ToArray(input, strip));
    };
    CFData.bytesToString =     function(bytes)
    {
        return String.fromCharCode.apply(NULL, bytes);
    };
    CFData.stringToBytes =     function(input)
    {
        var temp = [];
        for (var i = 0; i < input.length; i++)
            temp.push(input.charCodeAt(i));
        return temp;
    };
    CFData.encodeBase64String =     function(input)
    {
        var temp = [];
        for (var i = 0; i < input.length; i++)
            temp.push(input.charCodeAt(i));
        return CFData.encodeBase64Array(temp);
    };
    CFData.bytesToUtf16String =     function(bytes)
    {
        var temp = [];
        for (var i = 0; i < bytes.length; i += 2)
            temp.push(bytes[i + 1] << 8 | bytes[i]);
        return String.fromCharCode.apply(NULL, temp);
    };
    CFData.encodeBase64Utf16String =     function(input)
    {
        var temp = [];
        for (var i = 0; i < input.length; i++)
        {
            var c = input.charCodeAt(i);
            temp.push(c & 0xFF);
            temp.push((c & 0xFF00) >> 8);
        }
        return CFData.encodeBase64Array(temp);
    };
    var CFURLsForCachedUIDs,
        CFURLPartsForURLStrings,
        CFURLCachingEnableCount = 0;
    function enableCFURLCaching()
    {
        if (++CFURLCachingEnableCount !== 1)
            return;
        CFURLsForCachedUIDs = {};
        CFURLPartsForURLStrings = {};
    }
    function disableCFURLCaching()
    {
        CFURLCachingEnableCount = MAX(CFURLCachingEnableCount - 1, 0);
        if (CFURLCachingEnableCount !== 0)
            return;
        delete CFURLsForCachedUIDs;
        delete CFURLPartsForURLStrings;
    }
    var URL_RE = new RegExp("^" + "(?:" + "([^:/?#]+):" + ")?" + "(?:" + "(//)" + "(" + "(?:" + "(" + "([^:@]*)" + ":?" + "([^:@]*)" + ")?" + "@" + ")?" + "([^:/?#]*)" + "(?::(\\d*))?" + ")" + ")?" + "([^?#]*)" + "(?:\\?([^#]*))?" + "(?:#(.*))?");
    var URI_KEYS = ["url", "scheme", "authorityRoot", "authority", "userInfo", "user", "password", "domain", "portNumber", "path", "queryString", "fragment"];
    function CFURLGetParts(aURL)
    {
        if (aURL._parts)
            return aURL._parts;
        var URLString = aURL.string(),
            isMHTMLURL = URLString.match(/^mhtml:/);
        if (isMHTMLURL)
            URLString = URLString.substr("mhtml:".length);
        if (CFURLCachingEnableCount > 0 && hasOwnProperty.call(CFURLPartsForURLStrings, URLString))
        {
            aURL._parts = CFURLPartsForURLStrings[URLString];
            return aURL._parts;
        }
        aURL._parts = {};
        var parts = aURL._parts,
            results = URL_RE.exec(URLString),
            index = results.length;
        while (index--)
            parts[URI_KEYS[index]] = results[index] || NULL;
        parts.portNumber = parseInt(parts.portNumber, 10);
        if (isNaN(parts.portNumber))
            parts.portNumber = -1;
        parts.pathComponents = [];
        if (parts.path)
        {
            var split = parts.path.split("/"),
                pathComponents = parts.pathComponents,
                count = split.length;
            for (index = 0; index < count; ++index)
            {
                var component = split[index];
                if (component)
                    pathComponents.push(component);
                else if (index === 0)
                    pathComponents.push("/");
            }
            parts.pathComponents = pathComponents;
        }
        if (isMHTMLURL)
        {
            parts.url = "mhtml:" + parts.url;
            parts.scheme = "mhtml:" + parts.scheme;
        }
        if (CFURLCachingEnableCount > 0)
            CFURLPartsForURLStrings[URLString] = parts;
        return parts;
    }
    CFURL =     function(aURL, aBaseURL)
    {
        aURL = aURL || "";
        if (aURL instanceof CFURL)
        {
            if (!aBaseURL)
                return new CFURL(aURL.absoluteString());
            var existingBaseURL = aURL.baseURL();
            if (existingBaseURL)
                aBaseURL = new CFURL(existingBaseURL.absoluteURL(), aBaseURL);
            aURL = aURL.string();
        }
        if (CFURLCachingEnableCount > 0)
        {
            var cacheUID = aURL + " " + (aBaseURL && aBaseURL.UID() || "");
            if (hasOwnProperty.call(CFURLsForCachedUIDs, cacheUID))
                return CFURLsForCachedUIDs[cacheUID];
            CFURLsForCachedUIDs[cacheUID] = this;
        }
        if (aURL.match(/^data:/))
        {
            var parts = {},
                index = URI_KEYS.length;
            while (index--)
                parts[URI_KEYS[index]] = "";
            parts.url = aURL;
            parts.scheme = "data";
            parts.pathComponents = [];
            this._parts = parts;
            this._standardizedURL = this;
            this._absoluteURL = this;
        }
        this._UID = objj_generateObjectUID();
        this._string = aURL;
        this._baseURL = aBaseURL;
    };
    CFURL.displayName = "CFURL";
    CFURL.prototype.UID =     function()
    {
        return this._UID;
    };
    CFURL.prototype.UID.displayName = "CFURL . prototype . UID";
    var URLMap = {};
    CFURL.prototype.mappedURL =     function()
    {
        return URLMap[this.absoluteString()] || this;
    };
    CFURL.prototype.mappedURL.displayName = "CFURL . prototype . mappedURL";
    CFURL.setMappedURLForURL =     function(fromURL, toURL)
    {
        URLMap[fromURL.absoluteString()] = toURL;
    };
    CFURL.setMappedURLForURL.displayName = "CFURL . setMappedURLForURL";
    CFURL.prototype.schemeAndAuthority =     function()
    {
        var string = "",
            scheme = this.scheme();
        if (scheme)
            string += scheme + ":";
        var authority = this.authority();
        if (authority)
            string += "//" + authority;
        return string;
    };
    CFURL.prototype.schemeAndAuthority.displayName = "CFURL . prototype . schemeAndAuthority";
    CFURL.prototype.absoluteString =     function()
    {
        if (this._absoluteString === undefined)
            this._absoluteString = this.absoluteURL().string();
        return this._absoluteString;
    };
    CFURL.prototype.absoluteString.displayName = "CFURL . prototype . absoluteString";
    CFURL.prototype.toString =     function()
    {
        return this.absoluteString();
    };
    CFURL.prototype.toString.displayName = "CFURL . prototype . toString";
    function resolveURL(aURL)
    {
        aURL = aURL.standardizedURL();
        var baseURL = aURL.baseURL();
        if (!baseURL)
            return aURL;
        var parts = aURL._parts || CFURLGetParts(aURL),
            resolvedParts,
            absoluteBaseURL = baseURL.absoluteURL(),
            baseParts = absoluteBaseURL._parts || CFURLGetParts(absoluteBaseURL);
        if (!parts.scheme && parts.authorityRoot)
        {
            resolvedParts = CFURLPartsCreateCopy(parts);
            resolvedParts.scheme = baseURL.scheme();
        }
        else if (parts.scheme || parts.authority)
        {
            resolvedParts = parts;
        }
        else
        {
            resolvedParts = {};
            resolvedParts.scheme = baseParts.scheme;
            resolvedParts.authority = baseParts.authority;
            resolvedParts.userInfo = baseParts.userInfo;
            resolvedParts.user = baseParts.user;
            resolvedParts.password = baseParts.password;
            resolvedParts.domain = baseParts.domain;
            resolvedParts.portNumber = baseParts.portNumber;
            resolvedParts.queryString = parts.queryString;
            resolvedParts.fragment = parts.fragment;
            var pathComponents = parts.pathComponents;
            if (pathComponents.length && pathComponents[0] === "/")
            {
                resolvedParts.path = parts.path;
                resolvedParts.pathComponents = pathComponents;
            }
            else
            {
                var basePathComponents = baseParts.pathComponents,
                    resolvedPathComponents = basePathComponents.concat(pathComponents);
                if (!baseURL.hasDirectoryPath() && basePathComponents.length)
                    resolvedPathComponents.splice(basePathComponents.length - 1, 1);
                if (pathComponents.length && (pathComponents[0] === ".." || pathComponents[0] === "."))
                    standardizePathComponents(resolvedPathComponents, YES);
                resolvedParts.pathComponents = resolvedPathComponents;
                resolvedParts.path = pathFromPathComponents(resolvedPathComponents, pathComponents.length <= 0 || aURL.hasDirectoryPath());
            }
        }
        var resolvedString = URLStringFromParts(resolvedParts),
            resolvedURL = new CFURL(resolvedString);
        resolvedURL._parts = resolvedParts;
        resolvedURL._standardizedURL = resolvedURL;
        resolvedURL._standardizedString = resolvedString;
        resolvedURL._absoluteURL = resolvedURL;
        resolvedURL._absoluteString = resolvedString;
        return resolvedURL;
    }
    function pathFromPathComponents(pathComponents, isDirectoryPath)
    {
        var path = pathComponents.join("/");
        if (path.length && path.charAt(0) === "/")
            path = path.substr(1);
        if (isDirectoryPath)
            path += "/";
        return path;
    }
    function standardizePathComponents(pathComponents, inPlace)
    {
        var index = 0,
            resultIndex = 0,
            count = pathComponents.length,
            result = inPlace ? pathComponents : [],
            startsWithPeriod = NO;
        for (; index < count; ++index)
        {
            var component = pathComponents[index];
            if (component === "")
                continue;
            if (component === ".")
            {
                startsWithPeriod = resultIndex === 0;
                continue;
            }
            if (component !== ".." || resultIndex === 0 || result[resultIndex - 1] === "..")
            {
                result[resultIndex] = component;
                resultIndex++;
                continue;
            }
            if (resultIndex > 0 && result[resultIndex - 1] !== "/")
                --resultIndex;
        }
        if (startsWithPeriod && resultIndex === 0)
            result[resultIndex++] = ".";
        result.length = resultIndex;
        return result;
    }
    function URLStringFromParts(parts)
    {
        var string = "",
            scheme = parts.scheme;
        if (scheme)
            string += scheme + ":";
        var authority = parts.authority;
        if (authority)
            string += "//" + authority;
        string += parts.path;
        var queryString = parts.queryString;
        if (queryString)
            string += "?" + queryString;
        var fragment = parts.fragment;
        if (fragment)
            string += "#" + fragment;
        return string;
    }
    CFURL.prototype.absoluteURL =     function()
    {
        if (this._absoluteURL === undefined)
            this._absoluteURL = resolveURL(this);
        return this._absoluteURL;
    };
    CFURL.prototype.absoluteURL.displayName = "CFURL . prototype . absoluteURL";
    CFURL.prototype.standardizedURL =     function()
    {
        if (this._standardizedURL === undefined)
        {
            var parts = this._parts || CFURLGetParts(this),
                pathComponents = parts.pathComponents,
                standardizedPathComponents = standardizePathComponents(pathComponents, NO);
            var standardizedPath = pathFromPathComponents(standardizedPathComponents, this.hasDirectoryPath());
            if (parts.path === standardizedPath)
                this._standardizedURL = this;
            else
            {
                var standardizedParts = CFURLPartsCreateCopy(parts);
                standardizedParts.pathComponents = standardizedPathComponents;
                standardizedParts.path = standardizedPath;
                var standardizedURL = new CFURL(URLStringFromParts(standardizedParts), this.baseURL());
                standardizedURL._parts = standardizedParts;
                standardizedURL._standardizedURL = standardizedURL;
                this._standardizedURL = standardizedURL;
            }
        }
        return this._standardizedURL;
    };
    CFURL.prototype.standardizedURL.displayName = "CFURL . prototype . standardizedURL";
    function CFURLPartsCreateCopy(parts)
    {
        var copiedParts = {},
            count = URI_KEYS.length;
        while (count--)
        {
            var partName = URI_KEYS[count];
            copiedParts[partName] = parts[partName];
        }
        return copiedParts;
    }
    CFURL.prototype.string =     function()
    {
        return this._string;
    };
    CFURL.prototype.string.displayName = "CFURL . prototype . string";
    CFURL.prototype.authority =     function()
    {
        var authority = (this._parts || CFURLGetParts(this)).authority;
        if (authority)
            return authority;
        var baseURL = this.baseURL();
        return baseURL && baseURL.authority() || "";
    };
    CFURL.prototype.authority.displayName = "CFURL . prototype . authority";
    CFURL.prototype.hasDirectoryPath =     function()
    {
        var hasDirectoryPath = this._hasDirectoryPath;
        if (hasDirectoryPath === undefined)
        {
            var path = this.path();
            if (!path)
                return NO;
            if (path.charAt(path.length - 1) === "/")
                return YES;
            var lastPathComponent = this.lastPathComponent();
            hasDirectoryPath = lastPathComponent === "." || lastPathComponent === "..";
            this._hasDirectoryPath = hasDirectoryPath;
        }
        return hasDirectoryPath;
    };
    CFURL.prototype.hasDirectoryPath.displayName = "CFURL . prototype . hasDirectoryPath";
    CFURL.prototype.hostName =     function()
    {
        return this.authority();
    };
    CFURL.prototype.hostName.displayName = "CFURL . prototype . hostName";
    CFURL.prototype.fragment =     function()
    {
        return (this._parts || CFURLGetParts(this)).fragment;
    };
    CFURL.prototype.fragment.displayName = "CFURL . prototype . fragment";
    CFURL.prototype.lastPathComponent =     function()
    {
        if (this._lastPathComponent === undefined)
        {
            var pathComponents = this.pathComponents(),
                pathComponentCount = pathComponents.length;
            if (!pathComponentCount)
                this._lastPathComponent = "";
            else
                this._lastPathComponent = pathComponents[pathComponentCount - 1];
        }
        return this._lastPathComponent;
    };
    CFURL.prototype.lastPathComponent.displayName = "CFURL . prototype . lastPathComponent";
    CFURL.prototype.path =     function()
    {
        return (this._parts || CFURLGetParts(this)).path;
    };
    CFURL.prototype.path.displayName = "CFURL . prototype . path";
    CFURL.prototype.createCopyDeletingLastPathComponent =     function()
    {
        var parts = this._parts || CFURLGetParts(this),
            components = standardizePathComponents(parts.pathComponents, NO);
        if (components.length > 0)
            if (components.length > 1 || components[0] !== "/")
                components.pop();
        var isRoot = components.length === 1 && components[0] === "/";
        parts.pathComponents = components;
        parts.path = isRoot ? "/" : pathFromPathComponents(components, NO);
        return new CFURL(URLStringFromParts(parts));
    };
    CFURL.prototype.createCopyDeletingLastPathComponent.displayName = "CFURL . prototype . createCopyDeletingLastPathComponent";
    CFURL.prototype.pathComponents =     function()
    {
        return (this._parts || CFURLGetParts(this)).pathComponents;
    };
    CFURL.prototype.pathComponents.displayName = "CFURL . prototype . pathComponents";
    CFURL.prototype.pathExtension =     function()
    {
        var lastPathComponent = this.lastPathComponent();
        if (!lastPathComponent)
            return NULL;
        lastPathComponent = lastPathComponent.replace(/^\.*/, '');
        var index = lastPathComponent.lastIndexOf(".");
        return index <= 0 ? "" : lastPathComponent.substring(index + 1);
    };
    CFURL.prototype.pathExtension.displayName = "CFURL . prototype . pathExtension";
    CFURL.prototype.queryString =     function()
    {
        return (this._parts || CFURLGetParts(this)).queryString;
    };
    CFURL.prototype.queryString.displayName = "CFURL . prototype . queryString";
    CFURL.prototype.scheme =     function()
    {
        var scheme = this._scheme;
        if (scheme === undefined)
        {
            scheme = (this._parts || CFURLGetParts(this)).scheme;
            if (!scheme)
            {
                var baseURL = this.baseURL();
                scheme = baseURL && baseURL.scheme();
            }
            this._scheme = scheme;
        }
        return scheme;
    };
    CFURL.prototype.scheme.displayName = "CFURL . prototype . scheme";
    CFURL.prototype.user =     function()
    {
        return (this._parts || CFURLGetParts(this)).user;
    };
    CFURL.prototype.user.displayName = "CFURL . prototype . user";
    CFURL.prototype.password =     function()
    {
        return (this._parts || CFURLGetParts(this)).password;
    };
    CFURL.prototype.password.displayName = "CFURL . prototype . password";
    CFURL.prototype.portNumber =     function()
    {
        return (this._parts || CFURLGetParts(this)).portNumber;
    };
    CFURL.prototype.portNumber.displayName = "CFURL . prototype . portNumber";
    CFURL.prototype.domain =     function()
    {
        return (this._parts || CFURLGetParts(this)).domain;
    };
    CFURL.prototype.domain.displayName = "CFURL . prototype . domain";
    CFURL.prototype.baseURL =     function()
    {
        return this._baseURL;
    };
    CFURL.prototype.baseURL.displayName = "CFURL . prototype . baseURL";
    CFURL.prototype.asDirectoryPathURL =     function()
    {
        if (this.hasDirectoryPath())
            return this;
        var lastPathComponent = this.lastPathComponent();
        if (lastPathComponent !== "/")
            lastPathComponent = "./" + lastPathComponent;
        return new CFURL(lastPathComponent + "/", this);
    };
    CFURL.prototype.asDirectoryPathURL.displayName = "CFURL . prototype . asDirectoryPathURL";
    function CFURLGetResourcePropertiesForKeys(aURL)
    {
        if (!aURL._resourcePropertiesForKeys)
            aURL._resourcePropertiesForKeys = new CFMutableDictionary();
        return aURL._resourcePropertiesForKeys;
    }
    CFURL.prototype.resourcePropertyForKey =     function(aKey)
    {
        return CFURLGetResourcePropertiesForKeys(this).valueForKey(aKey);
    };
    CFURL.prototype.resourcePropertyForKey.displayName = "CFURL . prototype . resourcePropertyForKey";
    CFURL.prototype.setResourcePropertyForKey =     function(aKey, aValue)
    {
        CFURLGetResourcePropertiesForKeys(this).setValueForKey(aKey, aValue);
    };
    CFURL.prototype.setResourcePropertyForKey.displayName = "CFURL . prototype . setResourcePropertyForKey";
    CFURL.prototype.staticResourceData =     function()
    {
        var data = new CFMutableData();
        data.setRawString(StaticResource.resourceAtURL(this).contents());
        return data;
    };
    CFURL.prototype.staticResourceData.displayName = "CFURL . prototype . staticResourceData";
    function MarkedStream(aString)
    {
        this._string = aString;
        var index = aString.indexOf(";");
        this._magicNumber = aString.substr(0, index);
        this._location = aString.indexOf(";", ++index);
        this._version = aString.substring(index, this._location++);
    }
    MarkedStream.prototype.magicNumber =     function()
    {
        return this._magicNumber;
    };
    MarkedStream.prototype.magicNumber.displayName = "MarkedStream . prototype . magicNumber";
    MarkedStream.prototype.version =     function()
    {
        return this._version;
    };
    MarkedStream.prototype.version.displayName = "MarkedStream . prototype . version";
    MarkedStream.prototype.getMarker =     function()
    {
        var string = this._string,
            location = this._location;
        if (location >= string.length)
            return null;
        var next = string.indexOf(';', location);
        if (next < 0)
            return null;
        var marker = string.substring(location, next);
        if (marker === 'e')
            return null;
        this._location = next + 1;
        return marker;
    };
    MarkedStream.prototype.getMarker.displayName = "MarkedStream . prototype . getMarker";
    MarkedStream.prototype.getString =     function()
    {
        var string = this._string,
            location = this._location;
        if (location >= string.length)
            return null;
        var next = string.indexOf(';', location);
        if (next < 0)
            return null;
        var size = parseInt(string.substring(location, next), 10),
            text = string.substr(next + 1, size);
        this._location = next + 1 + size;
        return text;
    };
    MarkedStream.prototype.getString.displayName = "MarkedStream . prototype . getString";
    var CFBundleUnloaded = 0,
        CFBundleLoading = 1 << 0,
        CFBundleLoadingInfoPlist = 1 << 1,
        CFBundleLoadingExecutable = 1 << 2,
        CFBundleLoadingSpritedImages = 1 << 3,
        CFBundleLoadingLocalizableStrings = 1 << 4,
        CFBundleLoaded = 1 << 5;
    var CFBundlesForURLStrings = {},
        CFBundlesForClasses = {},
        CFBundlesWithIdentifiers = {},
        CFCacheBuster = new Date().getTime(),
        CFTotalBytesLoaded = 0,
        CPApplicationSizeInBytes = 0;
    var CPBundleDefaultBrowserLanguage = "CPBundleDefaultBrowserLanguage",
        CPBundleDefaultLanguage = "CPBundleDefaultLanguage";
    CFBundle =     function(aURL)
    {
        aURL = makeAbsoluteURL(aURL).asDirectoryPathURL();
        var URLString = aURL.absoluteString(),
            existingBundle = CFBundlesForURLStrings[URLString];
        if (existingBundle)
            return existingBundle;
        CFBundlesForURLStrings[URLString] = this;
        this._bundleURL = aURL;
        this._resourcesDirectoryURL = new CFURL("Resources/", aURL);
        this._staticResource = NULL;
        this._isValid = NO;
        this._loadStatus = CFBundleUnloaded;
        this._loadRequests = [];
        this._infoDictionary = new CFDictionary();
        this._eventDispatcher = new EventDispatcher(this);
        this._localizableStrings = [];
        this._loadedLanguage = NULL;
    };
    CFBundle.displayName = "CFBundle";
    CFBundle.environments =     function()
    {
        return ["Browser", "ObjJ"];
    };
    CFBundle.environments.displayName = "CFBundle . environments";
    CFBundle.bundleContainingURL =     function(aURL)
    {
        aURL = new CFURL(".", makeAbsoluteURL(aURL));
        var previousURLString,
            URLString = aURL.absoluteString();
        while (!previousURLString || previousURLString !== URLString)
        {
            var bundle = CFBundlesForURLStrings[URLString];
            if (bundle && bundle._isValid)
                return bundle;
            aURL = new CFURL("..", aURL);
            previousURLString = URLString;
            URLString = aURL.absoluteString();
        }
        return NULL;
    };
    CFBundle.bundleContainingURL.displayName = "CFBundle . bundleContainingURL";
    CFBundle.mainBundle =     function()
    {
        return new CFBundle(mainBundleURL);
    };
    CFBundle.mainBundle.displayName = "CFBundle . mainBundle";
    function addClassToBundle(aClass, aBundle)
    {
        if (aBundle)
            CFBundlesForClasses[aClass.name] = aBundle;
    }
    function resetBundle()
    {
        CFBundlesForURLStrings = {};
        CFBundlesForClasses = {};
        CFBundlesWithIdentifiers = {};
        CFTotalBytesLoaded = 0;
        CPApplicationSizeInBytes = 0;
    }
    CFBundle.bundleForClass =     function(aClass)
    {
        return CFBundlesForClasses[aClass.name] || CFBundle.mainBundle();
    };
    CFBundle.bundleForClass.displayName = "CFBundle . bundleForClass";
    CFBundle.bundleWithIdentifier =     function(bundleID)
    {
        return CFBundlesWithIdentifiers[bundleID] || NULL;
    };
    CFBundle.bundleWithIdentifier.displayName = "CFBundle . bundleWithIdentifier";
    CFBundle.prototype.bundleURL =     function()
    {
        return this._bundleURL.absoluteURL();
    };
    CFBundle.prototype.bundleURL.displayName = "CFBundle . prototype . bundleURL";
    CFBundle.prototype.resourcesDirectoryURL =     function()
    {
        return this._resourcesDirectoryURL;
    };
    CFBundle.prototype.resourcesDirectoryURL.displayName = "CFBundle . prototype . resourcesDirectoryURL";
    CFBundle.prototype.resourceURL =     function(aResourceName, aType, aSubDirectory, localizationName)
    {
        if (aType)
            aResourceName = aResourceName + "." + aType;
        if (localizationName)
            aResourceName = localizationName + aResourceName;
        if (aSubDirectory)
            aResourceName = aSubDirectory + "/" + aResourceName;
        var resourceURL = new CFURL(aResourceName, this.resourcesDirectoryURL()).mappedURL();
        return resourceURL.absoluteURL();
    };
    CFBundle.prototype.resourceURL.displayName = "CFBundle . prototype . resourceURL";
    CFBundle.prototype.mostEligibleEnvironmentURL =     function()
    {
        if (this._mostEligibleEnvironmentURL === undefined)
            this._mostEligibleEnvironmentURL = new CFURL(this.mostEligibleEnvironment() + ".environment/", this.bundleURL());
        return this._mostEligibleEnvironmentURL;
    };
    CFBundle.prototype.mostEligibleEnvironmentURL.displayName = "CFBundle . prototype . mostEligibleEnvironmentURL";
    CFBundle.prototype.executableURL =     function()
    {
        if (this._executableURL === undefined)
        {
            var executableSubPath = this.valueForInfoDictionaryKey("CPBundleExecutable");
            if (!executableSubPath)
                this._executableURL = NULL;
            else
                this._executableURL = new CFURL(executableSubPath, this.mostEligibleEnvironmentURL());
        }
        return this._executableURL;
    };
    CFBundle.prototype.executableURL.displayName = "CFBundle . prototype . executableURL";
    CFBundle.prototype.infoDictionary =     function()
    {
        return this._infoDictionary;
    };
    CFBundle.prototype.infoDictionary.displayName = "CFBundle . prototype . infoDictionary";
    CFBundle.prototype.loadedLanguage =     function()
    {
        return this._loadedLanguage;
    };
    CFBundle.prototype.valueForInfoDictionaryKey =     function(aKey)
    {
        return this._infoDictionary.valueForKey(aKey);
    };
    CFBundle.prototype.valueForInfoDictionaryKey.displayName = "CFBundle . prototype . valueForInfoDictionaryKey";
    CFBundle.prototype.identifier =     function()
    {
        return this._infoDictionary.valueForKey("CPBundleIdentifier");
    };
    CFBundle.prototype.identifier.displayName = "CFBundle . prototype . identifier";
    CFBundle.prototype.hasSpritedImages =     function()
    {
        var environments = this._infoDictionary.valueForKey("CPBundleEnvironmentsWithImageSprites") || [],
            index = environments.length,
            mostEligibleEnvironment = this.mostEligibleEnvironment();
        while (index--)
            if (environments[index] === mostEligibleEnvironment)
                return YES;
        return NO;
    };
    CFBundle.prototype.hasSpritedImages.displayName = "CFBundle . prototype . hasSpritedImages";
    CFBundle.prototype.environments =     function()
    {
        return this._infoDictionary.valueForKey("CPBundleEnvironments") || ["ObjJ"];
    };
    CFBundle.prototype.environments.displayName = "CFBundle . prototype . environments";
    CFBundle.prototype.mostEligibleEnvironment =     function(environments)
    {
        environments = environments || this.environments();
        var objj_environments = CFBundle.environments(),
            index = 0,
            count = objj_environments.length,
            innerCount = environments.length;
        for (; index < count; ++index)
        {
            var innerIndex = 0,
                environment = objj_environments[index];
            for (; innerIndex < innerCount; ++innerIndex)
                if (environment === environments[innerIndex])
                    return environment;
        }
        return NULL;
    };
    CFBundle.prototype.mostEligibleEnvironment.displayName = "CFBundle . prototype . mostEligibleEnvironment";
    CFBundle.prototype.isLoading =     function()
    {
        return this._loadStatus & CFBundleLoading;
    };
    CFBundle.prototype.isLoading.displayName = "CFBundle . prototype . isLoading";
    CFBundle.prototype.isLoaded =     function()
    {
        return !!(this._loadStatus & CFBundleLoaded);
    };
    CFBundle.prototype.isLoaded.displayName = "CFBundle . prototype . isLoaded";
    CFBundle.prototype.load =     function(shouldExecute)
    {
        if (this._loadStatus !== CFBundleUnloaded)
            return;
        this._loadStatus = CFBundleLoading | CFBundleLoadingInfoPlist;
        var self = this,
            bundleURL = this.bundleURL(),
            parentURL = new CFURL("..", bundleURL);
        if (parentURL.absoluteString() === bundleURL.absoluteString())
            parentURL = parentURL.schemeAndAuthority();
        StaticResource.resolveResourceAtURL(parentURL, YES,         function(aStaticResource)
        {
            var resourceName = bundleURL.lastPathComponent();
            self._staticResource = aStaticResource._children[resourceName] || new StaticResource(bundleURL, aStaticResource, YES, NO);
            function onsuccess(anEvent)
            {
                self._loadStatus &= ~CFBundleLoadingInfoPlist;
                var infoDictionary = anEvent.request.responsePropertyList();
                self._isValid = !!infoDictionary || CFBundle.mainBundle() === self;
                if (infoDictionary)
                {
                    self._infoDictionary = infoDictionary;
                    var identifier = self._infoDictionary.valueForKey("CPBundleIdentifier");
                    if (identifier)
                        CFBundlesWithIdentifiers[identifier] = self;
                }
                if (!self._infoDictionary)
                {
                    finishBundleLoadingWithError(self, new Error("Could not load bundle at \"" + path + "\""));
                    return;
                }
                if (self === CFBundle.mainBundle() && self.valueForInfoDictionaryKey("CPApplicationSize"))
                    CPApplicationSizeInBytes = self.valueForInfoDictionaryKey("CPApplicationSize").valueForKey("executable") || 0;
                loadLanguageForBundle(self);
                loadExecutableAndResources(self, shouldExecute);
            }
            function onfailure()
            {
                self._isValid = CFBundle.mainBundle() === self;
                self._loadStatus = CFBundleUnloaded;
                finishBundleLoadingWithError(self, new Error("Could not load bundle at \"" + self.bundleURL() + "\""));
            }
            new FileRequest(new CFURL("Info.plist", self.bundleURL()), onsuccess, onfailure);
        });
    };
    CFBundle.prototype.load.displayName = "CFBundle . prototype . load";
    function finishBundleLoadingWithError(aBundle, anError)
    {
        resolveStaticResource(aBundle._staticResource);
        aBundle._eventDispatcher.dispatchEvent({type: "error", error: anError, bundle: aBundle});
    }
    function loadExecutableAndResources(aBundle, shouldExecute)
    {
        if (!aBundle.mostEligibleEnvironment())
            return failure();
        loadExecutableForBundle(aBundle, success, failure, progress);
        loadSpritedImagesForBundle(aBundle, success, failure, progress);
        loadLocalizableStringsForBundle(aBundle, success, failure, progress);
        if (aBundle._loadStatus === CFBundleLoading)
            return success();
        function failure(anError)
        {
            var loadRequests = aBundle._loadRequests,
                count = loadRequests.length;
            while (count--)
                loadRequests[count].abort();
            this._loadRequests = [];
            aBundle._loadStatus = CFBundleUnloaded;
            finishBundleLoadingWithError(aBundle, anError || new Error("Could not recognize executable code format in Bundle " + aBundle));
        }
        function progress(bytesLoaded)
        {
            if ((typeof CPApp === "undefined" || !CPApp || !CPApp._finishedLaunching) && typeof OBJJ_PROGRESS_CALLBACK === "function")
            {
                CFTotalBytesLoaded += bytesLoaded;
                var percent = CPApplicationSizeInBytes ? MAX(MIN(1.0, CFTotalBytesLoaded / CPApplicationSizeInBytes), 0.0) : 0;
                OBJJ_PROGRESS_CALLBACK(percent, CPApplicationSizeInBytes, aBundle.bundlePath());
            }
        }
        function success()
        {
            if (aBundle._loadStatus === CFBundleLoading)
                aBundle._loadStatus = CFBundleLoaded;
            else
                return;
            resolveStaticResource(aBundle._staticResource);
            function complete()
            {
                aBundle._eventDispatcher.dispatchEvent({type: "load", bundle: aBundle});
            }
            if (shouldExecute)
                executeBundle(aBundle, complete);
            else
                complete();
        }
    }
    function loadExecutableForBundle(aBundle, success, failure, progress)
    {
        var executableURL = aBundle.executableURL();
        if (!executableURL)
            return;
        aBundle._loadStatus |= CFBundleLoadingExecutable;
        new FileRequest(executableURL,         function(anEvent)
        {
            try {
                decompileStaticFile(aBundle, anEvent.request.responseText(), executableURL);
                aBundle._loadStatus &= ~CFBundleLoadingExecutable;
                success();
            }
            catch(anException) {
                failure(anException);
            }
        }, failure, progress);
    }
    function spritedImagesTestURLStringForBundle(aBundle)
    {
        return "mhtml:" + new CFURL("MHTMLTest.txt", aBundle.mostEligibleEnvironmentURL());
    }
    function spritedImagesURLForBundle(aBundle)
    {
        if (CFBundleSupportedSpriteType === CFBundleDataURLSpriteType)
            return new CFURL("dataURLs.txt", aBundle.mostEligibleEnvironmentURL());
        if (CFBundleSupportedSpriteType === CFBundleMHTMLSpriteType || CFBundleSupportedSpriteType === CFBundleMHTMLUncachedSpriteType)
            return new CFURL("MHTMLPaths.txt", aBundle.mostEligibleEnvironmentURL());
        return NULL;
    }
    function loadSpritedImagesForBundle(aBundle, success, failure, progress)
    {
        if (!aBundle.hasSpritedImages())
            return;
        aBundle._loadStatus |= CFBundleLoadingSpritedImages;
        if (!CFBundleHasTestedSpriteSupport())
            return CFBundleTestSpriteSupport(spritedImagesTestURLStringForBundle(aBundle),             function()
            {
                loadSpritedImagesForBundle(aBundle, success, failure, progress);
            });
        var spritedImagesURL = spritedImagesURLForBundle(aBundle);
        if (!spritedImagesURL)
        {
            aBundle._loadStatus &= ~CFBundleLoadingSpritedImages;
            return success();
        }
        new FileRequest(spritedImagesURL,         function(anEvent)
        {
            try {
                decompileStaticFile(aBundle, anEvent.request.responseText(), spritedImagesURL);
                aBundle._loadStatus &= ~CFBundleLoadingSpritedImages;
                success();
            }
            catch(anException) {
                failure(anException);
            }
        }, failure, progress);
    }
    function loadLocalizableStringsForBundle(aBundle, success, failure, progress)
    {
        var language = aBundle._loadedLanguage;
        if (!language)
            return;
        var localizableStrings = aBundle.valueForInfoDictionaryKey("CPBundleLocalizableStrings");
        if (!localizableStrings)
            return;
        var self = aBundle,
            length = localizableStrings.length,
            languagePathURL = new CFURL(language + ".lproj/", self.resourcesDirectoryURL()),
            fileSuccessed = 0;
        for (var i = 0; i < length; i++)
        {
            var localizableString = localizableStrings[i];
            function onsuccess(anEvent)
            {
                var contentFile = anEvent.request.responseText(),
                    tableName = new CFURL(anEvent.request._URL).lastPathComponent();
                try {
                    loadLocalizableContentForFileInBundle(self, contentFile, tableName);
                    if (++fileSuccessed == length)
                    {
                        aBundle._loadStatus &= ~CFBundleLoadingLocalizableStrings;
                        success();
                    }
                }
                catch(e) {
                    failure(new Error("Error when parsing the localizable file " + tableName));
                }
            }
            aBundle._loadStatus |= CFBundleLoadingLocalizableStrings;
            new FileRequest(new CFURL(localizableString, languagePathURL), onsuccess, failure, progress);
        }
    }
    function loadLocalizableContentForFileInBundle(bundle, contentFile, tableName)
    {
        var values = {},
            lines = contentFile.split("\n"),
            currentContext;
        bundle._localizableStrings[tableName] = values;
        for (var i = 0; i < lines.length; i++)
        {
            var line = lines[i];
            if (line[0] == "/")
            {
                currentContext = line.substring(2, line.length - 2).trim();
                continue;
            }
            if (line[0] == "\"")
            {
                var split = line.split("\"");
                var key = split[1];
                if (!(key in values))
                    values[key] = split[3];
                key += currentContext;
                if (!(key in values))
                    values[key] = split[3];
                continue;
            }
        }
    }
    function loadLanguageForBundle(aBundle)
    {
        if (aBundle._loadedLanguage)
            return;
        var defaultLanguage = aBundle.valueForInfoDictionaryKey(CPBundleDefaultLanguage);
        if (defaultLanguage != CPBundleDefaultBrowserLanguage && defaultLanguage)
        {
            aBundle._loadedLanguage = defaultLanguage;
            return;
        }
        if (typeof navigator == "undefined")
            return;
        var language = typeof navigator.language !== "undefined" ? navigator.language : navigator.userLanguage;
        if (!language)
            return;
        aBundle._loadedLanguage = language.substring(0, 2);
    }
    var CFBundleSpriteSupportListeners = [],
        CFBundleSupportedSpriteType = -1,
        CFBundleNoSpriteType = 0,
        CFBundleDataURLSpriteType = 1,
        CFBundleMHTMLSpriteType = 2,
        CFBundleMHTMLUncachedSpriteType = 3;
    function CFBundleHasTestedSpriteSupport()
    {
        return CFBundleSupportedSpriteType !== -1;
    }
    function CFBundleTestSpriteSupport(MHTMLPath, aCallback)
    {
        if (CFBundleHasTestedSpriteSupport())
            return;
        CFBundleSpriteSupportListeners.push(aCallback);
        if (CFBundleSpriteSupportListeners.length > 1)
            return;
        CFBundleSpriteSupportListeners.push(        function()
        {
            var size = 0,
                sizeDictionary = CFBundle.mainBundle().valueForInfoDictionaryKey("CPApplicationSize");
            if (!sizeDictionary)
                return;
            switch(CFBundleSupportedSpriteType) {
                case CFBundleDataURLSpriteType:
                    size = sizeDictionary.valueForKey("data");
                    break;
                case CFBundleMHTMLSpriteType:
                case CFBundleMHTMLUncachedSpriteType:
                    size = sizeDictionary.valueForKey("mhtml");
                    break;
            }
            CPApplicationSizeInBytes += size;
        });
        CFBundleTestSpriteTypes([CFBundleDataURLSpriteType, "data:image/gif;base64,R0lGODlhAQABAIAAAMc9BQAAACH5BAAAAAAALAAAAAABAAEAAAICRAEAOw==", CFBundleMHTMLSpriteType, MHTMLPath + "!test", CFBundleMHTMLUncachedSpriteType, MHTMLPath + "?" + CFCacheBuster + "!test"]);
    }
    function CFBundleNotifySpriteSupportListeners()
    {
        var count = CFBundleSpriteSupportListeners.length;
        while (count--)
            CFBundleSpriteSupportListeners[count]();
    }
    function CFBundleTestSpriteTypes(spriteTypes)
    {
        if (!("Image" in global) || spriteTypes.length < 2)
        {
            CFBundleSupportedSpriteType = CFBundleNoSpriteType;
            CFBundleNotifySpriteSupportListeners();
            return;
        }
        var image = new Image();
        image.onload =         function()
        {
            if (image.width === 1 && image.height === 1)
            {
                CFBundleSupportedSpriteType = spriteTypes[0];
                CFBundleNotifySpriteSupportListeners();
            }
            else
                image.onerror();
        };
        image.onerror =         function()
        {
            CFBundleTestSpriteTypes(spriteTypes.slice(2));
        };
        image.src = spriteTypes[1];
    }
    function executeBundle(aBundle, aCallback)
    {
        var staticResources = [aBundle._staticResource];
        function executeStaticResources(index)
        {
            for (; index < staticResources.length; ++index)
            {
                var staticResource = staticResources[index];
                if (staticResource.isNotFound())
                    continue;
                if (staticResource.isFile())
                {
                    var executable = new FileExecutable(staticResource.URL());
                    if (executable.hasLoadedFileDependencies())
                        executable.execute();
                    else
                    {
                        executable.loadFileDependencies(                        function()
                        {
                            executeStaticResources(index);
                        });
                        return;
                    }
                }
                else
                {
                    if (staticResource.URL().absoluteString() === aBundle.resourcesDirectoryURL().absoluteString())
                        continue;
                    var children = staticResource.children();
                    for (var name in children)
                        if (hasOwnProperty.call(children, name))
                            staticResources.push(children[name]);
                }
            }
            aCallback();
        }
        executeStaticResources(0);
    }
    var STATIC_MAGIC_NUMBER = "@STATIC",
        MARKER_PATH = "p",
        MARKER_URI = "u",
        MARKER_CODE = "c",
        MARKER_TEXT = "t",
        MARKER_IMPORT_STD = 'I',
        MARKER_IMPORT_LOCAL = 'i';
    MARKER_SOURCE_MAP = 'S';
    function decompileStaticFile(aBundle, aString, aPath)
    {
        var stream = new MarkedStream(aString);
        if (stream.magicNumber() !== STATIC_MAGIC_NUMBER)
            throw new Error("Could not read static file: " + aPath);
        if (stream.version() !== "1.0")
            throw new Error("Could not read static file: " + aPath);
        var marker,
            bundleURL = aBundle.bundleURL(),
            file = NULL;
        while (marker = stream.getMarker())
        {
            var text = stream.getString();
            if (marker === MARKER_PATH)
            {
                var fileURL = new CFURL(text, bundleURL),
                    parent = StaticResource.resourceAtURL(new CFURL(".", fileURL), YES);
                file = new StaticResource(fileURL, parent, NO, YES);
            }
            else if (marker === MARKER_URI)
            {
                var URL = new CFURL(text, bundleURL),
                    mappedURLString = stream.getString();
                if (mappedURLString.indexOf("mhtml:") === 0)
                {
                    mappedURLString = "mhtml:" + new CFURL(mappedURLString.substr("mhtml:".length), bundleURL);
                    if (CFBundleSupportedSpriteType === CFBundleMHTMLUncachedSpriteType)
                    {
                        var exclamationIndex = mappedURLString.indexOf("!"),
                            firstPart = mappedURLString.substring(0, exclamationIndex),
                            lastPart = mappedURLString.substring(exclamationIndex);
                        mappedURLString = firstPart + "?" + CFCacheBuster + lastPart;
                    }
                }
                CFURL.setMappedURLForURL(URL, new CFURL(mappedURLString));
                var parent = StaticResource.resourceAtURL(new CFURL(".", URL), YES);
                new StaticResource(URL, parent, NO, YES);
            }
            else if (marker === MARKER_TEXT)
                file.write(text);
        }
    }
    CFBundle.prototype.addEventListener =     function(anEventName, anEventListener)
    {
        this._eventDispatcher.addEventListener(anEventName, anEventListener);
    };
    CFBundle.prototype.addEventListener.displayName = "CFBundle . prototype . addEventListener";
    CFBundle.prototype.removeEventListener =     function(anEventName, anEventListener)
    {
        this._eventDispatcher.removeEventListener(anEventName, anEventListener);
    };
    CFBundle.prototype.removeEventListener.displayName = "CFBundle . prototype . removeEventListener";
    CFBundle.prototype.onerror =     function(anEvent)
    {
        throw anEvent.error;
    };
    CFBundle.prototype.onerror.displayName = "CFBundle . prototype . onerror";
    CFBundle.prototype.bundlePath =     function()
    {
        return this.bundleURL().path();
    };
    CFBundle.prototype.path =     function()
    {
        CPLog.warn("CFBundle.prototype.path is deprecated, use CFBundle.prototype.bundlePath instead.");
        return this.bundlePath.apply(this, arguments);
    };
    CFBundle.prototype.pathForResource =     function(aResource, aType, aSubDirectory, localizationName)
    {
        return this.resourceURL(aResource, aType, aSubDirectory, localizationName).absoluteString();
    };
    CFBundleCopyLocalizedString =     function(bundle, key, value, tableName)
    {
        return CFCopyLocalizedStringWithDefaultValue(key, tableName, bundle, value, "");
    };
    CFBundleCopyBundleLocalizations =     function(aBundle)
    {
        return [this._loadedLanguage];
    };
    CFCopyLocalizedString =     function(key, comment)
    {
        return CFCopyLocalizedStringFromTable(key, "Localizable", comment);
    };
    CFCopyLocalizedStringFromTable =     function(key, tableName, comment)
    {
        return CFCopyLocalizedStringFromTableInBundle(key, tableName, CFBundleGetMainBundle(), comment);
    };
    CFCopyLocalizedStringFromTableInBundle =     function(key, tableName, bundle, comment)
    {
        return CFCopyLocalizedStringWithDefaultValue(key, tableName, bundle, null, comment);
    };
    CFCopyLocalizedStringWithDefaultValue =     function(key, tableName, bundle, value, comment)
    {
        var string;
        if (!tableName)
            tableName = "Localizable";
        tableName += ".strings";
        var localizableString = bundle._localizableStrings[tableName];
        string = localizableString ? localizableString[key + comment] : null;
        return string || (value || key);
    };
    CFBundleGetMainBundle =     function()
    {
        return CFBundle.mainBundle();
    };
    var rootResources = {};
    function StaticResource(aURL, aParent, isDirectory, isResolved, aFilenameTranslateDictionary)
    {
        this._parent = aParent;
        this._eventDispatcher = new EventDispatcher(this);
        var name = aURL.absoluteURL().lastPathComponent() || aURL.schemeAndAuthority();
        this._name = name;
        this._URL = aURL;
        this._isResolved = !!isResolved;
        this._filenameTranslateDictionary = aFilenameTranslateDictionary;
        if (isDirectory)
            this._URL = this._URL.asDirectoryPathURL();
        if (!aParent)
            rootResources[name] = this;
        this._isDirectory = !!isDirectory;
        this._isNotFound = NO;
        if (aParent)
            aParent._children[name] = this;
        if (isDirectory)
            this._children = {};
        else
            this._contents = "";
    }
    StaticResource.rootResources =     function()
    {
        return rootResources;
    };
    function countProp(x)
    {
        var count = 0;
        for (var k in x)
        {
            if (x.hasOwnProperty(k))
            {
                ++count;
            }
        }
        return count;
    }
    StaticResource.resetRootResources =     function()
    {
        rootResources = {};
    };
    StaticResource.prototype.filenameTranslateDictionary =     function()
    {
        return this._filenameTranslateDictionary || {};
    };
    exports.StaticResource = StaticResource;
    function resolveStaticResource(aResource)
    {
        aResource._isResolved = YES;
        aResource._eventDispatcher.dispatchEvent({type: "resolve", staticResource: aResource});
    }
    StaticResource.prototype.resolve =     function()
    {
        if (this.isDirectory())
        {
            var bundle = new CFBundle(this.URL());
            bundle.onerror =             function()
            {
            };
            bundle.load(NO);
        }
        else
        {
            var self = this;
            function onsuccess(anEvent)
            {
                self._contents = anEvent.request.responseText();
                resolveStaticResource(self);
            }
            function onfailure()
            {
                self._isNotFound = YES;
                resolveStaticResource(self);
            }
            var url = this.URL(),
                aFilenameTranslateDictionary = this.filenameTranslateDictionary();
            if (aFilenameTranslateDictionary)
            {
                var urlString = url.toString(),
                    lastPathComponent = url.lastPathComponent(),
                    basePath = urlString.substring(0, urlString.length - lastPathComponent.length),
                    translatedName = aFilenameTranslateDictionary[lastPathComponent];
                if (translatedName && urlString.slice(-translatedName.length) !== translatedName)
                    url = new CFURL(basePath + translatedName);
            }
            new FileRequest(url, onsuccess, onfailure);
        }
    };
    StaticResource.prototype.name =     function()
    {
        return this._name;
    };
    StaticResource.prototype.URL =     function()
    {
        return this._URL;
    };
    StaticResource.prototype.contents =     function()
    {
        return this._contents;
    };
    StaticResource.prototype.children =     function()
    {
        return this._children;
    };
    StaticResource.prototype.parent =     function()
    {
        return this._parent;
    };
    StaticResource.prototype.isResolved =     function()
    {
        return this._isResolved;
    };
    StaticResource.prototype.write =     function(aString)
    {
        this._contents += aString;
    };
    function rootResourceForAbsoluteURL(anAbsoluteURL)
    {
        var schemeAndAuthority = anAbsoluteURL.schemeAndAuthority(),
            resource = rootResources[schemeAndAuthority];
        if (!resource)
            resource = new StaticResource(new CFURL(schemeAndAuthority), NULL, YES, YES);
        return resource;
    }
    StaticResource.resourceAtURL =     function(aURL, resolveAsDirectoriesIfNecessary)
    {
        aURL = makeAbsoluteURL(aURL).absoluteURL();
        var resource = rootResourceForAbsoluteURL(aURL),
            components = aURL.pathComponents(),
            index = 0,
            count = components.length;
        for (; index < count; ++index)
        {
            var name = components[index];
            if (hasOwnProperty.call(resource._children, name))
                resource = resource._children[name];
            else if (resolveAsDirectoriesIfNecessary)
            {
                if (name !== "/")
                    name = "./" + name;
                resource = new StaticResource(new CFURL(name, resource.URL()), resource, YES, YES);
            }
            else
                throw new Error("Static Resource at " + aURL + " is not resolved (\"" + name + "\")");
        }
        return resource;
    };
    StaticResource.prototype.resourceAtURL =     function(aURL, resolveAsDirectoriesIfNecessary)
    {
        return StaticResource.resourceAtURL(new CFURL(aURL, this.URL()), resolveAsDirectoriesIfNecessary);
    };
    StaticResource.resolveResourcesAtURLs =     function(URLs, aCallback)
    {
        var count = URLs.length,
            allResources = {};
        for (var i = 0, size = count; i < size; i++)
        {
            var url = URLs[i];
            StaticResource.resolveResourceAtURL(url, NO,             function(aResource)
            {
                allResources[url] = aResource;
                if (--count === 0)
                    aCallback(allResources);
            });
        }
    };
    StaticResource.resolveResourceAtURL =     function(aURL, isDirectory, aCallback, aFilenameTranslateDictionary)
    {
        aURL = makeAbsoluteURL(aURL).absoluteURL();
        resolveResourceComponents(rootResourceForAbsoluteURL(aURL), isDirectory, aURL.pathComponents(), 0, aCallback, aFilenameTranslateDictionary);
    };
    StaticResource.prototype.resolveResourceAtURL =     function(aURL, isDirectory, aCallback)
    {
        StaticResource.resolveResourceAtURL(new CFURL(aURL, this.URL()).absoluteURL(), isDirectory, aCallback);
    };
    function resolveResourceComponents(aResource, isDirectory, components, index, aCallback, aFilenameTranslateDictionary)
    {
        var count = components.length;
        for (; index < count; ++index)
        {
            var name = components[index],
                child = hasOwnProperty.call(aResource._children, name) && aResource._children[name];
            if (!child)
            {
                child = new StaticResource(new CFURL(name, aResource.URL()), aResource, index + 1 < count || isDirectory, NO, aFilenameTranslateDictionary);
                child.resolve();
            }
            if (!child.isResolved())
                return child.addEventListener("resolve",                 function()
                {
                    resolveResourceComponents(aResource, isDirectory, components, index, aCallback, aFilenameTranslateDictionary);
                });
            if (child.isNotFound())
                return aCallback(null, new Error("File not found: " + components.join("/")));
            if (index + 1 < count && child.isFile())
                return aCallback(null, new Error("File is not a directory: " + components.join("/")));
            aResource = child;
        }
        aCallback(aResource);
    }
    function resolveResourceAtURLSearchingIncludeURLs(aURL, anIndex, aCallback)
    {
        var includeURLs = StaticResource.includeURLs(),
            searchURL = new CFURL(aURL, includeURLs[anIndex]).absoluteURL();
        StaticResource.resolveResourceAtURL(searchURL, NO,         function(aStaticResource)
        {
            if (!aStaticResource)
            {
                if (anIndex + 1 < includeURLs.length)
                    resolveResourceAtURLSearchingIncludeURLs(aURL, anIndex + 1, aCallback);
                else
                    aCallback(NULL);
                return;
            }
            aCallback(aStaticResource);
        });
    }
    StaticResource.resolveResourceAtURLSearchingIncludeURLs =     function(aURL, aCallback)
    {
        resolveResourceAtURLSearchingIncludeURLs(aURL, 0, aCallback);
    };
    StaticResource.prototype.addEventListener =     function(anEventName, anEventListener)
    {
        this._eventDispatcher.addEventListener(anEventName, anEventListener);
    };
    StaticResource.prototype.removeEventListener =     function(anEventName, anEventListener)
    {
        this._eventDispatcher.removeEventListener(anEventName, anEventListener);
    };
    StaticResource.prototype.isNotFound =     function()
    {
        return this._isNotFound;
    };
    StaticResource.prototype.isFile =     function()
    {
        return !this._isDirectory;
    };
    StaticResource.prototype.isDirectory =     function()
    {
        return this._isDirectory;
    };
    StaticResource.prototype.toString =     function(includeNotFounds)
    {
        if (this.isNotFound())
            return "<file not found: " + this.name() + ">";
        var string = this.name();
        if (this.isDirectory())
        {
            var children = this._children;
            for (var name in children)
                if (children.hasOwnProperty(name))
                {
                    var child = children[name];
                    if (includeNotFounds || !child.isNotFound())
                        string += "\n\t" + children[name].toString(includeNotFounds).split('\n').join("\n\t");
                }
        }
        return string;
    };
    var includeURLs = NULL;
    StaticResource.includeURLs =     function()
    {
        if (includeURLs !== NULL)
            return includeURLs;
        includeURLs = [];
        if (!global.OBJJ_INCLUDE_PATHS && !global.OBJJ_INCLUDE_URLS)
            includeURLs = ["Frameworks", "Frameworks/Debug"];
        else
            includeURLs = (global.OBJJ_INCLUDE_PATHS || []).concat(global.OBJJ_INCLUDE_URLS || []);
        var count = includeURLs.length;
        while (count--)
            includeURLs[count] = new CFURL(includeURLs[count]).asDirectoryPathURL();
        return includeURLs;
    };
    var TOKEN_ACCESSORS = "accessors",
        TOKEN_CLASS = "class",
        TOKEN_END = "end",
        TOKEN_FUNCTION = "function",
        TOKEN_IMPLEMENTATION = "implementation",
        TOKEN_IMPORT = "import",
        TOKEN_EACH = "each",
        TOKEN_OUTLET = "outlet",
        TOKEN_ACTION = "action",
        TOKEN_NEW = "new",
        TOKEN_SELECTOR = "selector",
        TOKEN_SUPER = "super",
        TOKEN_VAR = "var",
        TOKEN_IN = "in",
        TOKEN_PRAGMA = "pragma",
        TOKEN_MARK = "mark",
        TOKEN_EQUAL = '=',
        TOKEN_PLUS = '+',
        TOKEN_MINUS = '-',
        TOKEN_COLON = ':',
        TOKEN_COMMA = ',',
        TOKEN_PERIOD = '.',
        TOKEN_ASTERISK = '*',
        TOKEN_SEMICOLON = ';',
        TOKEN_LESS_THAN = '<',
        TOKEN_OPEN_BRACE = '{',
        TOKEN_CLOSE_BRACE = '}',
        TOKEN_GREATER_THAN = '>',
        TOKEN_OPEN_BRACKET = '[',
        TOKEN_DOUBLE_QUOTE = '"',
        TOKEN_PREPROCESSOR = '@',
        TOKEN_HASH = '#',
        TOKEN_CLOSE_BRACKET = ']',
        TOKEN_QUESTION_MARK = '?',
        TOKEN_OPEN_PARENTHESIS = '(',
        TOKEN_CLOSE_PARENTHESIS = ')',
        TOKEN_WHITESPACE = /^(?:(?:\s+$)|(?:\/(?:\/|\*)))/,
        TOKEN_NUMBER = /^[+-]?\d+(([.]\d+)*([eE][+-]?\d+))?$/,
        TOKEN_IDENTIFIER = /^[a-zA-Z_$](\w|$)*$/;
    function Lexer(aString)
    {
        this._index = -1;
        this._tokens = (aString + '\n').match(/\/\/.*(\r|\n)?|\/\*(?:.|\n|\r)*?\*\/|\w+\b|[+-]?\d+(([.]\d+)*([eE][+-]?\d+))?|"[^"\\]*(\\[\s\S][^"\\]*)*"|'[^'\\]*(\\[\s\S][^'\\]*)*'|\s+|./g);
        this._context = [];
        return this;
    }
    Lexer.prototype.push =     function()
    {
        this._context.push(this._index);
    };
    Lexer.prototype.pop =     function()
    {
        this._index = this._context.pop();
    };
    Lexer.prototype.peek =     function(shouldSkipWhitespace)
    {
        if (shouldSkipWhitespace)
        {
            this.push();
            var token = this.skip_whitespace();
            this.pop();
            return token;
        }
        return this._tokens[this._index + 1];
    };
    Lexer.prototype.next =     function()
    {
        return this._tokens[++this._index];
    };
    Lexer.prototype.previous =     function()
    {
        return this._tokens[--this._index];
    };
    Lexer.prototype.last =     function()
    {
        if (this._index < 0)
            return NULL;
        return this._tokens[this._index - 1];
    };
    Lexer.prototype.skip_whitespace =     function(shouldMoveBackwards)
    {
        var token;
        if (shouldMoveBackwards)
            while ((token = this.previous()) && TOKEN_WHITESPACE.test(token));
        else
            while ((token = this.next()) && TOKEN_WHITESPACE.test(token));
        return token;
    };
    exports.Lexer = Lexer;
    function StringBuffer()
    {
        this.atoms = [];
    }
    StringBuffer.prototype.toString =     function()
    {
        return this.atoms.join("");
    };
    exports.preprocess =     function(aString, aURL, flags)
    {
        return new Preprocessor(aString, aURL, flags).executable();
    };
    exports.eval =     function(aString)
    {
        return eval(exports.preprocess(aString).code());
    };
    var Preprocessor =     function(aString, aURL, flags)
    {
        this._URL = new CFURL(aURL);
        aString = aString.replace(/^#[^\n]+\n/, "\n");
        this._currentSelector = "";
        this._currentClass = "";
        this._currentSuperClass = "";
        this._currentSuperMetaClass = "";
        this._buffer = new StringBuffer();
        this._preprocessed = NULL;
        this._dependencies = [];
        this._tokens = new Lexer(aString);
        this._flags = flags;
        this._classMethod = false;
        this._executable = NULL;
        this._classLookupTable = {};
        this._classVars = {};
        var classObject = new objj_class();
        for (var i in classObject)
            this._classVars[i] = 1;
        this.preprocess(this._tokens, this._buffer);
    };
    Preprocessor.prototype.setClassInfo =     function(className, superClassName, ivars)
    {
        this._classLookupTable[className] = {superClassName: superClassName, ivars: ivars};
    };
    Preprocessor.prototype.getClassInfo =     function(className)
    {
        return this._classLookupTable[className];
    };
    Preprocessor.prototype.allIvarNamesForClassName =     function(className)
    {
        var names = {},
            classInfo = this.getClassInfo(className);
        while (classInfo)
        {
            for (var i in classInfo.ivars)
                names[i] = 1;
            classInfo = this.getClassInfo(classInfo.superClassName);
        }
        return names;
    };
    exports.Preprocessor = Preprocessor;
    Preprocessor.Flags = {};
    Preprocessor.Flags.IncludeDebugSymbols = 1 << 0;
    Preprocessor.Flags.IncludeTypeSignatures = 1 << 1;
    Preprocessor.prototype.executable =     function()
    {
        if (!this._executable)
            this._executable = new Executable(this._buffer.toString(), this._dependencies, this._URL);
        return this._executable;
    };
    Preprocessor.prototype.accessors =     function(tokens)
    {
        var token = tokens.skip_whitespace(),
            attributes = {};
        if (token != TOKEN_OPEN_PARENTHESIS)
        {
            tokens.previous();
            return attributes;
        }
        while ((token = tokens.skip_whitespace()) != TOKEN_CLOSE_PARENTHESIS)
        {
            var name = token,
                value = true;
            if (!/^\w+$/.test(name))
                throw new SyntaxError(this.error_message("*** @accessors attribute name not valid."));
            if ((token = tokens.skip_whitespace()) == TOKEN_EQUAL)
            {
                value = tokens.skip_whitespace();
                if (!/^\w+$/.test(value))
                    throw new SyntaxError(this.error_message("*** @accessors attribute value not valid."));
                if (name == "setter")
                {
                    if ((token = tokens.next()) != TOKEN_COLON)
                        throw new SyntaxError(this.error_message("*** @accessors setter attribute requires argument with \":\" at end of selector name."));
                    value += ":";
                }
                token = tokens.skip_whitespace();
            }
            attributes[name] = value;
            if (token == TOKEN_CLOSE_PARENTHESIS)
                break;
            if (token != TOKEN_COMMA)
                throw new SyntaxError(this.error_message("*** Expected ',' or ')' in @accessors attribute list."));
        }
        return attributes;
    };
    Preprocessor.prototype.brackets =     function(tokens, aStringBuffer)
    {
        var tuples = [];
        while (this.preprocess(tokens, NULL, NULL, NULL, tuples[tuples.length] = []));
        if (tuples[0].length === 1)
        {
            aStringBuffer.atoms[aStringBuffer.atoms.length] = '[';
            aStringBuffer.atoms[aStringBuffer.atoms.length] = tuples[0][0];
            aStringBuffer.atoms[aStringBuffer.atoms.length] = ']';
        }
        else
        {
            var selector = new StringBuffer();
            if (tuples[0][0].atoms[0] == TOKEN_SUPER)
            {
                aStringBuffer.atoms[aStringBuffer.atoms.length] = "objj_msgSendSuper(";
                aStringBuffer.atoms[aStringBuffer.atoms.length] = "{ receiver:self, super_class:" + (this._classMethod ? this._currentSuperMetaClass : this._currentSuperClass) + " }";
            }
            else
            {
                aStringBuffer.atoms[aStringBuffer.atoms.length] = "objj_msgSend(";
                aStringBuffer.atoms[aStringBuffer.atoms.length] = tuples[0][0];
            }
            selector.atoms[selector.atoms.length] = tuples[0][1];
            var index = 1,
                count = tuples.length,
                marg_list = new StringBuffer();
            for (; index < count; ++index)
            {
                var pair = tuples[index];
                selector.atoms[selector.atoms.length] = pair[1];
                marg_list.atoms[marg_list.atoms.length] = ", " + pair[0];
            }
            aStringBuffer.atoms[aStringBuffer.atoms.length] = ", \"";
            aStringBuffer.atoms[aStringBuffer.atoms.length] = selector;
            aStringBuffer.atoms[aStringBuffer.atoms.length] = '\"';
            aStringBuffer.atoms[aStringBuffer.atoms.length] = marg_list;
            aStringBuffer.atoms[aStringBuffer.atoms.length] = ')';
        }
    };
    Preprocessor.prototype.directive =     function(tokens, aStringBuffer, allowedDirectivesFlags)
    {
        var buffer = aStringBuffer ? aStringBuffer : new StringBuffer(),
            token = tokens.next();
        if (token.charAt(0) == TOKEN_DOUBLE_QUOTE)
            buffer.atoms[buffer.atoms.length] = token;
        else if (token === TOKEN_CLASS)
        {
            tokens.skip_whitespace();
            return;
        }
        else if (token === TOKEN_IMPLEMENTATION)
            this.implementation(tokens, buffer);
        else if (token === TOKEN_IMPORT)
            this._import(tokens);
        else if (token === TOKEN_SELECTOR)
            this.selector(tokens, buffer);
        if (!aStringBuffer)
            return buffer;
    };
    Preprocessor.prototype.hash =     function(tokens, aStringBuffer)
    {
        var buffer = aStringBuffer ? aStringBuffer : new StringBuffer(),
            token = tokens.next();
        if (token === TOKEN_PRAGMA)
        {
            token = tokens.skip_whitespace();
            if (token === TOKEN_MARK)
            {
                while ((token = tokens.next()).indexOf("\n") < 0);
            }
        }
        else
            throw new SyntaxError(this.error_message("*** Expected \"pragma\" to follow # but instead saw \"" + token + "\"."));
    };
    Preprocessor.prototype.implementation =     function(tokens, aStringBuffer)
    {
        var buffer = aStringBuffer,
            token = "",
            category = NO,
            class_name = tokens.skip_whitespace(),
            superclass_name = "Nil",
            instance_methods = new StringBuffer(),
            class_methods = new StringBuffer();
        if (!/^\w/.test(class_name))
            throw new Error(this.error_message("*** Expected class name, found \"" + class_name + "\"."));
        this._currentSuperClass = "objj_getClass(\"" + class_name + "\").super_class";
        this._currentSuperMetaClass = "objj_getMetaClass(\"" + class_name + "\").super_class";
        this._currentClass = class_name;
        this._currentSelector = "";
        if ((token = tokens.skip_whitespace()) == TOKEN_OPEN_PARENTHESIS)
        {
            token = tokens.skip_whitespace();
            if (token == TOKEN_CLOSE_PARENTHESIS)
                throw new SyntaxError(this.error_message("*** Can't Have Empty Category Name for class \"" + class_name + "\"."));
            if (tokens.skip_whitespace() != TOKEN_CLOSE_PARENTHESIS)
                throw new SyntaxError(this.error_message("*** Improper Category Definition for class \"" + class_name + "\"."));
            buffer.atoms[buffer.atoms.length] = "{\nvar the_class = objj_getClass(\"" + class_name + "\")\n";
            buffer.atoms[buffer.atoms.length] = "if(!the_class) throw new SyntaxError(\"*** Could not find definition for class \\\"" + class_name + "\\\"\");\n";
            buffer.atoms[buffer.atoms.length] = "var meta_class = the_class.isa;";
        }
        else
        {
            if (token == TOKEN_COLON)
            {
                token = tokens.skip_whitespace();
                if (!TOKEN_IDENTIFIER.test(token))
                    throw new SyntaxError(this.error_message("*** Expected class name, found \"" + token + "\"."));
                superclass_name = token;
                token = tokens.skip_whitespace();
            }
            buffer.atoms[buffer.atoms.length] = "{var the_class = objj_allocateClassPair(" + superclass_name + ", \"" + class_name + "\"),\nmeta_class = the_class.isa;";
            if (token == TOKEN_OPEN_BRACE)
            {
                var ivar_names = {},
                    ivar_count = 0,
                    declaration = [],
                    attributes,
                    accessors = {},
                    types = [];
                while ((token = tokens.skip_whitespace()) && token != TOKEN_CLOSE_BRACE)
                {
                    if (token === TOKEN_PREPROCESSOR)
                    {
                        token = tokens.next();
                        if (token === TOKEN_ACCESSORS)
                            attributes = this.accessors(tokens);
                        else if (token !== TOKEN_OUTLET)
                            throw new SyntaxError(this.error_message("*** Unexpected '@' token in ivar declaration ('@" + token + "')."));
                        else
                            types.push("@" + token);
                    }
                    else if (token == TOKEN_SEMICOLON)
                    {
                        if (ivar_count++ === 0)
                            buffer.atoms[buffer.atoms.length] = "class_addIvars(the_class, [";
                        else
                            buffer.atoms[buffer.atoms.length] = ", ";
                        var name = declaration[declaration.length - 1];
                        if (this._flags & Preprocessor.Flags.IncludeTypeSignatures)
                            buffer.atoms[buffer.atoms.length] = "new objj_ivar(\"" + name + "\", \"" + types.slice(0, types.length - 1).join(" ") + "\")";
                        else
                            buffer.atoms[buffer.atoms.length] = "new objj_ivar(\"" + name + "\")";
                        ivar_names[name] = 1;
                        declaration = [];
                        types = [];
                        if (attributes)
                        {
                            accessors[name] = attributes;
                            attributes = NULL;
                        }
                    }
                    else
                    {
                        declaration.push(token);
                        types.push(token);
                    }
                }
                if (declaration.length)
                    throw new SyntaxError(this.error_message("*** Expected ';' in ivar declaration, found '}'."));
                if (ivar_count)
                    buffer.atoms[buffer.atoms.length] = "]);\n";
                if (!token)
                    throw new SyntaxError(this.error_message("*** Expected '}'"));
                this.setClassInfo(class_name, superclass_name === "Nil" ? null : superclass_name, ivar_names);
                var ivar_names = this.allIvarNamesForClassName(class_name);
                for (ivar_name in accessors)
                {
                    var accessor = accessors[ivar_name],
                        property = accessor["property"] || ivar_name;
                    var getterName = accessor["getter"] || property,
                        getterCode = "(id)" + getterName + "\n{\nreturn " + ivar_name + ";\n}";
                    if (instance_methods.atoms.length !== 0)
                        instance_methods.atoms[instance_methods.atoms.length] = ",\n";
                    instance_methods.atoms[instance_methods.atoms.length] = this.method(new Lexer(getterCode), ivar_names);
                    if (accessor["readonly"])
                        continue;
                    var setterName = accessor["setter"];
                    if (!setterName)
                    {
                        var start = property.charAt(0) == '_' ? 1 : 0;
                        setterName = (start ? "_" : "") + "set" + property.substr(start, 1).toUpperCase() + property.substring(start + 1) + ":";
                    }
                    var setterCode = "(void)" + setterName + "(id)newValue\n{\n";
                    if (accessor["copy"])
                        setterCode += "if (" + ivar_name + " !== newValue)\n" + ivar_name + " = [newValue copy];\n}";
                    else
                        setterCode += ivar_name + " = newValue;\n}";
                    if (instance_methods.atoms.length !== 0)
                        instance_methods.atoms[instance_methods.atoms.length] = ",\n";
                    instance_methods.atoms[instance_methods.atoms.length] = this.method(new Lexer(setterCode), ivar_names);
                }
            }
            else
                tokens.previous();
            buffer.atoms[buffer.atoms.length] = "objj_registerClassPair(the_class);\n";
        }
        if (!ivar_names)
            var ivar_names = this.allIvarNamesForClassName(class_name);
        while (token = tokens.skip_whitespace())
        {
            if (token == TOKEN_PLUS)
            {
                this._classMethod = true;
                if (class_methods.atoms.length !== 0)
                    class_methods.atoms[class_methods.atoms.length] = ", ";
                class_methods.atoms[class_methods.atoms.length] = this.method(tokens, this._classVars);
            }
            else if (token == TOKEN_MINUS)
            {
                this._classMethod = false;
                if (instance_methods.atoms.length !== 0)
                    instance_methods.atoms[instance_methods.atoms.length] = ", ";
                instance_methods.atoms[instance_methods.atoms.length] = this.method(tokens, ivar_names);
            }
            else if (token == TOKEN_HASH)
            {
                this.hash(tokens, buffer);
            }
            else if (token == TOKEN_PREPROCESSOR)
            {
                if ((token = tokens.next()) == TOKEN_END)
                    break;
                else
                    throw new SyntaxError(this.error_message("*** Expected \"@end\", found \"@" + token + "\"."));
            }
        }
        if (instance_methods.atoms.length !== 0)
        {
            buffer.atoms[buffer.atoms.length] = "class_addMethods(the_class, [";
            buffer.atoms[buffer.atoms.length] = instance_methods;
            buffer.atoms[buffer.atoms.length] = "]);\n";
        }
        if (class_methods.atoms.length !== 0)
        {
            buffer.atoms[buffer.atoms.length] = "class_addMethods(meta_class, [";
            buffer.atoms[buffer.atoms.length] = class_methods;
            buffer.atoms[buffer.atoms.length] = "]);\n";
        }
        buffer.atoms[buffer.atoms.length] = '}';
        this._currentClass = "";
    };
    Preprocessor.prototype._import =     function(tokens)
    {
        var URLString = "",
            token = tokens.skip_whitespace(),
            isQuoted = token !== TOKEN_LESS_THAN;
        if (token === TOKEN_LESS_THAN)
        {
            while ((token = tokens.next()) && token !== TOKEN_GREATER_THAN)
                URLString += token;
            if (!token)
                throw new SyntaxError(this.error_message("*** Unterminated import statement."));
        }
        else if (token.charAt(0) === TOKEN_DOUBLE_QUOTE)
            URLString = token.substr(1, token.length - 2);
        else
            throw new SyntaxError(this.error_message("*** Expecting '<' or '\"', found \"" + token + "\"."));
        this._buffer.atoms[this._buffer.atoms.length] = "objj_executeFile(\"";
        this._buffer.atoms[this._buffer.atoms.length] = URLString;
        this._buffer.atoms[this._buffer.atoms.length] = isQuoted ? "\", YES);" : "\", NO);";
        this._dependencies.push(new FileDependency(new CFURL(URLString), isQuoted));
    };
    Preprocessor.prototype.method =     function(tokens, ivar_names)
    {
        var buffer = new StringBuffer(),
            token,
            selector = "",
            parameters = [],
            types = [null];
        ivar_names = ivar_names || {};
        while ((token = tokens.skip_whitespace()) && token !== TOKEN_OPEN_BRACE && token !== TOKEN_SEMICOLON)
        {
            if (token == TOKEN_COLON)
            {
                var type = "";
                selector += token;
                token = tokens.skip_whitespace();
                if (token == TOKEN_OPEN_PARENTHESIS)
                {
                    while ((token = tokens.skip_whitespace()) && token != TOKEN_CLOSE_PARENTHESIS)
                        type += token;
                    token = tokens.skip_whitespace();
                }
                types[parameters.length + 1] = type || null;
                parameters[parameters.length] = token;
                if (token in ivar_names)
                    CPLog.warn(this.error_message("*** Warning: Method ( " + selector + " ) uses a parameter name that is already in use ( " + token + " )"));
            }
            else if (token == TOKEN_OPEN_PARENTHESIS)
            {
                var type = "";
                while ((token = tokens.skip_whitespace()) && token != TOKEN_CLOSE_PARENTHESIS)
                    type += token;
                types[0] = type || null;
            }
            else if (token == TOKEN_COMMA)
            {
                if ((token = tokens.skip_whitespace()) != TOKEN_PERIOD || tokens.next() != TOKEN_PERIOD || tokens.next() != TOKEN_PERIOD)
                    throw new SyntaxError(this.error_message("*** Argument list expected after ','."));
            }
            else
                selector += token;
        }
        if (token === TOKEN_SEMICOLON)
        {
            token = tokens.skip_whitespace();
            if (token !== TOKEN_OPEN_BRACE)
            {
                throw new SyntaxError(this.error_message("Invalid semi-colon in method declaration. " + "Semi-colons are allowed only to terminate the method signature, before the open brace."));
            }
        }
        var index = 0,
            count = parameters.length;
        buffer.atoms[buffer.atoms.length] = "new objj_method(sel_getUid(\"";
        buffer.atoms[buffer.atoms.length] = selector;
        buffer.atoms[buffer.atoms.length] = "\"), function";
        this._currentSelector = selector;
        if (this._flags & Preprocessor.Flags.IncludeDebugSymbols)
            buffer.atoms[buffer.atoms.length] = " $" + this._currentClass + "__" + selector.replace(/:/g, "_");
        buffer.atoms[buffer.atoms.length] = "(self, _cmd";
        for (; index < count; ++index)
        {
            buffer.atoms[buffer.atoms.length] = ", ";
            buffer.atoms[buffer.atoms.length] = parameters[index];
        }
        buffer.atoms[buffer.atoms.length] = ")\n{ with(self)\n{";
        buffer.atoms[buffer.atoms.length] = this.preprocess(tokens, NULL, TOKEN_CLOSE_BRACE, TOKEN_OPEN_BRACE);
        buffer.atoms[buffer.atoms.length] = "}\n}";
        if (this._flags & Preprocessor.Flags.IncludeDebugSymbols)
            buffer.atoms[buffer.atoms.length] = "," + JSON.stringify(types);
        buffer.atoms[buffer.atoms.length] = ")";
        this._currentSelector = "";
        return buffer;
    };
    Preprocessor.prototype.preprocess =     function(tokens, aStringBuffer, terminator, instigator, tuple)
    {
        var buffer = aStringBuffer ? aStringBuffer : new StringBuffer(),
            count = 0,
            token = "";
        if (tuple)
        {
            tuple[0] = buffer;
            var bracket = false,
                closures = [0, 0, 0];
        }
        while ((token = tokens.next()) && (token !== terminator || count))
        {
            if (tuple)
            {
                if (token === TOKEN_QUESTION_MARK)
                    ++closures[2];
                else if (token === TOKEN_OPEN_BRACE)
                    ++closures[0];
                else if (token === TOKEN_CLOSE_BRACE)
                    --closures[0];
                else if (token === TOKEN_OPEN_PARENTHESIS)
                    ++closures[1];
                else if (token === TOKEN_CLOSE_PARENTHESIS)
                    --closures[1];
                else if ((token === TOKEN_COLON && closures[2]-- === 0 || (bracket = token === TOKEN_CLOSE_BRACKET)) && closures[0] === 0 && closures[1] === 0)
                {
                    tokens.push();
                    var label = bracket ? tokens.skip_whitespace(true) : tokens.previous(),
                        isEmptyLabel = TOKEN_WHITESPACE.test(label);
                    if (isEmptyLabel || TOKEN_IDENTIFIER.test(label) && TOKEN_WHITESPACE.test(tokens.previous()))
                    {
                        tokens.push();
                        var last = tokens.skip_whitespace(true),
                            operatorCheck = true,
                            isDoubleOperator = false;
                        if (last === '+' || last === '-')
                        {
                            if (tokens.previous() !== last)
                                operatorCheck = false;
                            else
                            {
                                last = tokens.skip_whitespace(true);
                                isDoubleOperator = true;
                            }
                        }
                        tokens.pop();
                        tokens.pop();
                        if (operatorCheck && (!isDoubleOperator && last === TOKEN_CLOSE_BRACE || last === TOKEN_CLOSE_PARENTHESIS || last === TOKEN_CLOSE_BRACKET || last === TOKEN_PERIOD || TOKEN_NUMBER.test(last) || last.charAt(last.length - 1) === '\"' || last.charAt(last.length - 1) === '\'' || TOKEN_IDENTIFIER.test(last) && !/^(new|return|case|var)$/.test(last)))
                        {
                            if (isEmptyLabel)
                                tuple[1] = ':';
                            else
                            {
                                tuple[1] = label;
                                if (!bracket)
                                    tuple[1] += ':';
                                var count = buffer.atoms.length;
                                while (buffer.atoms[count--] !== label);
                                buffer.atoms.length = count;
                            }
                            return !bracket;
                        }
                        if (bracket)
                            return NO;
                    }
                    tokens.pop();
                    if (bracket)
                        return NO;
                }
                closures[2] = MAX(closures[2], 0);
            }
            if (instigator)
            {
                if (token === instigator)
                    ++count;
                else if (token === terminator)
                    --count;
            }
            if (token === TOKEN_FUNCTION)
            {
                var accumulator = "";
                while ((token = tokens.next()) && token !== TOKEN_OPEN_PARENTHESIS && !/^\w/.test(token))
                    accumulator += token;
                if (token === TOKEN_OPEN_PARENTHESIS)
                {
                    if (instigator === TOKEN_OPEN_PARENTHESIS)
                        ++count;
                    buffer.atoms[buffer.atoms.length] = "function" + accumulator + '(';
                    if (tuple)
                        ++closures[1];
                }
                else
                {
                    buffer.atoms[buffer.atoms.length] = token + " = function";
                }
            }
            else if (token == TOKEN_PREPROCESSOR)
                this.directive(tokens, buffer);
            else if (token == TOKEN_HASH)
                this.hash(tokens, buffer);
            else if (token == TOKEN_OPEN_BRACKET)
                this.brackets(tokens, buffer);
            else
                buffer.atoms[buffer.atoms.length] = token;
        }
        if (tuple)
            throw new SyntaxError(this.error_message("*** Expected ']' - Unterminated message send or array."));
        if (!aStringBuffer)
            return buffer;
    };
    Preprocessor.prototype.selector =     function(tokens, aStringBuffer)
    {
        var buffer = aStringBuffer ? aStringBuffer : new StringBuffer();
        buffer.atoms[buffer.atoms.length] = "sel_getUid(\"";
        if (tokens.skip_whitespace() != TOKEN_OPEN_PARENTHESIS)
            throw new SyntaxError(this.error_message("*** Expected '('"));
        var selector = tokens.skip_whitespace();
        if (selector == TOKEN_CLOSE_PARENTHESIS)
            throw new SyntaxError(this.error_message("*** Unexpected ')', can't have empty @selector()"));
        aStringBuffer.atoms[aStringBuffer.atoms.length] = selector;
        var token,
            starting = true;
        while ((token = tokens.next()) && token != TOKEN_CLOSE_PARENTHESIS)
        {
            if (starting && /^\d+$/.test(token) || !/^(\w|$|\:)/.test(token))
            {
                if (!/\S/.test(token))
                    if (tokens.skip_whitespace() == TOKEN_CLOSE_PARENTHESIS)
                        break;
                    else
                        throw new SyntaxError(this.error_message("*** Unexpected whitespace in @selector()."));
                else
                    throw new SyntaxError(this.error_message("*** Illegal character '" + token + "' in @selector()."));
            }
            buffer.atoms[buffer.atoms.length] = token;
            starting = token == TOKEN_COLON;
        }
        buffer.atoms[buffer.atoms.length] = "\")";
        if (!aStringBuffer)
            return buffer;
    };
    Preprocessor.prototype.error_message =     function(errorMessage)
    {
        return errorMessage + " <Context File: " + this._URL + (this._currentClass ? " Class: " + this._currentClass : "") + (this._currentSelector ? " Method: " + this._currentSelector : "") + ">";
    };
    (    function webpackUniversalModuleDefinition(root, factory)
    {
        function DescriptionOfObject(anObject, maximumRecursionDepth)
        {
            if (anObject === nil)
                return "nil";
            if (anObject === undefined)
                return "undefined";
            if (anObject === window)
                return "window";
            if (maximumRecursionDepth === 0)
                return "...";
            if (typeof anObject !== "object")
                return String(anObject);
            var properties = [],
                desc;
            for (var property in anObject)
                if (anObject.hasOwnProperty(property))
                    properties.push(property);
            properties.sort();
            desc = "{";
            for (var i = 0; i < properties.length; ++i)
            {
                if (i === 0)
                    desc += "\n";
                var value = anObject[properties[i]],
                    valueDescription = DescriptionOfObject(value, maximumRecursionDepth !== undefined ? maximumRecursionDepth - 1 : maximumRecursionDepth).split("\n").join("\n    ");
                desc += "    " + properties[i] + ": " + valueDescription;
                if (i < properties.length - 1)
                    desc += ",\n";
                else
                    desc += "\n";
            }
            desc += "}";
            return desc;
        }
        if (typeof exports === 'object' && typeof module === 'object')
        {
            module.exports = factory();
        }
        else if (typeof define === 'function' && define.amd)
        {
            define([], factory);
        }
        else if (typeof exports === 'object')
        {
            exports["sourceMap"] = factory();
        }
        else
        {
            root["sourceMap"] = factory();
        }
    })(this,     function()
    {
        return (        function(modules)
        {
            var installedModules = {};
            function __webpack_require__(moduleId)
            {
                if (installedModules[moduleId])
                    return installedModules[moduleId].exports;
                var module = installedModules[moduleId] = {exports: {}, id: moduleId, loaded: false};
                modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
                module.loaded = true;
                return module.exports;
            }
            __webpack_require__.m = modules;
            __webpack_require__.c = installedModules;
            __webpack_require__.p = "";
            return __webpack_require__(0);
        })([        function(module, exports, __webpack_require__)
        {
            exports.SourceMapGenerator = __webpack_require__(1).SourceMapGenerator;
            exports.SourceMapConsumer = __webpack_require__(7).SourceMapConsumer;
            exports.SourceNode = __webpack_require__(10).SourceNode;
        },         function(module, exports, __webpack_require__)
        {
            var base64VLQ = __webpack_require__(2);
            var util = __webpack_require__(4);
            var ArraySet = __webpack_require__(5).ArraySet;
            var MappingList = __webpack_require__(6).MappingList;
            function SourceMapGenerator(aArgs)
            {
                if (!aArgs)
                {
                    aArgs = {};
                }
                this._file = util.getArg(aArgs, 'file', null);
                this._sourceRoot = util.getArg(aArgs, 'sourceRoot', null);
                this._skipValidation = util.getArg(aArgs, 'skipValidation', false);
                this._sources = new ArraySet();
                this._names = new ArraySet();
                this._mappings = new MappingList();
                this._sourcesContents = null;
            }
            SourceMapGenerator.prototype._version = 3;
            SourceMapGenerator.fromSourceMap =             function SourceMapGenerator_fromSourceMap(aSourceMapConsumer)
            {
                var sourceRoot = aSourceMapConsumer.sourceRoot;
                var generator = new SourceMapGenerator({file: aSourceMapConsumer.file, sourceRoot: sourceRoot});
                aSourceMapConsumer.eachMapping(                function(mapping)
                {
                    var newMapping = {generated: {line: mapping.generatedLine, column: mapping.generatedColumn}};
                    if (mapping.source != null)
                    {
                        newMapping.source = mapping.source;
                        if (sourceRoot != null)
                        {
                            newMapping.source = util.relative(sourceRoot, newMapping.source);
                        }
                        newMapping.original = {line: mapping.originalLine, column: mapping.originalColumn};
                        if (mapping.name != null)
                        {
                            newMapping.name = mapping.name;
                        }
                    }
                    generator.addMapping(newMapping);
                });
                aSourceMapConsumer.sources.forEach(                function(sourceFile)
                {
                    var content = aSourceMapConsumer.sourceContentFor(sourceFile);
                    if (content != null)
                    {
                        generator.setSourceContent(sourceFile, content);
                    }
                });
                return generator;
            };
            SourceMapGenerator.prototype.addMapping =             function SourceMapGenerator_addMapping(aArgs)
            {
                var generated = util.getArg(aArgs, 'generated');
                var original = util.getArg(aArgs, 'original', null);
                var source = util.getArg(aArgs, 'source', null);
                var name = util.getArg(aArgs, 'name', null);
                if (!this._skipValidation)
                {
                    this._validateMapping(generated, original, source, name);
                }
                if (source != null)
                {
                    source = String(source);
                    if (!this._sources.has(source))
                    {
                        this._sources.add(source);
                    }
                }
                if (name != null)
                {
                    name = String(name);
                    if (!this._names.has(name))
                    {
                        this._names.add(name);
                    }
                }
                this._mappings.add({generatedLine: generated.line, generatedColumn: generated.column, originalLine: original != null && original.line, originalColumn: original != null && original.column, source: source, name: name});
            };
            SourceMapGenerator.prototype.setSourceContent =             function SourceMapGenerator_setSourceContent(aSourceFile, aSourceContent)
            {
                var source = aSourceFile;
                if (this._sourceRoot != null)
                {
                    source = util.relative(this._sourceRoot, source);
                }
                if (aSourceContent != null)
                {
                    if (!this._sourcesContents)
                    {
                        this._sourcesContents = Object.create(null);
                    }
                    this._sourcesContents[util.toSetString(source)] = aSourceContent;
                }
                else if (this._sourcesContents)
                {
                    delete this._sourcesContents[util.toSetString(source)];
                    if (Object.keys(this._sourcesContents).length === 0)
                    {
                        this._sourcesContents = null;
                    }
                }
            };
            SourceMapGenerator.prototype.applySourceMap =             function SourceMapGenerator_applySourceMap(aSourceMapConsumer, aSourceFile, aSourceMapPath)
            {
                var sourceFile = aSourceFile;
                if (aSourceFile == null)
                {
                    if (aSourceMapConsumer.file == null)
                    {
                        throw new Error('SourceMapGenerator.prototype.applySourceMap requires either an explicit source file, ' + 'or the source map\'s "file" property. Both were omitted.');
                    }
                    sourceFile = aSourceMapConsumer.file;
                }
                var sourceRoot = this._sourceRoot;
                if (sourceRoot != null)
                {
                    sourceFile = util.relative(sourceRoot, sourceFile);
                }
                var newSources = new ArraySet();
                var newNames = new ArraySet();
                this._mappings.unsortedForEach(                function(mapping)
                {
                    if (mapping.source === sourceFile && mapping.originalLine != null)
                    {
                        var original = aSourceMapConsumer.originalPositionFor({line: mapping.originalLine, column: mapping.originalColumn});
                        if (original.source != null)
                        {
                            mapping.source = original.source;
                            if (aSourceMapPath != null)
                            {
                                mapping.source = util.join(aSourceMapPath, mapping.source);
                            }
                            if (sourceRoot != null)
                            {
                                mapping.source = util.relative(sourceRoot, mapping.source);
                            }
                            mapping.originalLine = original.line;
                            mapping.originalColumn = original.column;
                            if (original.name != null)
                            {
                                mapping.name = original.name;
                            }
                        }
                    }
                    var source = mapping.source;
                    if (source != null && !newSources.has(source))
                    {
                        newSources.add(source);
                    }
                    var name = mapping.name;
                    if (name != null && !newNames.has(name))
                    {
                        newNames.add(name);
                    }
                }, this);
                this._sources = newSources;
                this._names = newNames;
                aSourceMapConsumer.sources.forEach(                function(sourceFile)
                {
                    var content = aSourceMapConsumer.sourceContentFor(sourceFile);
                    if (content != null)
                    {
                        if (aSourceMapPath != null)
                        {
                            sourceFile = util.join(aSourceMapPath, sourceFile);
                        }
                        if (sourceRoot != null)
                        {
                            sourceFile = util.relative(sourceRoot, sourceFile);
                        }
                        this.setSourceContent(sourceFile, content);
                    }
                }, this);
            };
            SourceMapGenerator.prototype._validateMapping =             function SourceMapGenerator_validateMapping(aGenerated, aOriginal, aSource, aName)
            {
                if (aGenerated && 'line' in aGenerated && 'column' in aGenerated && aGenerated.line > 0 && aGenerated.column >= 0 && !aOriginal && !aSource && !aName)
                {
                    return;
                }
                else if (aGenerated && 'line' in aGenerated && 'column' in aGenerated && aOriginal && 'line' in aOriginal && 'column' in aOriginal && aGenerated.line > 0 && aGenerated.column >= 0 && aOriginal.line > 0 && aOriginal.column >= 0 && aSource)
                {
                    return;
                }
                else
                {
                    throw new Error('Invalid mapping: ' + JSON.stringify({generated: aGenerated, source: aSource, original: aOriginal, name: aName}));
                }
            };
            SourceMapGenerator.prototype._serializeMappings =             function SourceMapGenerator_serializeMappings()
            {
                var previousGeneratedColumn = 0;
                var previousGeneratedLine = 1;
                var previousOriginalColumn = 0;
                var previousOriginalLine = 0;
                var previousName = 0;
                var previousSource = 0;
                var result = '';
                var next;
                var mapping;
                var nameIdx;
                var sourceIdx;
                var mappings = this._mappings.toArray();
                for (var i = 0, len = mappings.length; i < len; i++)
                {
                    mapping = mappings[i];
                    next = '';
                    if (mapping.generatedLine !== previousGeneratedLine)
                    {
                        previousGeneratedColumn = 0;
                        while (mapping.generatedLine !== previousGeneratedLine)
                        {
                            next += ';';
                            previousGeneratedLine++;
                        }
                    }
                    else
                    {
                        if (i > 0)
                        {
                            if (!util.compareByGeneratedPositionsInflated(mapping, mappings[i - 1]))
                            {
                                continue;
                            }
                            next += ',';
                        }
                    }
                    next += base64VLQ.encode(mapping.generatedColumn - previousGeneratedColumn);
                    previousGeneratedColumn = mapping.generatedColumn;
                    if (mapping.source != null)
                    {
                        sourceIdx = this._sources.indexOf(mapping.source);
                        next += base64VLQ.encode(sourceIdx - previousSource);
                        previousSource = sourceIdx;
                        next += base64VLQ.encode(mapping.originalLine - 1 - previousOriginalLine);
                        previousOriginalLine = mapping.originalLine - 1;
                        next += base64VLQ.encode(mapping.originalColumn - previousOriginalColumn);
                        previousOriginalColumn = mapping.originalColumn;
                        if (mapping.name != null)
                        {
                            nameIdx = this._names.indexOf(mapping.name);
                            next += base64VLQ.encode(nameIdx - previousName);
                            previousName = nameIdx;
                        }
                    }
                    result += next;
                }
                return result;
            };
            SourceMapGenerator.prototype._generateSourcesContent =             function SourceMapGenerator_generateSourcesContent(aSources, aSourceRoot)
            {
                return aSources.map(                function(source)
                {
                    if (!this._sourcesContents)
                    {
                        return null;
                    }
                    if (aSourceRoot != null)
                    {
                        source = util.relative(aSourceRoot, source);
                    }
                    var key = util.toSetString(source);
                    return Object.prototype.hasOwnProperty.call(this._sourcesContents, key) ? this._sourcesContents[key] : null;
                }, this);
            };
            SourceMapGenerator.prototype.toJSON =             function SourceMapGenerator_toJSON()
            {
                var map = {version: this._version, sources: this._sources.toArray(), names: this._names.toArray(), mappings: this._serializeMappings()};
                if (this._file != null)
                {
                    map.file = this._file;
                }
                if (this._sourceRoot != null)
                {
                    map.sourceRoot = this._sourceRoot;
                }
                if (this._sourcesContents)
                {
                    map.sourcesContent = this._generateSourcesContent(map.sources, map.sourceRoot);
                }
                return map;
            };
            SourceMapGenerator.prototype.toString =             function SourceMapGenerator_toString()
            {
                return JSON.stringify(this.toJSON());
            };
            exports.SourceMapGenerator = SourceMapGenerator;
        },         function(module, exports, __webpack_require__)
        {
            var base64 = __webpack_require__(3);
            var VLQ_BASE_SHIFT = 5;
            var VLQ_BASE = 1 << VLQ_BASE_SHIFT;
            var VLQ_BASE_MASK = VLQ_BASE - 1;
            var VLQ_CONTINUATION_BIT = VLQ_BASE;
            function toVLQSigned(aValue)
            {
                return aValue < 0 ? (-aValue << 1) + 1 : (aValue << 1) + 0;
            }
            function fromVLQSigned(aValue)
            {
                var isNegative = (aValue & 1) === 1;
                var shifted = aValue >> 1;
                return isNegative ? -shifted : shifted;
            }
            exports.encode =             function base64VLQ_encode(aValue)
            {
                var encoded = "";
                var digit;
                var vlq = toVLQSigned(aValue);
                do
                {
                    digit = vlq & VLQ_BASE_MASK;
                    vlq >>>= VLQ_BASE_SHIFT;
                    if (vlq > 0)
                    {
                        digit |= VLQ_CONTINUATION_BIT;
                    }
                    encoded += base64.encode(digit);
                }
                while (vlq > 0);
                return encoded;
            };
            exports.decode =             function base64VLQ_decode(aStr, aIndex, aOutParam)
            {
                var strLen = aStr.length;
                var result = 0;
                var shift = 0;
                var continuation,
                    digit;
                do
                {
                    if (aIndex >= strLen)
                    {
                        throw new Error("Expected more digits in base 64 VLQ value.");
                    }
                    digit = base64.decode(aStr.charCodeAt(aIndex++));
                    if (digit === -1)
                    {
                        throw new Error("Invalid base64 digit: " + aStr.charAt(aIndex - 1));
                    }
                    continuation = !!(digit & VLQ_CONTINUATION_BIT);
                    digit &= VLQ_BASE_MASK;
                    result = result + (digit << shift);
                    shift += VLQ_BASE_SHIFT;
                }
                while (continuation);
                aOutParam.value = fromVLQSigned(result);
                aOutParam.rest = aIndex;
            };
        },         function(module, exports)
        {
            var intToCharMap = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/'.split('');
            exports.encode =             function(number)
            {
                if (0 <= number && number < intToCharMap.length)
                {
                    return intToCharMap[number];
                }
                throw new TypeError("Must be between 0 and 63: " + number);
            };
            exports.decode =             function(charCode)
            {
                var bigA = 65;
                var bigZ = 90;
                var littleA = 97;
                var littleZ = 122;
                var zero = 48;
                var nine = 57;
                var plus = 43;
                var slash = 47;
                var littleOffset = 26;
                var numberOffset = 52;
                if (bigA <= charCode && charCode <= bigZ)
                {
                    return charCode - bigA;
                }
                if (littleA <= charCode && charCode <= littleZ)
                {
                    return charCode - littleA + littleOffset;
                }
                if (zero <= charCode && charCode <= nine)
                {
                    return charCode - zero + numberOffset;
                }
                if (charCode == plus)
                {
                    return 62;
                }
                if (charCode == slash)
                {
                    return 63;
                }
                return -1;
            };
        },         function(module, exports)
        {
            function getArg(aArgs, aName, aDefaultValue)
            {
                if (aName in aArgs)
                {
                    return aArgs[aName];
                }
                else if (arguments.length === 3)
                {
                    return aDefaultValue;
                }
                else
                {
                    throw new Error('"' + aName + '" is a required argument.');
                }
            }
            exports.getArg = getArg;
            var urlRegexp = /^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/;
            var dataUrlRegexp = /^data:.+\,.+$/;
            function urlParse(aUrl)
            {
                var match = aUrl.match(urlRegexp);
                if (!match)
                {
                    return null;
                }
                return {scheme: match[1], auth: match[2], host: match[3], port: match[4], path: match[5]};
            }
            exports.urlParse = urlParse;
            function urlGenerate(aParsedUrl)
            {
                var url = '';
                if (aParsedUrl.scheme)
                {
                    url += aParsedUrl.scheme + ':';
                }
                url += '//';
                if (aParsedUrl.auth)
                {
                    url += aParsedUrl.auth + '@';
                }
                if (aParsedUrl.host)
                {
                    url += aParsedUrl.host;
                }
                if (aParsedUrl.port)
                {
                    url += ":" + aParsedUrl.port;
                }
                if (aParsedUrl.path)
                {
                    url += aParsedUrl.path;
                }
                return url;
            }
            exports.urlGenerate = urlGenerate;
            function normalize(aPath)
            {
                var path = aPath;
                var url = urlParse(aPath);
                if (url)
                {
                    if (!url.path)
                    {
                        return aPath;
                    }
                    path = url.path;
                }
                var isAbsolute = exports.isAbsolute(path);
                var parts = path.split(/\/+/);
                for (var part, up = 0, i = parts.length - 1; i >= 0; i--)
                {
                    part = parts[i];
                    if (part === '.')
                    {
                        parts.splice(i, 1);
                    }
                    else if (part === '..')
                    {
                        up++;
                    }
                    else if (up > 0)
                    {
                        if (part === '')
                        {
                            parts.splice(i + 1, up);
                            up = 0;
                        }
                        else
                        {
                            parts.splice(i, 2);
                            up--;
                        }
                    }
                }
                path = parts.join('/');
                if (path === '')
                {
                    path = isAbsolute ? '/' : '.';
                }
                if (url)
                {
                    url.path = path;
                    return urlGenerate(url);
                }
                return path;
            }
            exports.normalize = normalize;
            function join(aRoot, aPath)
            {
                if (aRoot === "")
                {
                    aRoot = ".";
                }
                if (aPath === "")
                {
                    aPath = ".";
                }
                var aPathUrl = urlParse(aPath);
                var aRootUrl = urlParse(aRoot);
                if (aRootUrl)
                {
                    aRoot = aRootUrl.path || '/';
                }
                if (aPathUrl && !aPathUrl.scheme)
                {
                    if (aRootUrl)
                    {
                        aPathUrl.scheme = aRootUrl.scheme;
                    }
                    return urlGenerate(aPathUrl);
                }
                if (aPathUrl || aPath.match(dataUrlRegexp))
                {
                    return aPath;
                }
                if (aRootUrl && !aRootUrl.host && !aRootUrl.path)
                {
                    aRootUrl.host = aPath;
                    return urlGenerate(aRootUrl);
                }
                var joined = aPath.charAt(0) === '/' ? aPath : normalize(aRoot.replace(/\/+$/, '') + '/' + aPath);
                if (aRootUrl)
                {
                    aRootUrl.path = joined;
                    return urlGenerate(aRootUrl);
                }
                return joined;
            }
            exports.join = join;
            exports.isAbsolute =             function(aPath)
            {
                return aPath.charAt(0) === '/' || !!aPath.match(urlRegexp);
            };
            function relative(aRoot, aPath)
            {
                if (aRoot === "")
                {
                    aRoot = ".";
                }
                aRoot = aRoot.replace(/\/$/, '');
                var level = 0;
                while (aPath.indexOf(aRoot + '/') !== 0)
                {
                    var index = aRoot.lastIndexOf("/");
                    if (index < 0)
                    {
                        return aPath;
                    }
                    aRoot = aRoot.slice(0, index);
                    if (aRoot.match(/^([^\/]+:\/)?\/*$/))
                    {
                        return aPath;
                    }
                    ++level;
                }
                return Array(level + 1).join("../") + aPath.substr(aRoot.length + 1);
            }
            exports.relative = relative;
            var supportsNullProto = (            function()
            {
                var obj = Object.create(null);
                return !('__proto__' in obj);
            })();
            function identity(s)
            {
                return s;
            }
            function toSetString(aStr)
            {
                if (isProtoString(aStr))
                {
                    return '$' + aStr;
                }
                return aStr;
            }
            exports.toSetString = supportsNullProto ? identity : toSetString;
            function fromSetString(aStr)
            {
                if (isProtoString(aStr))
                {
                    return aStr.slice(1);
                }
                return aStr;
            }
            exports.fromSetString = supportsNullProto ? identity : fromSetString;
            function isProtoString(s)
            {
                if (!s)
                {
                    return false;
                }
                var length = s.length;
                if (length < 9)
                {
                    return false;
                }
                if (s.charCodeAt(length - 1) !== 95 || s.charCodeAt(length - 2) !== 95 || s.charCodeAt(length - 3) !== 111 || s.charCodeAt(length - 4) !== 116 || s.charCodeAt(length - 5) !== 111 || s.charCodeAt(length - 6) !== 114 || s.charCodeAt(length - 7) !== 112 || s.charCodeAt(length - 8) !== 95 || s.charCodeAt(length - 9) !== 95)
                {
                    return false;
                }
                for (var i = length - 10; i >= 0; i--)
                {
                    if (s.charCodeAt(i) !== 36)
                    {
                        return false;
                    }
                }
                return true;
            }
            function compareByOriginalPositions(mappingA, mappingB, onlyCompareOriginal)
            {
                var cmp = mappingA.source - mappingB.source;
                if (cmp !== 0)
                {
                    return cmp;
                }
                cmp = mappingA.originalLine - mappingB.originalLine;
                if (cmp !== 0)
                {
                    return cmp;
                }
                cmp = mappingA.originalColumn - mappingB.originalColumn;
                if (cmp !== 0 || onlyCompareOriginal)
                {
                    return cmp;
                }
                cmp = mappingA.generatedColumn - mappingB.generatedColumn;
                if (cmp !== 0)
                {
                    return cmp;
                }
                cmp = mappingA.generatedLine - mappingB.generatedLine;
                if (cmp !== 0)
                {
                    return cmp;
                }
                return mappingA.name - mappingB.name;
            }
            exports.compareByOriginalPositions = compareByOriginalPositions;
            function compareByGeneratedPositionsDeflated(mappingA, mappingB, onlyCompareGenerated)
            {
                var cmp = mappingA.generatedLine - mappingB.generatedLine;
                if (cmp !== 0)
                {
                    return cmp;
                }
                cmp = mappingA.generatedColumn - mappingB.generatedColumn;
                if (cmp !== 0 || onlyCompareGenerated)
                {
                    return cmp;
                }
                cmp = mappingA.source - mappingB.source;
                if (cmp !== 0)
                {
                    return cmp;
                }
                cmp = mappingA.originalLine - mappingB.originalLine;
                if (cmp !== 0)
                {
                    return cmp;
                }
                cmp = mappingA.originalColumn - mappingB.originalColumn;
                if (cmp !== 0)
                {
                    return cmp;
                }
                return mappingA.name - mappingB.name;
            }
            exports.compareByGeneratedPositionsDeflated = compareByGeneratedPositionsDeflated;
            function strcmp(aStr1, aStr2)
            {
                if (aStr1 === aStr2)
                {
                    return 0;
                }
                if (aStr1 > aStr2)
                {
                    return 1;
                }
                return -1;
            }
            function compareByGeneratedPositionsInflated(mappingA, mappingB)
            {
                var cmp = mappingA.generatedLine - mappingB.generatedLine;
                if (cmp !== 0)
                {
                    return cmp;
                }
                cmp = mappingA.generatedColumn - mappingB.generatedColumn;
                if (cmp !== 0)
                {
                    return cmp;
                }
                cmp = strcmp(mappingA.source, mappingB.source);
                if (cmp !== 0)
                {
                    return cmp;
                }
                cmp = mappingA.originalLine - mappingB.originalLine;
                if (cmp !== 0)
                {
                    return cmp;
                }
                cmp = mappingA.originalColumn - mappingB.originalColumn;
                if (cmp !== 0)
                {
                    return cmp;
                }
                return strcmp(mappingA.name, mappingB.name);
            }
            exports.compareByGeneratedPositionsInflated = compareByGeneratedPositionsInflated;
        },         function(module, exports, __webpack_require__)
        {
            var util = __webpack_require__(4);
            var has = Object.prototype.hasOwnProperty;
            function ArraySet()
            {
                this._array = [];
                this._set = Object.create(null);
            }
            ArraySet.fromArray =             function ArraySet_fromArray(aArray, aAllowDuplicates)
            {
                var set = new ArraySet();
                for (var i = 0, len = aArray.length; i < len; i++)
                {
                    set.add(aArray[i], aAllowDuplicates);
                }
                return set;
            };
            ArraySet.prototype.size =             function ArraySet_size()
            {
                return Object.getOwnPropertyNames(this._set).length;
            };
            ArraySet.prototype.add =             function ArraySet_add(aStr, aAllowDuplicates)
            {
                var sStr = util.toSetString(aStr);
                var isDuplicate = has.call(this._set, sStr);
                var idx = this._array.length;
                if (!isDuplicate || aAllowDuplicates)
                {
                    this._array.push(aStr);
                }
                if (!isDuplicate)
                {
                    this._set[sStr] = idx;
                }
            };
            ArraySet.prototype.has =             function ArraySet_has(aStr)
            {
                var sStr = util.toSetString(aStr);
                return has.call(this._set, sStr);
            };
            ArraySet.prototype.indexOf =             function ArraySet_indexOf(aStr)
            {
                var sStr = util.toSetString(aStr);
                if (has.call(this._set, sStr))
                {
                    return this._set[sStr];
                }
                throw new Error('"' + aStr + '" is not in the set.');
            };
            ArraySet.prototype.at =             function ArraySet_at(aIdx)
            {
                if (aIdx >= 0 && aIdx < this._array.length)
                {
                    return this._array[aIdx];
                }
                throw new Error('No element indexed by ' + aIdx);
            };
            ArraySet.prototype.toArray =             function ArraySet_toArray()
            {
                return this._array.slice();
            };
            exports.ArraySet = ArraySet;
        },         function(module, exports, __webpack_require__)
        {
            var util = __webpack_require__(4);
            function generatedPositionAfter(mappingA, mappingB)
            {
                var lineA = mappingA.generatedLine;
                var lineB = mappingB.generatedLine;
                var columnA = mappingA.generatedColumn;
                var columnB = mappingB.generatedColumn;
                return lineB > lineA || lineB == lineA && columnB >= columnA || util.compareByGeneratedPositionsInflated(mappingA, mappingB) <= 0;
            }
            function MappingList()
            {
                this._array = [];
                this._sorted = true;
                this._last = {generatedLine: -1, generatedColumn: 0};
            }
            MappingList.prototype.unsortedForEach =             function MappingList_forEach(aCallback, aThisArg)
            {
                this._array.forEach(aCallback, aThisArg);
            };
            MappingList.prototype.add =             function MappingList_add(aMapping)
            {
                if (generatedPositionAfter(this._last, aMapping))
                {
                    this._last = aMapping;
                    this._array.push(aMapping);
                }
                else
                {
                    this._sorted = false;
                    this._array.push(aMapping);
                }
            };
            MappingList.prototype.toArray =             function MappingList_toArray()
            {
                if (!this._sorted)
                {
                    this._array.sort(util.compareByGeneratedPositionsInflated);
                    this._sorted = true;
                }
                return this._array;
            };
            exports.MappingList = MappingList;
        },         function(module, exports, __webpack_require__)
        {
            var util = __webpack_require__(4);
            var binarySearch = __webpack_require__(8);
            var ArraySet = __webpack_require__(5).ArraySet;
            var base64VLQ = __webpack_require__(2);
            var quickSort = __webpack_require__(9).quickSort;
            function SourceMapConsumer(aSourceMap)
            {
                var sourceMap = aSourceMap;
                if (typeof aSourceMap === 'string')
                {
                    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
                }
                return sourceMap.sections != null ? new IndexedSourceMapConsumer(sourceMap) : new BasicSourceMapConsumer(sourceMap);
            }
            SourceMapConsumer.fromSourceMap =             function(aSourceMap)
            {
                return BasicSourceMapConsumer.fromSourceMap(aSourceMap);
            };
            SourceMapConsumer.prototype._version = 3;
            SourceMapConsumer.prototype.__generatedMappings = null;
            Object.defineProperty(SourceMapConsumer.prototype, '_generatedMappings', {get:             function()
            {
                if (!this.__generatedMappings)
                {
                    this._parseMappings(this._mappings, this.sourceRoot);
                }
                return this.__generatedMappings;
            }});
            SourceMapConsumer.prototype.__originalMappings = null;
            Object.defineProperty(SourceMapConsumer.prototype, '_originalMappings', {get:             function()
            {
                if (!this.__originalMappings)
                {
                    this._parseMappings(this._mappings, this.sourceRoot);
                }
                return this.__originalMappings;
            }});
            SourceMapConsumer.prototype._charIsMappingSeparator =             function SourceMapConsumer_charIsMappingSeparator(aStr, index)
            {
                var c = aStr.charAt(index);
                return c === ";" || c === ",";
            };
            SourceMapConsumer.prototype._parseMappings =             function SourceMapConsumer_parseMappings(aStr, aSourceRoot)
            {
                throw new Error("Subclasses must implement _parseMappings");
            };
            SourceMapConsumer.GENERATED_ORDER = 1;
            SourceMapConsumer.ORIGINAL_ORDER = 2;
            SourceMapConsumer.GREATEST_LOWER_BOUND = 1;
            SourceMapConsumer.LEAST_UPPER_BOUND = 2;
            SourceMapConsumer.prototype.eachMapping =             function SourceMapConsumer_eachMapping(aCallback, aContext, aOrder)
            {
                var context = aContext || null;
                var order = aOrder || SourceMapConsumer.GENERATED_ORDER;
                var mappings;
                switch(order) {
                    case SourceMapConsumer.GENERATED_ORDER:
                        mappings = this._generatedMappings;
                        break;
                    case SourceMapConsumer.ORIGINAL_ORDER:
                        mappings = this._originalMappings;
                        break;
default:
                        throw new Error("Unknown order of iteration.");
                }
                var sourceRoot = this.sourceRoot;
                mappings.map(                function(mapping)
                {
                    var source = mapping.source === null ? null : this._sources.at(mapping.source);
                    if (source != null && sourceRoot != null)
                    {
                        source = util.join(sourceRoot, source);
                    }
                    return {source: source, generatedLine: mapping.generatedLine, generatedColumn: mapping.generatedColumn, originalLine: mapping.originalLine, originalColumn: mapping.originalColumn, name: mapping.name === null ? null : this._names.at(mapping.name)};
                }, this).forEach(aCallback, context);
            };
            SourceMapConsumer.prototype.allGeneratedPositionsFor =             function SourceMapConsumer_allGeneratedPositionsFor(aArgs)
            {
                var line = util.getArg(aArgs, 'line');
                var needle = {source: util.getArg(aArgs, 'source'), originalLine: line, originalColumn: util.getArg(aArgs, 'column', 0)};
                if (this.sourceRoot != null)
                {
                    needle.source = util.relative(this.sourceRoot, needle.source);
                }
                if (!this._sources.has(needle.source))
                {
                    return [];
                }
                needle.source = this._sources.indexOf(needle.source);
                var mappings = [];
                var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, binarySearch.LEAST_UPPER_BOUND);
                if (index >= 0)
                {
                    var mapping = this._originalMappings[index];
                    if (aArgs.column === undefined)
                    {
                        var originalLine = mapping.originalLine;
                        while (mapping && mapping.originalLine === originalLine)
                        {
                            mappings.push({line: util.getArg(mapping, 'generatedLine', null), column: util.getArg(mapping, 'generatedColumn', null), lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)});
                            mapping = this._originalMappings[++index];
                        }
                    }
                    else
                    {
                        var originalColumn = mapping.originalColumn;
                        while (mapping && mapping.originalLine === line && mapping.originalColumn == originalColumn)
                        {
                            mappings.push({line: util.getArg(mapping, 'generatedLine', null), column: util.getArg(mapping, 'generatedColumn', null), lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)});
                            mapping = this._originalMappings[++index];
                        }
                    }
                }
                return mappings;
            };
            exports.SourceMapConsumer = SourceMapConsumer;
            function BasicSourceMapConsumer(aSourceMap)
            {
                var sourceMap = aSourceMap;
                if (typeof aSourceMap === 'string')
                {
                    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
                }
                var version = util.getArg(sourceMap, 'version');
                var sources = util.getArg(sourceMap, 'sources');
                var names = util.getArg(sourceMap, 'names', []);
                var sourceRoot = util.getArg(sourceMap, 'sourceRoot', null);
                var sourcesContent = util.getArg(sourceMap, 'sourcesContent', null);
                var mappings = util.getArg(sourceMap, 'mappings');
                var file = util.getArg(sourceMap, 'file', null);
                if (version != this._version)
                {
                    throw new Error('Unsupported version: ' + version);
                }
                sources = sources.map(String).map(util.normalize).map(                function(source)
                {
                    return sourceRoot && util.isAbsolute(sourceRoot) && util.isAbsolute(source) ? util.relative(sourceRoot, source) : source;
                });
                this._names = ArraySet.fromArray(names.map(String), true);
                this._sources = ArraySet.fromArray(sources, true);
                this.sourceRoot = sourceRoot;
                this.sourcesContent = sourcesContent;
                this._mappings = mappings;
                this.file = file;
            }
            BasicSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
            BasicSourceMapConsumer.prototype.consumer = SourceMapConsumer;
            BasicSourceMapConsumer.fromSourceMap =             function SourceMapConsumer_fromSourceMap(aSourceMap)
            {
                var smc = Object.create(BasicSourceMapConsumer.prototype);
                var names = smc._names = ArraySet.fromArray(aSourceMap._names.toArray(), true);
                var sources = smc._sources = ArraySet.fromArray(aSourceMap._sources.toArray(), true);
                smc.sourceRoot = aSourceMap._sourceRoot;
                smc.sourcesContent = aSourceMap._generateSourcesContent(smc._sources.toArray(), smc.sourceRoot);
                smc.file = aSourceMap._file;
                var generatedMappings = aSourceMap._mappings.toArray().slice();
                var destGeneratedMappings = smc.__generatedMappings = [];
                var destOriginalMappings = smc.__originalMappings = [];
                for (var i = 0, length = generatedMappings.length; i < length; i++)
                {
                    var srcMapping = generatedMappings[i];
                    var destMapping = new Mapping();
                    destMapping.generatedLine = srcMapping.generatedLine;
                    destMapping.generatedColumn = srcMapping.generatedColumn;
                    if (srcMapping.source)
                    {
                        destMapping.source = sources.indexOf(srcMapping.source);
                        destMapping.originalLine = srcMapping.originalLine;
                        destMapping.originalColumn = srcMapping.originalColumn;
                        if (srcMapping.name)
                        {
                            destMapping.name = names.indexOf(srcMapping.name);
                        }
                        destOriginalMappings.push(destMapping);
                    }
                    destGeneratedMappings.push(destMapping);
                }
                quickSort(smc.__originalMappings, util.compareByOriginalPositions);
                return smc;
            };
            BasicSourceMapConsumer.prototype._version = 3;
            Object.defineProperty(BasicSourceMapConsumer.prototype, 'sources', {get:             function()
            {
                return this._sources.toArray().map(                function(s)
                {
                    return this.sourceRoot != null ? util.join(this.sourceRoot, s) : s;
                }, this);
            }});
            function Mapping()
            {
                this.generatedLine = 0;
                this.generatedColumn = 0;
                this.source = null;
                this.originalLine = null;
                this.originalColumn = null;
                this.name = null;
            }
            BasicSourceMapConsumer.prototype._parseMappings =             function SourceMapConsumer_parseMappings(aStr, aSourceRoot)
            {
                var generatedLine = 1;
                var previousGeneratedColumn = 0;
                var previousOriginalLine = 0;
                var previousOriginalColumn = 0;
                var previousSource = 0;
                var previousName = 0;
                var length = aStr.length;
                var index = 0;
                var cachedSegments = {};
                var temp = {};
                var originalMappings = [];
                var generatedMappings = [];
                var mapping,
                    str,
                    segment,
                    end,
                    value;
                while (index < length)
                {
                    if (aStr.charAt(index) === ';')
                    {
                        generatedLine++;
                        index++;
                        previousGeneratedColumn = 0;
                    }
                    else if (aStr.charAt(index) === ',')
                    {
                        index++;
                    }
                    else
                    {
                        mapping = new Mapping();
                        mapping.generatedLine = generatedLine;
                        for (end = index; end < length; end++)
                        {
                            if (this._charIsMappingSeparator(aStr, end))
                            {
                                break;
                            }
                        }
                        str = aStr.slice(index, end);
                        segment = cachedSegments[str];
                        if (segment)
                        {
                            index += str.length;
                        }
                        else
                        {
                            segment = [];
                            while (index < end)
                            {
                                base64VLQ.decode(aStr, index, temp);
                                value = temp.value;
                                index = temp.rest;
                                segment.push(value);
                            }
                            if (segment.length === 2)
                            {
                                throw new Error('Found a source, but no line and column');
                            }
                            if (segment.length === 3)
                            {
                                throw new Error('Found a source and line, but no column');
                            }
                            cachedSegments[str] = segment;
                        }
                        mapping.generatedColumn = previousGeneratedColumn + segment[0];
                        previousGeneratedColumn = mapping.generatedColumn;
                        if (segment.length > 1)
                        {
                            mapping.source = previousSource + segment[1];
                            previousSource += segment[1];
                            mapping.originalLine = previousOriginalLine + segment[2];
                            previousOriginalLine = mapping.originalLine;
                            mapping.originalLine += 1;
                            mapping.originalColumn = previousOriginalColumn + segment[3];
                            previousOriginalColumn = mapping.originalColumn;
                            if (segment.length > 4)
                            {
                                mapping.name = previousName + segment[4];
                                previousName += segment[4];
                            }
                        }
                        generatedMappings.push(mapping);
                        if (typeof mapping.originalLine === 'number')
                        {
                            originalMappings.push(mapping);
                        }
                    }
                }
                quickSort(generatedMappings, util.compareByGeneratedPositionsDeflated);
                this.__generatedMappings = generatedMappings;
                quickSort(originalMappings, util.compareByOriginalPositions);
                this.__originalMappings = originalMappings;
            };
            BasicSourceMapConsumer.prototype._findMapping =             function SourceMapConsumer_findMapping(aNeedle, aMappings, aLineName, aColumnName, aComparator, aBias)
            {
                if (aNeedle[aLineName] <= 0)
                {
                    throw new TypeError('Line must be greater than or equal to 1, got ' + aNeedle[aLineName]);
                }
                if (aNeedle[aColumnName] < 0)
                {
                    throw new TypeError('Column must be greater than or equal to 0, got ' + aNeedle[aColumnName]);
                }
                return binarySearch.search(aNeedle, aMappings, aComparator, aBias);
            };
            BasicSourceMapConsumer.prototype.computeColumnSpans =             function SourceMapConsumer_computeColumnSpans()
            {
                for (var index = 0; index < this._generatedMappings.length; ++index)
                {
                    var mapping = this._generatedMappings[index];
                    if (index + 1 < this._generatedMappings.length)
                    {
                        var nextMapping = this._generatedMappings[index + 1];
                        if (mapping.generatedLine === nextMapping.generatedLine)
                        {
                            mapping.lastGeneratedColumn = nextMapping.generatedColumn - 1;
                            continue;
                        }
                    }
                    mapping.lastGeneratedColumn = Infinity;
                }
            };
            BasicSourceMapConsumer.prototype.originalPositionFor =             function SourceMapConsumer_originalPositionFor(aArgs)
            {
                var needle = {generatedLine: util.getArg(aArgs, 'line'), generatedColumn: util.getArg(aArgs, 'column')};
                var index = this._findMapping(needle, this._generatedMappings, "generatedLine", "generatedColumn", util.compareByGeneratedPositionsDeflated, util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND));
                if (index >= 0)
                {
                    var mapping = this._generatedMappings[index];
                    if (mapping.generatedLine === needle.generatedLine)
                    {
                        var source = util.getArg(mapping, 'source', null);
                        if (source !== null)
                        {
                            source = this._sources.at(source);
                            if (this.sourceRoot != null)
                            {
                                source = util.join(this.sourceRoot, source);
                            }
                        }
                        var name = util.getArg(mapping, 'name', null);
                        if (name !== null)
                        {
                            name = this._names.at(name);
                        }
                        return {source: source, line: util.getArg(mapping, 'originalLine', null), column: util.getArg(mapping, 'originalColumn', null), name: name};
                    }
                }
                return {source: null, line: null, column: null, name: null};
            };
            BasicSourceMapConsumer.prototype.hasContentsOfAllSources =             function BasicSourceMapConsumer_hasContentsOfAllSources()
            {
                if (!this.sourcesContent)
                {
                    return false;
                }
                return this.sourcesContent.length >= this._sources.size() && !this.sourcesContent.some(                function(sc)
                {
                    return sc == null;
                });
            };
            BasicSourceMapConsumer.prototype.sourceContentFor =             function SourceMapConsumer_sourceContentFor(aSource, nullOnMissing)
            {
                if (!this.sourcesContent)
                {
                    return null;
                }
                if (this.sourceRoot != null)
                {
                    aSource = util.relative(this.sourceRoot, aSource);
                }
                if (this._sources.has(aSource))
                {
                    return this.sourcesContent[this._sources.indexOf(aSource)];
                }
                var url;
                if (this.sourceRoot != null && (url = util.urlParse(this.sourceRoot)))
                {
                    var fileUriAbsPath = aSource.replace(/^file:\/\//, "");
                    if (url.scheme == "file" && this._sources.has(fileUriAbsPath))
                    {
                        return this.sourcesContent[this._sources.indexOf(fileUriAbsPath)];
                    }
                    if ((!url.path || url.path == "/") && this._sources.has("/" + aSource))
                    {
                        return this.sourcesContent[this._sources.indexOf("/" + aSource)];
                    }
                }
                if (nullOnMissing)
                {
                    return null;
                }
                else
                {
                    throw new Error('"' + aSource + '" is not in the SourceMap.');
                }
            };
            BasicSourceMapConsumer.prototype.generatedPositionFor =             function SourceMapConsumer_generatedPositionFor(aArgs)
            {
                var source = util.getArg(aArgs, 'source');
                if (this.sourceRoot != null)
                {
                    source = util.relative(this.sourceRoot, source);
                }
                if (!this._sources.has(source))
                {
                    return {line: null, column: null, lastColumn: null};
                }
                source = this._sources.indexOf(source);
                var needle = {source: source, originalLine: util.getArg(aArgs, 'line'), originalColumn: util.getArg(aArgs, 'column')};
                var index = this._findMapping(needle, this._originalMappings, "originalLine", "originalColumn", util.compareByOriginalPositions, util.getArg(aArgs, 'bias', SourceMapConsumer.GREATEST_LOWER_BOUND));
                if (index >= 0)
                {
                    var mapping = this._originalMappings[index];
                    if (mapping.source === needle.source)
                    {
                        return {line: util.getArg(mapping, 'generatedLine', null), column: util.getArg(mapping, 'generatedColumn', null), lastColumn: util.getArg(mapping, 'lastGeneratedColumn', null)};
                    }
                }
                return {line: null, column: null, lastColumn: null};
            };
            exports.BasicSourceMapConsumer = BasicSourceMapConsumer;
            function IndexedSourceMapConsumer(aSourceMap)
            {
                var sourceMap = aSourceMap;
                if (typeof aSourceMap === 'string')
                {
                    sourceMap = JSON.parse(aSourceMap.replace(/^\)\]\}'/, ''));
                }
                var version = util.getArg(sourceMap, 'version');
                var sections = util.getArg(sourceMap, 'sections');
                if (version != this._version)
                {
                    throw new Error('Unsupported version: ' + version);
                }
                this._sources = new ArraySet();
                this._names = new ArraySet();
                var lastOffset = {line: -1, column: 0};
                this._sections = sections.map(                function(s)
                {
                    if (s.url)
                    {
                        throw new Error('Support for url field in sections not implemented.');
                    }
                    var offset = util.getArg(s, 'offset');
                    var offsetLine = util.getArg(offset, 'line');
                    var offsetColumn = util.getArg(offset, 'column');
                    if (offsetLine < lastOffset.line || offsetLine === lastOffset.line && offsetColumn < lastOffset.column)
                    {
                        throw new Error('Section offsets must be ordered and non-overlapping.');
                    }
                    lastOffset = offset;
                    return {generatedOffset: {generatedLine: offsetLine + 1, generatedColumn: offsetColumn + 1}, consumer: new SourceMapConsumer(util.getArg(s, 'map'))};
                });
            }
            IndexedSourceMapConsumer.prototype = Object.create(SourceMapConsumer.prototype);
            IndexedSourceMapConsumer.prototype.constructor = SourceMapConsumer;
            IndexedSourceMapConsumer.prototype._version = 3;
            Object.defineProperty(IndexedSourceMapConsumer.prototype, 'sources', {get:             function()
            {
                var sources = [];
                for (var i = 0; i < this._sections.length; i++)
                {
                    for (var j = 0; j < this._sections[i].consumer.sources.length; j++)
                    {
                        sources.push(this._sections[i].consumer.sources[j]);
                    }
                }
                return sources;
            }});
            IndexedSourceMapConsumer.prototype.originalPositionFor =             function IndexedSourceMapConsumer_originalPositionFor(aArgs)
            {
                var needle = {generatedLine: util.getArg(aArgs, 'line'), generatedColumn: util.getArg(aArgs, 'column')};
                var sectionIndex = binarySearch.search(needle, this._sections,                 function(needle, section)
                {
                    var cmp = needle.generatedLine - section.generatedOffset.generatedLine;
                    if (cmp)
                    {
                        return cmp;
                    }
                    return needle.generatedColumn - section.generatedOffset.generatedColumn;
                });
                var section = this._sections[sectionIndex];
                if (!section)
                {
                    return {source: null, line: null, column: null, name: null};
                }
                return section.consumer.originalPositionFor({line: needle.generatedLine - (section.generatedOffset.generatedLine - 1), column: needle.generatedColumn - (section.generatedOffset.generatedLine === needle.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0), bias: aArgs.bias});
            };
            IndexedSourceMapConsumer.prototype.hasContentsOfAllSources =             function IndexedSourceMapConsumer_hasContentsOfAllSources()
            {
                return this._sections.every(                function(s)
                {
                    return s.consumer.hasContentsOfAllSources();
                });
            };
            IndexedSourceMapConsumer.prototype.sourceContentFor =             function IndexedSourceMapConsumer_sourceContentFor(aSource, nullOnMissing)
            {
                for (var i = 0; i < this._sections.length; i++)
                {
                    var section = this._sections[i];
                    var content = section.consumer.sourceContentFor(aSource, true);
                    if (content)
                    {
                        return content;
                    }
                }
                if (nullOnMissing)
                {
                    return null;
                }
                else
                {
                    throw new Error('"' + aSource + '" is not in the SourceMap.');
                }
            };
            IndexedSourceMapConsumer.prototype.generatedPositionFor =             function IndexedSourceMapConsumer_generatedPositionFor(aArgs)
            {
                for (var i = 0; i < this._sections.length; i++)
                {
                    var section = this._sections[i];
                    if (section.consumer.sources.indexOf(util.getArg(aArgs, 'source')) === -1)
                    {
                        continue;
                    }
                    var generatedPosition = section.consumer.generatedPositionFor(aArgs);
                    if (generatedPosition)
                    {
                        var ret = {line: generatedPosition.line + (section.generatedOffset.generatedLine - 1), column: generatedPosition.column + (section.generatedOffset.generatedLine === generatedPosition.line ? section.generatedOffset.generatedColumn - 1 : 0)};
                        return ret;
                    }
                }
                return {line: null, column: null};
            };
            IndexedSourceMapConsumer.prototype._parseMappings =             function IndexedSourceMapConsumer_parseMappings(aStr, aSourceRoot)
            {
                this.__generatedMappings = [];
                this.__originalMappings = [];
                for (var i = 0; i < this._sections.length; i++)
                {
                    var section = this._sections[i];
                    var sectionMappings = section.consumer._generatedMappings;
                    for (var j = 0; j < sectionMappings.length; j++)
                    {
                        var mapping = sectionMappings[j];
                        var source = section.consumer._sources.at(mapping.source);
                        if (section.consumer.sourceRoot !== null)
                        {
                            source = util.join(section.consumer.sourceRoot, source);
                        }
                        this._sources.add(source);
                        source = this._sources.indexOf(source);
                        var name = section.consumer._names.at(mapping.name);
                        this._names.add(name);
                        name = this._names.indexOf(name);
                        var adjustedMapping = {source: source, generatedLine: mapping.generatedLine + (section.generatedOffset.generatedLine - 1), generatedColumn: mapping.generatedColumn + (section.generatedOffset.generatedLine === mapping.generatedLine ? section.generatedOffset.generatedColumn - 1 : 0), originalLine: mapping.originalLine, originalColumn: mapping.originalColumn, name: name};
                        this.__generatedMappings.push(adjustedMapping);
                        if (typeof adjustedMapping.originalLine === 'number')
                        {
                            this.__originalMappings.push(adjustedMapping);
                        }
                    }
                }
                quickSort(this.__generatedMappings, util.compareByGeneratedPositionsDeflated);
                quickSort(this.__originalMappings, util.compareByOriginalPositions);
            };
            exports.IndexedSourceMapConsumer = IndexedSourceMapConsumer;
        },         function(module, exports)
        {
            exports.GREATEST_LOWER_BOUND = 1;
            exports.LEAST_UPPER_BOUND = 2;
            function recursiveSearch(aLow, aHigh, aNeedle, aHaystack, aCompare, aBias)
            {
                var mid = Math.floor((aHigh - aLow) / 2) + aLow;
                var cmp = aCompare(aNeedle, aHaystack[mid], true);
                if (cmp === 0)
                {
                    return mid;
                }
                else if (cmp > 0)
                {
                    if (aHigh - mid > 1)
                    {
                        return recursiveSearch(mid, aHigh, aNeedle, aHaystack, aCompare, aBias);
                    }
                    if (aBias == exports.LEAST_UPPER_BOUND)
                    {
                        return aHigh < aHaystack.length ? aHigh : -1;
                    }
                    else
                    {
                        return mid;
                    }
                }
                else
                {
                    if (mid - aLow > 1)
                    {
                        return recursiveSearch(aLow, mid, aNeedle, aHaystack, aCompare, aBias);
                    }
                    if (aBias == exports.LEAST_UPPER_BOUND)
                    {
                        return mid;
                    }
                    else
                    {
                        return aLow < 0 ? -1 : aLow;
                    }
                }
            }
            exports.search =             function search(aNeedle, aHaystack, aCompare, aBias)
            {
                if (aHaystack.length === 0)
                {
                    return -1;
                }
                var index = recursiveSearch(-1, aHaystack.length, aNeedle, aHaystack, aCompare, aBias || exports.GREATEST_LOWER_BOUND);
                if (index < 0)
                {
                    return -1;
                }
                while (index - 1 >= 0)
                {
                    if (aCompare(aHaystack[index], aHaystack[index - 1], true) !== 0)
                    {
                        break;
                    }
                    --index;
                }
                return index;
            };
        },         function(module, exports)
        {
            function swap(ary, x, y)
            {
                var temp = ary[x];
                ary[x] = ary[y];
                ary[y] = temp;
            }
            function randomIntInRange(low, high)
            {
                return Math.round(low + Math.random() * (high - low));
            }
            function doQuickSort(ary, comparator, p, r)
            {
                if (p < r)
                {
                    var pivotIndex = randomIntInRange(p, r);
                    var i = p - 1;
                    swap(ary, pivotIndex, r);
                    var pivot = ary[r];
                    for (var j = p; j < r; j++)
                    {
                        if (comparator(ary[j], pivot) <= 0)
                        {
                            i += 1;
                            swap(ary, i, j);
                        }
                    }
                    swap(ary, i + 1, j);
                    var q = i + 1;
                    doQuickSort(ary, comparator, p, q - 1);
                    doQuickSort(ary, comparator, q + 1, r);
                }
            }
            exports.quickSort =             function(ary, comparator)
            {
                doQuickSort(ary, comparator, 0, ary.length - 1);
            };
        },         function(module, exports, __webpack_require__)
        {
            var SourceMapGenerator = __webpack_require__(1).SourceMapGenerator;
            var util = __webpack_require__(4);
            var REGEX_NEWLINE = /(\r?\n)/;
            var NEWLINE_CODE = 10;
            var isSourceNode = "$$$isSourceNode$$$";
            function SourceNode(aLine, aColumn, aSource, aChunks, aName)
            {
                this.children = [];
                this.sourceContents = {};
                this.line = aLine == null ? null : aLine;
                this.column = aColumn == null ? null : aColumn;
                this.source = aSource == null ? null : aSource;
                this.name = aName == null ? null : aName;
                this[isSourceNode] = true;
                if (aChunks != null)
                    this.add(aChunks);
            }
            SourceNode.fromStringWithSourceMap =             function SourceNode_fromStringWithSourceMap(aGeneratedCode, aSourceMapConsumer, aRelativePath)
            {
                var node = new SourceNode();
                var remainingLines = aGeneratedCode.split(REGEX_NEWLINE);
                var shiftNextLine =                 function()
                {
                    var lineContents = remainingLines.shift();
                    var newLine = remainingLines.shift() || "";
                    return lineContents + newLine;
                };
                var lastGeneratedLine = 1,
                    lastGeneratedColumn = 0;
                var lastMapping = null;
                aSourceMapConsumer.eachMapping(                function(mapping)
                {
                    if (lastMapping !== null)
                    {
                        if (lastGeneratedLine < mapping.generatedLine)
                        {
                            addMappingWithCode(lastMapping, shiftNextLine());
                            lastGeneratedLine++;
                            lastGeneratedColumn = 0;
                        }
                        else
                        {
                            var nextLine = remainingLines[0];
                            var code = nextLine.substr(0, mapping.generatedColumn - lastGeneratedColumn);
                            remainingLines[0] = nextLine.substr(mapping.generatedColumn - lastGeneratedColumn);
                            lastGeneratedColumn = mapping.generatedColumn;
                            addMappingWithCode(lastMapping, code);
                            lastMapping = mapping;
                            return;
                        }
                    }
                    while (lastGeneratedLine < mapping.generatedLine)
                    {
                        node.add(shiftNextLine());
                        lastGeneratedLine++;
                    }
                    if (lastGeneratedColumn < mapping.generatedColumn)
                    {
                        var nextLine = remainingLines[0];
                        node.add(nextLine.substr(0, mapping.generatedColumn));
                        remainingLines[0] = nextLine.substr(mapping.generatedColumn);
                        lastGeneratedColumn = mapping.generatedColumn;
                    }
                    lastMapping = mapping;
                }, this);
                if (remainingLines.length > 0)
                {
                    if (lastMapping)
                    {
                        addMappingWithCode(lastMapping, shiftNextLine());
                    }
                    node.add(remainingLines.join(""));
                }
                aSourceMapConsumer.sources.forEach(                function(sourceFile)
                {
                    var content = aSourceMapConsumer.sourceContentFor(sourceFile);
                    if (content != null)
                    {
                        if (aRelativePath != null)
                        {
                            sourceFile = util.join(aRelativePath, sourceFile);
                        }
                        node.setSourceContent(sourceFile, content);
                    }
                });
                return node;
                function addMappingWithCode(mapping, code)
                {
                    if (mapping === null || mapping.source === undefined)
                    {
                        node.add(code);
                    }
                    else
                    {
                        var source = aRelativePath ? util.join(aRelativePath, mapping.source) : mapping.source;
                        node.add(new SourceNode(mapping.originalLine, mapping.originalColumn, source, code, mapping.name));
                    }
                }
            };
            SourceNode.prototype.add =             function SourceNode_add(aChunk)
            {
                if (Array.isArray(aChunk))
                {
                    aChunk.forEach(                    function(chunk)
                    {
                        this.add(chunk);
                    }, this);
                }
                else if (aChunk[isSourceNode] || typeof aChunk === "string")
                {
                    if (aChunk)
                    {
                        this.children.push(aChunk);
                    }
                }
                else
                {
                    throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
                }
                return this;
            };
            SourceNode.prototype.prepend =             function SourceNode_prepend(aChunk)
            {
                if (Array.isArray(aChunk))
                {
                    for (var i = aChunk.length - 1; i >= 0; i--)
                    {
                        this.prepend(aChunk[i]);
                    }
                }
                else if (aChunk[isSourceNode] || typeof aChunk === "string")
                {
                    this.children.unshift(aChunk);
                }
                else
                {
                    throw new TypeError("Expected a SourceNode, string, or an array of SourceNodes and strings. Got " + aChunk);
                }
                return this;
            };
            SourceNode.prototype.walk =             function SourceNode_walk(aFn)
            {
                var chunk;
                for (var i = 0, len = this.children.length; i < len; i++)
                {
                    chunk = this.children[i];
                    if (chunk[isSourceNode])
                    {
                        chunk.walk(aFn);
                    }
                    else
                    {
                        if (chunk !== '')
                        {
                            aFn(chunk, {source: this.source, line: this.line, column: this.column, name: this.name});
                        }
                    }
                }
            };
            SourceNode.prototype.join =             function SourceNode_join(aSep)
            {
                var newChildren;
                var i;
                var len = this.children.length;
                if (len > 0)
                {
                    newChildren = [];
                    for (i = 0; i < len - 1; i++)
                    {
                        newChildren.push(this.children[i]);
                        newChildren.push(aSep);
                    }
                    newChildren.push(this.children[i]);
                    this.children = newChildren;
                }
                return this;
            };
            SourceNode.prototype.replaceRight =             function SourceNode_replaceRight(aPattern, aReplacement)
            {
                var lastChild = this.children[this.children.length - 1];
                if (lastChild[isSourceNode])
                {
                    lastChild.replaceRight(aPattern, aReplacement);
                }
                else if (typeof lastChild === 'string')
                {
                    this.children[this.children.length - 1] = lastChild.replace(aPattern, aReplacement);
                }
                else
                {
                    this.children.push(''.replace(aPattern, aReplacement));
                }
                return this;
            };
            SourceNode.prototype.setSourceContent =             function SourceNode_setSourceContent(aSourceFile, aSourceContent)
            {
                this.sourceContents[util.toSetString(aSourceFile)] = aSourceContent;
            };
            SourceNode.prototype.walkSourceContents =             function SourceNode_walkSourceContents(aFn)
            {
                for (var i = 0, len = this.children.length; i < len; i++)
                {
                    if (this.children[i][isSourceNode])
                    {
                        this.children[i].walkSourceContents(aFn);
                    }
                }
                var sources = Object.keys(this.sourceContents);
                for (var i = 0, len = sources.length; i < len; i++)
                {
                    aFn(util.fromSetString(sources[i]), this.sourceContents[sources[i]]);
                }
            };
            SourceNode.prototype.toString =             function SourceNode_toString()
            {
                var str = "";
                this.walk(                function(chunk)
                {
                    str += chunk;
                });
                return str;
            };
            SourceNode.prototype.toStringWithSourceMap =             function SourceNode_toStringWithSourceMap(aArgs)
            {
                var generated = {code: "", line: 1, column: 0};
                var map = new SourceMapGenerator(aArgs);
                var sourceMappingActive = false;
                var lastOriginalSource = null;
                var lastOriginalLine = null;
                var lastOriginalColumn = null;
                var lastOriginalName = null;
                this.walk(                function(chunk, original)
                {
                    generated.code += chunk;
                    if (original.source !== null && original.line !== null && original.column !== null)
                    {
                        if (lastOriginalSource !== original.source || lastOriginalLine !== original.line || lastOriginalColumn !== original.column || lastOriginalName !== original.name)
                        {
                            map.addMapping({source: original.source, original: {line: original.line, column: original.column}, generated: {line: generated.line, column: generated.column}, name: original.name});
                        }
                        lastOriginalSource = original.source;
                        lastOriginalLine = original.line;
                        lastOriginalColumn = original.column;
                        lastOriginalName = original.name;
                        sourceMappingActive = true;
                    }
                    else if (sourceMappingActive)
                    {
                        map.addMapping({generated: {line: generated.line, column: generated.column}});
                        lastOriginalSource = null;
                        sourceMappingActive = false;
                    }
                    for (var idx = 0, length = chunk.length; idx < length; idx++)
                    {
                        if (chunk.charCodeAt(idx) === NEWLINE_CODE)
                        {
                            generated.line++;
                            generated.column = 0;
                            if (idx + 1 === length)
                            {
                                lastOriginalSource = null;
                                sourceMappingActive = false;
                            }
                            else if (sourceMappingActive)
                            {
                                map.addMapping({source: original.source, original: {line: original.line, column: original.column}, generated: {line: generated.line, column: generated.column}, name: original.name});
                            }
                        }
                        else
                        {
                            generated.column++;
                        }
                    }
                });
                this.walkSourceContents(                function(sourceFile, sourceContent)
                {
                    map.setSourceContent(sourceFile, sourceContent);
                });
                return {code: generated.code, map: map};
            };
            exports.SourceNode = SourceNode;
        }]);
    });
;
    (    function(global, factory)
    {
        typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (global = global || self, factory((global.acorn = global.acorn || {}, global.acorn.walk = {})));
    })(this,     function(exports)
    {
        'use strict';
        function simple(node, visitors, baseVisitor, state, override)
        {
            if (!baseVisitor)
            {
                baseVisitor = base;
            }
            (            function c(node, st, override)
            {
                var type = override || node.type,
                    found = visitors[type];
                baseVisitor[type](node, st, c);
                if (found)
                {
                    found(node, st);
                }
            })(node, state, override);
        }
        function ancestor(node, visitors, baseVisitor, state, override)
        {
            var ancestors = [];
            if (!baseVisitor)
            {
                baseVisitor = base;
            }
            (            function c(node, st, override)
            {
                var type = override || node.type,
                    found = visitors[type];
                var isNew = node !== ancestors[ancestors.length - 1];
                if (isNew)
                {
                    ancestors.push(node);
                }
                baseVisitor[type](node, st, c);
                if (found)
                {
                    found(node, st || ancestors, ancestors);
                }
                if (isNew)
                {
                    ancestors.pop();
                }
            })(node, state, override);
        }
        function recursive(node, state, funcs, baseVisitor, override)
        {
            var visitor = funcs ? make(funcs, baseVisitor || undefined) : baseVisitor;
            (            function c(node, st, override)
            {
                visitor[override || node.type](node, st, c);
            })(node, state, override);
        }
        function makeTest(test)
        {
            if (typeof test === "string")
            {
                return                 function(type)
                {
                    return type === test;
                };
            }
            else if (!test)
            {
                return                 function()
                {
                    return true;
                };
            }
            else
            {
                return test;
            }
        }
        var Found =         function Found(node, state)
        {
            this.node = node;
            this.state = state;
        };
        function full(node, callback, baseVisitor, state, override)
        {
            if (!baseVisitor)
            {
                baseVisitor = base;
            }
            var last;
            (            function c(node, st, override)
            {
                var type = override || node.type;
                baseVisitor[type](node, st, c);
                if (last !== node)
                {
                    callback(node, st, type);
                    last = node;
                }
            })(node, state, override);
        }
        function fullAncestor(node, callback, baseVisitor, state)
        {
            if (!baseVisitor)
            {
                baseVisitor = base;
            }
            var ancestors = [],
                last;
            (            function c(node, st, override)
            {
                var type = override || node.type;
                var isNew = node !== ancestors[ancestors.length - 1];
                if (isNew)
                {
                    ancestors.push(node);
                }
                baseVisitor[type](node, st, c);
                if (last !== node)
                {
                    callback(node, st || ancestors, ancestors, type);
                    last = node;
                }
                if (isNew)
                {
                    ancestors.pop();
                }
            })(node, state);
        }
        function findNodeAt(node, start, end, test, baseVisitor, state)
        {
            if (!baseVisitor)
            {
                baseVisitor = base;
            }
            test = makeTest(test);
            try {
                (                function c(node, st, override)
                {
                    var type = override || node.type;
                    if ((start == null || node.start <= start) && (end == null || node.end >= end))
                    {
                        baseVisitor[type](node, st, c);
                    }
                    if ((start == null || node.start === start) && (end == null || node.end === end) && test(type, node))
                    {
                        throw new Found(node, st);
                    }
                })(node, state);
            }
            catch(e) {
                if (e instanceof Found)
                {
                    return e;
                }
                throw e;
            }
        }
        function findNodeAround(node, pos, test, baseVisitor, state)
        {
            test = makeTest(test);
            if (!baseVisitor)
            {
                baseVisitor = base;
            }
            try {
                (                function c(node, st, override)
                {
                    var type = override || node.type;
                    if (node.start > pos || node.end < pos)
                    {
                        return;
                    }
                    baseVisitor[type](node, st, c);
                    if (test(type, node))
                    {
                        throw new Found(node, st);
                    }
                })(node, state);
            }
            catch(e) {
                if (e instanceof Found)
                {
                    return e;
                }
                throw e;
            }
        }
        function findNodeAfter(node, pos, test, baseVisitor, state)
        {
            test = makeTest(test);
            if (!baseVisitor)
            {
                baseVisitor = base;
            }
            try {
                (                function c(node, st, override)
                {
                    if (node.end < pos)
                    {
                        return;
                    }
                    var type = override || node.type;
                    if (node.start >= pos && test(type, node))
                    {
                        throw new Found(node, st);
                    }
                    baseVisitor[type](node, st, c);
                })(node, state);
            }
            catch(e) {
                if (e instanceof Found)
                {
                    return e;
                }
                throw e;
            }
        }
        function findNodeBefore(node, pos, test, baseVisitor, state)
        {
            test = makeTest(test);
            if (!baseVisitor)
            {
                baseVisitor = base;
            }
            var max;
            (            function c(node, st, override)
            {
                if (node.start > pos)
                {
                    return;
                }
                var type = override || node.type;
                if (node.end <= pos && (!max || max.node.end < node.end) && test(type, node))
                {
                    max = new Found(node, st);
                }
                baseVisitor[type](node, st, c);
            })(node, state);
            return max;
        }
        function make(funcs, baseVisitor)
        {
            var visitor = Object.create(baseVisitor || base);
            for (var type in funcs)
            {
                visitor[type] = funcs[type];
            }
            return visitor;
        }
        function skipThrough(node, st, c)
        {
            c(node, st);
        }
        function ignore(_node, _st, _c)
        {
        }
        var base = {};
        base.Program = base.BlockStatement = base.StaticBlock =         function(node, st, c)
        {
            for (var i = 0, list = node.body; i < list.length; i += 1)
            {
                var stmt = list[i];
                c(stmt, st, "Statement");
            }
        };
        base.Statement = skipThrough;
        base.EmptyStatement = ignore;
        base.ExpressionStatement = base.ParenthesizedExpression = base.ChainExpression =         function(node, st, c)
        {
            return c(node.expression, st, "Expression");
        };
        base.IfStatement =         function(node, st, c)
        {
            c(node.test, st, "Expression");
            c(node.consequent, st, "Statement");
            if (node.alternate)
            {
                c(node.alternate, st, "Statement");
            }
        };
        base.LabeledStatement =         function(node, st, c)
        {
            return c(node.body, st, "Statement");
        };
        base.BreakStatement = base.ContinueStatement = ignore;
        base.WithStatement =         function(node, st, c)
        {
            c(node.object, st, "Expression");
            c(node.body, st, "Statement");
        };
        base.SwitchStatement =         function(node, st, c)
        {
            c(node.discriminant, st, "Expression");
            for (var i$1 = 0, list$1 = node.cases; i$1 < list$1.length; i$1 += 1)
            {
                var cs = list$1[i$1];
                if (cs.test)
                {
                    c(cs.test, st, "Expression");
                }
                for (var i = 0, list = cs.consequent; i < list.length; i += 1)
                {
                    var cons = list[i];
                    c(cons, st, "Statement");
                }
            }
        };
        base.SwitchCase =         function(node, st, c)
        {
            if (node.test)
            {
                c(node.test, st, "Expression");
            }
            for (var i = 0, list = node.consequent; i < list.length; i += 1)
            {
                var cons = list[i];
                c(cons, st, "Statement");
            }
        };
        base.ReturnStatement = base.YieldExpression = base.AwaitExpression =         function(node, st, c)
        {
            if (node.argument)
            {
                c(node.argument, st, "Expression");
            }
        };
        base.ThrowStatement = base.SpreadElement =         function(node, st, c)
        {
            return c(node.argument, st, "Expression");
        };
        base.TryStatement =         function(node, st, c)
        {
            c(node.block, st, "Statement");
            if (node.handler)
            {
                c(node.handler, st);
            }
            if (node.finalizer)
            {
                c(node.finalizer, st, "Statement");
            }
        };
        base.CatchClause =         function(node, st, c)
        {
            if (node.param)
            {
                c(node.param, st, "Pattern");
            }
            c(node.body, st, "Statement");
        };
        base.WhileStatement = base.DoWhileStatement =         function(node, st, c)
        {
            c(node.test, st, "Expression");
            c(node.body, st, "Statement");
        };
        base.ForStatement =         function(node, st, c)
        {
            if (node.init)
            {
                c(node.init, st, "ForInit");
            }
            if (node.test)
            {
                c(node.test, st, "Expression");
            }
            if (node.update)
            {
                c(node.update, st, "Expression");
            }
            c(node.body, st, "Statement");
        };
        base.ForInStatement = base.ForOfStatement =         function(node, st, c)
        {
            c(node.left, st, "ForInit");
            c(node.right, st, "Expression");
            c(node.body, st, "Statement");
        };
        base.ForInit =         function(node, st, c)
        {
            if (node.type === "VariableDeclaration")
            {
                c(node, st);
            }
            else
            {
                c(node, st, "Expression");
            }
        };
        base.DebuggerStatement = ignore;
        base.FunctionDeclaration =         function(node, st, c)
        {
            return c(node, st, "Function");
        };
        base.VariableDeclaration =         function(node, st, c)
        {
            for (var i = 0, list = node.declarations; i < list.length; i += 1)
            {
                var decl = list[i];
                c(decl, st);
            }
        };
        base.VariableDeclarator =         function(node, st, c)
        {
            c(node.id, st, "Pattern");
            if (node.init)
            {
                c(node.init, st, "Expression");
            }
        };
        base.Function =         function(node, st, c)
        {
            if (node.id)
            {
                c(node.id, st, "Pattern");
            }
            for (var i = 0, list = node.params; i < list.length; i += 1)
            {
                var param = list[i];
                c(param, st, "Pattern");
            }
            c(node.body, st, node.expression ? "Expression" : "Statement");
        };
        base.Pattern =         function(node, st, c)
        {
            if (node.type === "Identifier")
            {
                c(node, st, "VariablePattern");
            }
            else if (node.type === "MemberExpression")
            {
                c(node, st, "MemberPattern");
            }
            else
            {
                c(node, st);
            }
        };
        base.VariablePattern = ignore;
        base.MemberPattern = skipThrough;
        base.RestElement =         function(node, st, c)
        {
            return c(node.argument, st, "Pattern");
        };
        base.ArrayPattern =         function(node, st, c)
        {
            for (var i = 0, list = node.elements; i < list.length; i += 1)
            {
                var elt = list[i];
                if (elt)
                {
                    c(elt, st, "Pattern");
                }
            }
        };
        base.ObjectPattern =         function(node, st, c)
        {
            for (var i = 0, list = node.properties; i < list.length; i += 1)
            {
                var prop = list[i];
                if (prop.type === "Property")
                {
                    if (prop.computed)
                    {
                        c(prop.key, st, "Expression");
                    }
                    c(prop.value, st, "Pattern");
                }
                else if (prop.type === "RestElement")
                {
                    c(prop.argument, st, "Pattern");
                }
            }
        };
        base.Expression = skipThrough;
        base.ThisExpression = base.Super = base.MetaProperty = ignore;
        base.ArrayExpression =         function(node, st, c)
        {
            for (var i = 0, list = node.elements; i < list.length; i += 1)
            {
                var elt = list[i];
                if (elt)
                {
                    c(elt, st, "Expression");
                }
            }
        };
        base.ObjectExpression =         function(node, st, c)
        {
            for (var i = 0, list = node.properties; i < list.length; i += 1)
            {
                var prop = list[i];
                c(prop, st);
            }
        };
        base.FunctionExpression = base.ArrowFunctionExpression = base.FunctionDeclaration;
        base.SequenceExpression =         function(node, st, c)
        {
            for (var i = 0, list = node.expressions; i < list.length; i += 1)
            {
                var expr = list[i];
                c(expr, st, "Expression");
            }
        };
        base.TemplateLiteral =         function(node, st, c)
        {
            for (var i = 0, list = node.quasis; i < list.length; i += 1)
            {
                var quasi = list[i];
                c(quasi, st);
            }
            for (var i$1 = 0, list$1 = node.expressions; i$1 < list$1.length; i$1 += 1)
            {
                var expr = list$1[i$1];
                c(expr, st, "Expression");
            }
        };
        base.TemplateElement = ignore;
        base.UnaryExpression = base.UpdateExpression =         function(node, st, c)
        {
            c(node.argument, st, "Expression");
        };
        base.BinaryExpression = base.LogicalExpression =         function(node, st, c)
        {
            c(node.left, st, "Expression");
            c(node.right, st, "Expression");
        };
        base.AssignmentExpression = base.AssignmentPattern =         function(node, st, c)
        {
            c(node.left, st, "Pattern");
            c(node.right, st, "Expression");
        };
        base.ConditionalExpression =         function(node, st, c)
        {
            c(node.test, st, "Expression");
            c(node.consequent, st, "Expression");
            c(node.alternate, st, "Expression");
        };
        base.NewExpression = base.CallExpression =         function(node, st, c)
        {
            c(node.callee, st, "Expression");
            if (node.arguments)
            {
                for (var i = 0, list = node.arguments; i < list.length; i += 1)
                {
                    var arg = list[i];
                    c(arg, st, "Expression");
                }
            }
        };
        base.MemberExpression =         function(node, st, c)
        {
            c(node.object, st, "Expression");
            if (node.computed)
            {
                c(node.property, st, "Expression");
            }
        };
        base.ExportNamedDeclaration = base.ExportDefaultDeclaration =         function(node, st, c)
        {
            if (node.declaration)
            {
                c(node.declaration, st, node.type === "ExportNamedDeclaration" || node.declaration.id ? "Statement" : "Expression");
            }
            if (node.source)
            {
                c(node.source, st, "Expression");
            }
        };
        base.ExportAllDeclaration =         function(node, st, c)
        {
            if (node.exported)
            {
                c(node.exported, st);
            }
            c(node.source, st, "Expression");
        };
        base.ImportDeclaration =         function(node, st, c)
        {
            for (var i = 0, list = node.specifiers; i < list.length; i += 1)
            {
                var spec = list[i];
                c(spec, st);
            }
            c(node.source, st, "Expression");
        };
        base.ImportExpression =         function(node, st, c)
        {
            c(node.source, st, "Expression");
        };
        base.ImportSpecifier = base.ImportDefaultSpecifier = base.ImportNamespaceSpecifier = base.Identifier = base.PrivateIdentifier = base.Literal = ignore;
        base.TaggedTemplateExpression =         function(node, st, c)
        {
            c(node.tag, st, "Expression");
            c(node.quasi, st, "Expression");
        };
        base.ClassDeclaration = base.ClassExpression =         function(node, st, c)
        {
            return c(node, st, "Class");
        };
        base.Class =         function(node, st, c)
        {
            if (node.id)
            {
                c(node.id, st, "Pattern");
            }
            if (node.superClass)
            {
                c(node.superClass, st, "Expression");
            }
            c(node.body, st);
        };
        base.ClassBody =         function(node, st, c)
        {
            for (var i = 0, list = node.body; i < list.length; i += 1)
            {
                var elt = list[i];
                c(elt, st);
            }
        };
        base.MethodDefinition = base.PropertyDefinition = base.Property =         function(node, st, c)
        {
            if (node.computed)
            {
                c(node.key, st, "Expression");
            }
            if (node.value)
            {
                c(node.value, st, "Expression");
            }
        };
        exports.ancestor = ancestor;
        exports.base = base;
        exports.findNodeAfter = findNodeAfter;
        exports.findNodeAround = findNodeAround;
        exports.findNodeAt = findNodeAt;
        exports.findNodeBefore = findNodeBefore;
        exports.full = full;
        exports.fullAncestor = fullAncestor;
        exports.make = make;
        exports.recursive = recursive;
        exports.simple = simple;
        Object.defineProperty(exports, '__esModule', {value: true});
    });
    (    function(global, factory)
    {
        typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.objjParser = {}));
    })(this,     function(exports)
    {
        'use strict';
        var astralIdentifierCodes = [509, 0, 227, 0, 150, 4, 294, 9, 1368, 2, 2, 1, 6, 3, 41, 2, 5, 0, 166, 1, 574, 3, 9, 9, 370, 1, 154, 10, 50, 3, 123, 2, 54, 14, 32, 10, 3, 1, 11, 3, 46, 10, 8, 0, 46, 9, 7, 2, 37, 13, 2, 9, 6, 1, 45, 0, 13, 2, 49, 13, 9, 3, 2, 11, 83, 11, 7, 0, 161, 11, 6, 9, 7, 3, 56, 1, 2, 6, 3, 1, 3, 2, 10, 0, 11, 1, 3, 6, 4, 4, 193, 17, 10, 9, 5, 0, 82, 19, 13, 9, 214, 6, 3, 8, 28, 1, 83, 16, 16, 9, 82, 12, 9, 9, 84, 14, 5, 9, 243, 14, 166, 9, 71, 5, 2, 1, 3, 3, 2, 0, 2, 1, 13, 9, 120, 6, 3, 6, 4, 0, 29, 9, 41, 6, 2, 3, 9, 0, 10, 10, 47, 15, 406, 7, 2, 7, 17, 9, 57, 21, 2, 13, 123, 5, 4, 0, 2, 1, 2, 6, 2, 0, 9, 9, 49, 4, 2, 1, 2, 4, 9, 9, 330, 3, 19306, 9, 87, 9, 39, 4, 60, 6, 26, 9, 1014, 0, 2, 54, 8, 3, 82, 0, 12, 1, 19628, 1, 4706, 45, 3, 22, 543, 4, 4, 5, 9, 7, 3, 6, 31, 3, 149, 2, 1418, 49, 513, 54, 5, 49, 9, 0, 15, 0, 23, 4, 2, 14, 1361, 6, 2, 16, 3, 6, 2, 1, 2, 4, 262, 6, 10, 9, 357, 0, 62, 13, 1495, 6, 110, 6, 6, 9, 4759, 9, 787719, 239];
        var astralIdentifierStartCodes = [0, 11, 2, 25, 2, 18, 2, 1, 2, 14, 3, 13, 35, 122, 70, 52, 268, 28, 4, 48, 48, 31, 14, 29, 6, 37, 11, 29, 3, 35, 5, 7, 2, 4, 43, 157, 19, 35, 5, 35, 5, 39, 9, 51, 13, 10, 2, 14, 2, 6, 2, 1, 2, 10, 2, 14, 2, 6, 2, 1, 68, 310, 10, 21, 11, 7, 25, 5, 2, 41, 2, 8, 70, 5, 3, 0, 2, 43, 2, 1, 4, 0, 3, 22, 11, 22, 10, 30, 66, 18, 2, 1, 11, 21, 11, 25, 71, 55, 7, 1, 65, 0, 16, 3, 2, 2, 2, 28, 43, 28, 4, 28, 36, 7, 2, 27, 28, 53, 11, 21, 11, 18, 14, 17, 111, 72, 56, 50, 14, 50, 14, 35, 349, 41, 7, 1, 79, 28, 11, 0, 9, 21, 43, 17, 47, 20, 28, 22, 13, 52, 58, 1, 3, 0, 14, 44, 33, 24, 27, 35, 30, 0, 3, 0, 9, 34, 4, 0, 13, 47, 15, 3, 22, 0, 2, 0, 36, 17, 2, 24, 85, 6, 2, 0, 2, 3, 2, 14, 2, 9, 8, 46, 39, 7, 3, 1, 3, 21, 2, 6, 2, 1, 2, 4, 4, 0, 19, 0, 13, 4, 159, 52, 19, 3, 21, 2, 31, 47, 21, 1, 2, 0, 185, 46, 42, 3, 37, 47, 21, 0, 60, 42, 14, 0, 72, 26, 38, 6, 186, 43, 117, 63, 32, 7, 3, 0, 3, 7, 2, 1, 2, 23, 16, 0, 2, 0, 95, 7, 3, 38, 17, 0, 2, 0, 29, 0, 11, 39, 8, 0, 22, 0, 12, 45, 20, 0, 19, 72, 264, 8, 2, 36, 18, 0, 50, 29, 113, 6, 2, 1, 2, 37, 22, 0, 26, 5, 2, 1, 2, 31, 15, 0, 328, 18, 190, 0, 80, 921, 103, 110, 18, 195, 2637, 96, 16, 1070, 4050, 582, 8634, 568, 8, 30, 18, 78, 18, 29, 19, 47, 17, 3, 32, 20, 6, 18, 689, 63, 129, 74, 6, 0, 67, 12, 65, 1, 2, 0, 29, 6135, 9, 1237, 43, 8, 8936, 3, 2, 6, 2, 1, 2, 290, 46, 2, 18, 3, 9, 395, 2309, 106, 6, 12, 4, 8, 8, 9, 5991, 84, 2, 70, 2, 1, 3, 0, 3, 1, 3, 3, 2, 11, 2, 0, 2, 6, 2, 64, 2, 3, 3, 7, 2, 6, 2, 27, 2, 3, 2, 4, 2, 0, 4, 6, 2, 339, 3, 24, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 30, 2, 24, 2, 7, 1845, 30, 482, 44, 11, 6, 17, 0, 322, 29, 19, 43, 1269, 6, 2, 3, 2, 1, 2, 14, 2, 196, 60, 67, 8, 0, 1205, 3, 2, 26, 2, 1, 2, 0, 3, 0, 2, 9, 2, 3, 2, 0, 2, 0, 7, 0, 5, 0, 2, 0, 2, 0, 2, 2, 2, 1, 2, 0, 3, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 1, 2, 0, 3, 3, 2, 6, 2, 3, 2, 3, 2, 0, 2, 9, 2, 16, 6, 2, 2, 4, 2, 16, 4421, 42719, 33, 4152, 8, 221, 3, 5761, 15, 7472, 3104, 541, 1507, 4938];
        var nonASCIIidentifierChars = "\u200c\u200d\xb7\u0300-\u036f\u0387\u0483-\u0487\u0591-\u05bd\u05bf\u05c1\u05c2\u05c4\u05c5\u05c7\u0610-\u061a\u064b-\u0669\u0670\u06d6-\u06dc\u06df-\u06e4\u06e7\u06e8\u06ea-\u06ed\u06f0-\u06f9\u0711\u0730-\u074a\u07a6-\u07b0\u07c0-\u07c9\u07eb-\u07f3\u07fd\u0816-\u0819\u081b-\u0823\u0825-\u0827\u0829-\u082d\u0859-\u085b\u0898-\u089f\u08ca-\u08e1\u08e3-\u0903\u093a-\u093c\u093e-\u094f\u0951-\u0957\u0962\u0963\u0966-\u096f\u0981-\u0983\u09bc\u09be-\u09c4\u09c7\u09c8\u09cb-\u09cd\u09d7\u09e2\u09e3\u09e6-\u09ef\u09fe\u0a01-\u0a03\u0a3c\u0a3e-\u0a42\u0a47\u0a48\u0a4b-\u0a4d\u0a51\u0a66-\u0a71\u0a75\u0a81-\u0a83\u0abc\u0abe-\u0ac5\u0ac7-\u0ac9\u0acb-\u0acd\u0ae2\u0ae3\u0ae6-\u0aef\u0afa-\u0aff\u0b01-\u0b03\u0b3c\u0b3e-\u0b44\u0b47\u0b48\u0b4b-\u0b4d\u0b55-\u0b57\u0b62\u0b63\u0b66-\u0b6f\u0b82\u0bbe-\u0bc2\u0bc6-\u0bc8\u0bca-\u0bcd\u0bd7\u0be6-\u0bef\u0c00-\u0c04\u0c3c\u0c3e-\u0c44\u0c46-\u0c48\u0c4a-\u0c4d\u0c55\u0c56\u0c62\u0c63\u0c66-\u0c6f\u0c81-\u0c83\u0cbc\u0cbe-\u0cc4\u0cc6-\u0cc8\u0cca-\u0ccd\u0cd5\u0cd6\u0ce2\u0ce3\u0ce6-\u0cef\u0d00-\u0d03\u0d3b\u0d3c\u0d3e-\u0d44\u0d46-\u0d48\u0d4a-\u0d4d\u0d57\u0d62\u0d63\u0d66-\u0d6f\u0d81-\u0d83\u0dca\u0dcf-\u0dd4\u0dd6\u0dd8-\u0ddf\u0de6-\u0def\u0df2\u0df3\u0e31\u0e34-\u0e3a\u0e47-\u0e4e\u0e50-\u0e59\u0eb1\u0eb4-\u0ebc\u0ec8-\u0ecd\u0ed0-\u0ed9\u0f18\u0f19\u0f20-\u0f29\u0f35\u0f37\u0f39\u0f3e\u0f3f\u0f71-\u0f84\u0f86\u0f87\u0f8d-\u0f97\u0f99-\u0fbc\u0fc6\u102b-\u103e\u1040-\u1049\u1056-\u1059\u105e-\u1060\u1062-\u1064\u1067-\u106d\u1071-\u1074\u1082-\u108d\u108f-\u109d\u135d-\u135f\u1369-\u1371\u1712-\u1715\u1732-\u1734\u1752\u1753\u1772\u1773\u17b4-\u17d3\u17dd\u17e0-\u17e9\u180b-\u180d\u180f-\u1819\u18a9\u1920-\u192b\u1930-\u193b\u1946-\u194f\u19d0-\u19da\u1a17-\u1a1b\u1a55-\u1a5e\u1a60-\u1a7c\u1a7f-\u1a89\u1a90-\u1a99\u1ab0-\u1abd\u1abf-\u1ace\u1b00-\u1b04\u1b34-\u1b44\u1b50-\u1b59\u1b6b-\u1b73\u1b80-\u1b82\u1ba1-\u1bad\u1bb0-\u1bb9\u1be6-\u1bf3\u1c24-\u1c37\u1c40-\u1c49\u1c50-\u1c59\u1cd0-\u1cd2\u1cd4-\u1ce8\u1ced\u1cf4\u1cf7-\u1cf9\u1dc0-\u1dff\u203f\u2040\u2054\u20d0-\u20dc\u20e1\u20e5-\u20f0\u2cef-\u2cf1\u2d7f\u2de0-\u2dff\u302a-\u302f\u3099\u309a\ua620-\ua629\ua66f\ua674-\ua67d\ua69e\ua69f\ua6f0\ua6f1\ua802\ua806\ua80b\ua823-\ua827\ua82c\ua880\ua881\ua8b4-\ua8c5\ua8d0-\ua8d9\ua8e0-\ua8f1\ua8ff-\ua909\ua926-\ua92d\ua947-\ua953\ua980-\ua983\ua9b3-\ua9c0\ua9d0-\ua9d9\ua9e5\ua9f0-\ua9f9\uaa29-\uaa36\uaa43\uaa4c\uaa4d\uaa50-\uaa59\uaa7b-\uaa7d\uaab0\uaab2-\uaab4\uaab7\uaab8\uaabe\uaabf\uaac1\uaaeb-\uaaef\uaaf5\uaaf6\uabe3-\uabea\uabec\uabed\uabf0-\uabf9\ufb1e\ufe00-\ufe0f\ufe20-\ufe2f\ufe33\ufe34\ufe4d-\ufe4f\uff10-\uff19\uff3f";
        var nonASCIIidentifierStartChars = "\xaa\xb5\xba\xc0-\xd6\xd8-\xf6\xf8-\u02c1\u02c6-\u02d1\u02e0-\u02e4\u02ec\u02ee\u0370-\u0374\u0376\u0377\u037a-\u037d\u037f\u0386\u0388-\u038a\u038c\u038e-\u03a1\u03a3-\u03f5\u03f7-\u0481\u048a-\u052f\u0531-\u0556\u0559\u0560-\u0588\u05d0-\u05ea\u05ef-\u05f2\u0620-\u064a\u066e\u066f\u0671-\u06d3\u06d5\u06e5\u06e6\u06ee\u06ef\u06fa-\u06fc\u06ff\u0710\u0712-\u072f\u074d-\u07a5\u07b1\u07ca-\u07ea\u07f4\u07f5\u07fa\u0800-\u0815\u081a\u0824\u0828\u0840-\u0858\u0860-\u086a\u0870-\u0887\u0889-\u088e\u08a0-\u08c9\u0904-\u0939\u093d\u0950\u0958-\u0961\u0971-\u0980\u0985-\u098c\u098f\u0990\u0993-\u09a8\u09aa-\u09b0\u09b2\u09b6-\u09b9\u09bd\u09ce\u09dc\u09dd\u09df-\u09e1\u09f0\u09f1\u09fc\u0a05-\u0a0a\u0a0f\u0a10\u0a13-\u0a28\u0a2a-\u0a30\u0a32\u0a33\u0a35\u0a36\u0a38\u0a39\u0a59-\u0a5c\u0a5e\u0a72-\u0a74\u0a85-\u0a8d\u0a8f-\u0a91\u0a93-\u0aa8\u0aaa-\u0ab0\u0ab2\u0ab3\u0ab5-\u0ab9\u0abd\u0ad0\u0ae0\u0ae1\u0af9\u0b05-\u0b0c\u0b0f\u0b10\u0b13-\u0b28\u0b2a-\u0b30\u0b32\u0b33\u0b35-\u0b39\u0b3d\u0b5c\u0b5d\u0b5f-\u0b61\u0b71\u0b83\u0b85-\u0b8a\u0b8e-\u0b90\u0b92-\u0b95\u0b99\u0b9a\u0b9c\u0b9e\u0b9f\u0ba3\u0ba4\u0ba8-\u0baa\u0bae-\u0bb9\u0bd0\u0c05-\u0c0c\u0c0e-\u0c10\u0c12-\u0c28\u0c2a-\u0c39\u0c3d\u0c58-\u0c5a\u0c5d\u0c60\u0c61\u0c80\u0c85-\u0c8c\u0c8e-\u0c90\u0c92-\u0ca8\u0caa-\u0cb3\u0cb5-\u0cb9\u0cbd\u0cdd\u0cde\u0ce0\u0ce1\u0cf1\u0cf2\u0d04-\u0d0c\u0d0e-\u0d10\u0d12-\u0d3a\u0d3d\u0d4e\u0d54-\u0d56\u0d5f-\u0d61\u0d7a-\u0d7f\u0d85-\u0d96\u0d9a-\u0db1\u0db3-\u0dbb\u0dbd\u0dc0-\u0dc6\u0e01-\u0e30\u0e32\u0e33\u0e40-\u0e46\u0e81\u0e82\u0e84\u0e86-\u0e8a\u0e8c-\u0ea3\u0ea5\u0ea7-\u0eb0\u0eb2\u0eb3\u0ebd\u0ec0-\u0ec4\u0ec6\u0edc-\u0edf\u0f00\u0f40-\u0f47\u0f49-\u0f6c\u0f88-\u0f8c\u1000-\u102a\u103f\u1050-\u1055\u105a-\u105d\u1061\u1065\u1066\u106e-\u1070\u1075-\u1081\u108e\u10a0-\u10c5\u10c7\u10cd\u10d0-\u10fa\u10fc-\u1248\u124a-\u124d\u1250-\u1256\u1258\u125a-\u125d\u1260-\u1288\u128a-\u128d\u1290-\u12b0\u12b2-\u12b5\u12b8-\u12be\u12c0\u12c2-\u12c5\u12c8-\u12d6\u12d8-\u1310\u1312-\u1315\u1318-\u135a\u1380-\u138f\u13a0-\u13f5\u13f8-\u13fd\u1401-\u166c\u166f-\u167f\u1681-\u169a\u16a0-\u16ea\u16ee-\u16f8\u1700-\u1711\u171f-\u1731\u1740-\u1751\u1760-\u176c\u176e-\u1770\u1780-\u17b3\u17d7\u17dc\u1820-\u1878\u1880-\u18a8\u18aa\u18b0-\u18f5\u1900-\u191e\u1950-\u196d\u1970-\u1974\u1980-\u19ab\u19b0-\u19c9\u1a00-\u1a16\u1a20-\u1a54\u1aa7\u1b05-\u1b33\u1b45-\u1b4c\u1b83-\u1ba0\u1bae\u1baf\u1bba-\u1be5\u1c00-\u1c23\u1c4d-\u1c4f\u1c5a-\u1c7d\u1c80-\u1c88\u1c90-\u1cba\u1cbd-\u1cbf\u1ce9-\u1cec\u1cee-\u1cf3\u1cf5\u1cf6\u1cfa\u1d00-\u1dbf\u1e00-\u1f15\u1f18-\u1f1d\u1f20-\u1f45\u1f48-\u1f4d\u1f50-\u1f57\u1f59\u1f5b\u1f5d\u1f5f-\u1f7d\u1f80-\u1fb4\u1fb6-\u1fbc\u1fbe\u1fc2-\u1fc4\u1fc6-\u1fcc\u1fd0-\u1fd3\u1fd6-\u1fdb\u1fe0-\u1fec\u1ff2-\u1ff4\u1ff6-\u1ffc\u2071\u207f\u2090-\u209c\u2102\u2107\u210a-\u2113\u2115\u2118-\u211d\u2124\u2126\u2128\u212a-\u2139\u213c-\u213f\u2145-\u2149\u214e\u2160-\u2188\u2c00-\u2ce4\u2ceb-\u2cee\u2cf2\u2cf3\u2d00-\u2d25\u2d27\u2d2d\u2d30-\u2d67\u2d6f\u2d80-\u2d96\u2da0-\u2da6\u2da8-\u2dae\u2db0-\u2db6\u2db8-\u2dbe\u2dc0-\u2dc6\u2dc8-\u2dce\u2dd0-\u2dd6\u2dd8-\u2dde\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303c\u3041-\u3096\u309b-\u309f\u30a1-\u30fa\u30fc-\u30ff\u3105-\u312f\u3131-\u318e\u31a0-\u31bf\u31f0-\u31ff\u3400-\u4dbf\u4e00-\ua48c\ua4d0-\ua4fd\ua500-\ua60c\ua610-\ua61f\ua62a\ua62b\ua640-\ua66e\ua67f-\ua69d\ua6a0-\ua6ef\ua717-\ua71f\ua722-\ua788\ua78b-\ua7ca\ua7d0\ua7d1\ua7d3\ua7d5-\ua7d9\ua7f2-\ua801\ua803-\ua805\ua807-\ua80a\ua80c-\ua822\ua840-\ua873\ua882-\ua8b3\ua8f2-\ua8f7\ua8fb\ua8fd\ua8fe\ua90a-\ua925\ua930-\ua946\ua960-\ua97c\ua984-\ua9b2\ua9cf\ua9e0-\ua9e4\ua9e6-\ua9ef\ua9fa-\ua9fe\uaa00-\uaa28\uaa40-\uaa42\uaa44-\uaa4b\uaa60-\uaa76\uaa7a\uaa7e-\uaaaf\uaab1\uaab5\uaab6\uaab9-\uaabd\uaac0\uaac2\uaadb-\uaadd\uaae0-\uaaea\uaaf2-\uaaf4\uab01-\uab06\uab09-\uab0e\uab11-\uab16\uab20-\uab26\uab28-\uab2e\uab30-\uab5a\uab5c-\uab69\uab70-\uabe2\uac00-\ud7a3\ud7b0-\ud7c6\ud7cb-\ud7fb\uf900-\ufa6d\ufa70-\ufad9\ufb00-\ufb06\ufb13-\ufb17\ufb1d\ufb1f-\ufb28\ufb2a-\ufb36\ufb38-\ufb3c\ufb3e\ufb40\ufb41\ufb43\ufb44\ufb46-\ufbb1\ufbd3-\ufd3d\ufd50-\ufd8f\ufd92-\ufdc7\ufdf0-\ufdfb\ufe70-\ufe74\ufe76-\ufefc\uff21-\uff3a\uff41-\uff5a\uff66-\uffbe\uffc2-\uffc7\uffca-\uffcf\uffd2-\uffd7\uffda-\uffdc";
        var reservedWords = {3: "abstract boolean byte char class double enum export extends final float goto implements import int interface long native package private protected public short static super synchronized throws transient volatile", 5: "class enum extends super const export import", 6: "enum", strict: "implements interface let package private protected public static yield", strictBind: "eval arguments"};
        var ecma5AndLessKeywords = "break case catch continue debugger default do else finally for function if return switch throw try var while with null true false instanceof typeof void delete new in this";
        var keywords$1 = {5: ecma5AndLessKeywords, "5module": ecma5AndLessKeywords + " export import", 6: ecma5AndLessKeywords + " const class extends export import super"};
        var keywordRelationalOperator = /^in(stanceof)?$/;
        var nonASCIIidentifierStart = new RegExp("[" + nonASCIIidentifierStartChars + "]");
        var nonASCIIidentifier = new RegExp("[" + nonASCIIidentifierStartChars + nonASCIIidentifierChars + "]");
        function isInAstralSet(code, set)
        {
            var pos = 0x10000;
            for (var i = 0; i < set.length; i += 2)
            {
                pos += set[i];
                if (pos > code)
                {
                    return false;
                }
                pos += set[i + 1];
                if (pos >= code)
                {
                    return true;
                }
            }
        }
        function isIdentifierStart(code, astral)
        {
            if (code < 65)
            {
                return code === 36;
            }
            if (code < 91)
            {
                return true;
            }
            if (code < 97)
            {
                return code === 95;
            }
            if (code < 123)
            {
                return true;
            }
            if (code <= 0xffff)
            {
                return code >= 0xaa && nonASCIIidentifierStart.test(String.fromCharCode(code));
            }
            if (astral === false)
            {
                return false;
            }
            return isInAstralSet(code, astralIdentifierStartCodes);
        }
        function isIdentifierChar(code, astral)
        {
            if (code < 48)
            {
                return code === 36;
            }
            if (code < 58)
            {
                return true;
            }
            if (code < 65)
            {
                return false;
            }
            if (code < 91)
            {
                return true;
            }
            if (code < 97)
            {
                return code === 95;
            }
            if (code < 123)
            {
                return true;
            }
            if (code <= 0xffff)
            {
                return code >= 0xaa && nonASCIIidentifier.test(String.fromCharCode(code));
            }
            if (astral === false)
            {
                return false;
            }
            return isInAstralSet(code, astralIdentifierStartCodes) || isInAstralSet(code, astralIdentifierCodes);
        }
        var ref = Object.prototype;
        var hasOwnProperty = ref.hasOwnProperty;
        var toString = ref.toString;
        var hasOwn = Object.hasOwn ||         function(obj, propName)
        {
            return hasOwnProperty.call(obj, propName);
        };
        var isArray = Array.isArray ||         function(obj)
        {
            return toString.call(obj) === "[object Array]";
        };
        function wordsRegexp(words)
        {
            return new RegExp("^(?:" + words.replace(/ /g, "|") + ")$");
        }
        function codePointToString(code)
        {
            if (code <= 0xFFFF)
            {
                return String.fromCharCode(code);
            }
            code -= 0x10000;
            return String.fromCharCode((code >> 10) + 0xD800, (code & 1023) + 0xDC00);
        }
        var loneSurrogate = /(?:[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF])/;
        var TokenType =         function TokenType(label, conf)
        {
            if (conf === void 0)
                conf = {};
            this.label = label;
            this.keyword = conf.keyword;
            this.beforeExpr = !!conf.beforeExpr;
            this.startsExpr = !!conf.startsExpr;
            this.isLoop = !!conf.isLoop;
            this.isAssign = !!conf.isAssign;
            this.prefix = !!conf.prefix;
            this.postfix = !!conf.postfix;
            this.binop = conf.binop || null;
            this.updateContext = null;
            this.preprocess = !!conf.preprocess;
        };
        function binop(name, prec)
        {
            return new TokenType(name, {beforeExpr: true, binop: prec, preprocess: true});
        }
        var beforeExpr = {beforeExpr: true},
            startsExpr = {startsExpr: true};
        var keywords = {};
        function kw(name, options)
        {
            if (options === void 0)
                options = {};
            options.keyword = name;
            return keywords[name] = new TokenType(name, options);
        }
        var types$1 = {num: new TokenType("num", startsExpr), regexp: new TokenType("regexp", startsExpr), string: new TokenType("string", startsExpr), name: new TokenType("name", startsExpr), privateId: new TokenType("privateId", startsExpr), eof: new TokenType("eof"), eol: new TokenType("eol"), bracketL: new TokenType("[", {beforeExpr: true, startsExpr: true}), bracketR: new TokenType("]"), braceL: new TokenType("{", {beforeExpr: true, startsExpr: true}), braceR: new TokenType("}"), parenL: new TokenType("(", {beforeExpr: true, startsExpr: true}), parenR: new TokenType(")"), comma: new TokenType(",", beforeExpr), semi: new TokenType(";", beforeExpr), colon: new TokenType(":", beforeExpr), dot: new TokenType("."), question: new TokenType("?", beforeExpr), questionDot: new TokenType("?."), arrow: new TokenType("=>", beforeExpr), template: new TokenType("template"), invalidTemplate: new TokenType("invalidTemplate"), ellipsis: new TokenType("...", beforeExpr), backQuote: new TokenType("`", startsExpr), dollarBraceL: new TokenType("${", {beforeExpr: true, startsExpr: true}), eq: new TokenType("=", {beforeExpr: true, isAssign: true}), assign: new TokenType("_=", {beforeExpr: true, isAssign: true}), incDec: new TokenType("++/--", {prefix: true, postfix: true, startsExpr: true}), prefix: new TokenType("!/~", {beforeExpr: true, prefix: true, startsExpr: true, preprocess: true}), logicalOR: binop("||", 1), logicalAND: binop("&&", 2), bitwiseOR: binop("|", 3), bitwiseXOR: binop("^", 4), bitwiseAND: binop("&", 5), equality: binop("==/!=/===/!==", 6), relational: binop("</>/<=/>=", 7), bitShift: binop("<</>>/>>>", 8), plusMin: new TokenType("+/-", {beforeExpr: true, binop: 9, prefix: true, startsExpr: true, preprocess: true}), modulo: binop("%", 10), star: binop("*", 10), slash: binop("/", 10), starstar: new TokenType("**", {beforeExpr: true}), coalesce: binop("??", 1), _break: kw("break"), _case: kw("case", beforeExpr), _catch: kw("catch"), _continue: kw("continue"), _debugger: kw("debugger"), _default: kw("default", beforeExpr), _do: kw("do", {isLoop: true, beforeExpr: true}), _else: kw("else", beforeExpr), _finally: kw("finally"), _for: kw("for", {isLoop: true}), _function: kw("function", startsExpr), _if: kw("if"), _return: kw("return", beforeExpr), _switch: kw("switch"), _throw: kw("throw", beforeExpr), _try: kw("try"), _var: kw("var"), _const: kw("const"), _while: kw("while", {isLoop: true}), _with: kw("with"), _new: kw("new", {beforeExpr: true, startsExpr: true}), _this: kw("this", startsExpr), _super: kw("super", startsExpr), _class: kw("class", startsExpr), _extends: kw("extends", beforeExpr), _export: kw("export"), _import: kw("import", startsExpr), _null: kw("null", startsExpr), _true: kw("true", startsExpr), _false: kw("false", startsExpr), _in: kw("in", {beforeExpr: true, binop: 7}), _instanceof: kw("instanceof", {beforeExpr: true, binop: 7}), _typeof: kw("typeof", {beforeExpr: true, prefix: true, startsExpr: true}), _void: kw("void", {beforeExpr: true, prefix: true, startsExpr: true}), _delete: kw("delete", {beforeExpr: true, prefix: true, startsExpr: true})};
        var preKeywords = {};
        function pkw(name, options)
        {
            if (options === void 0)
                options = {};
            options.keyword = name;
            return preKeywords[name] = new TokenType(name, options);
        }
        var preTypes = {_preDefine: pkw("define"), _preUndef: pkw("undef"), _preIfdef: pkw("ifdef"), _preIfndef: pkw("ifndef"), _preIf: pkw("if"), _preElse: pkw("else"), _preEndif: pkw("endif"), _preElseIf: pkw("elif"), _preElseIfTrue: new TokenType("elif (True)"), _preElseIfFalse: new TokenType("elif (false)"), _prePragma: pkw("pragma"), _preDefined: pkw("defined"), _preBackslash: new TokenType("\\"), _preError: pkw("error"), _preWarning: pkw("warning"), _preprocessParamItem: new TokenType("preprocessParamItem", {type: "preprocessParamItem"}), _preprocessSkipLine: new TokenType("skipLine", {type: "skipLine"}), _preInclude: pkw("include")};
        var isKeywordPreprocessor = wordsRegexp(Object.keys(preKeywords).join(" "));
        var objjKeywords = {};
        function okw(name, options)
        {
            if (options === void 0)
                options = {};
            options.keyword = name;
            return objjKeywords[name] = new TokenType(name, options);
        }
        var objjTypes = {_filename: new TokenType("filename"), _action: okw("IBAction"), _outlet: okw("IBOutlet"), _unsigned: okw("unsigned"), _signed: okw("signed"), _byte: okw("byte"), _char: okw("char"), _short: okw("short"), _int: okw("int"), _long: okw("long"), _id: okw("id"), _float: okw("float"), _boolean: okw("BOOL"), _SEL: okw("SEL"), _double: okw("double")};
        var objjAtKeywords = {};
        function oakw(name, options)
        {
            if (options === void 0)
                options = {};
            options.keyword = name;
            return objjAtKeywords[name] = new TokenType(name, options);
        }
        var objjAtTypes = {_implementation: oakw("implementation"), _outlet: oakw("outlet"), _accessors: oakw("accessors"), _end: oakw("end"), _import: oakw("import"), _action: oakw("action"), _selector: oakw("selector"), _class: oakw("class"), _global: oakw("global"), _ref: oakw("ref"), _deref: oakw("deref"), _protocol: oakw("protocol"), _optional: oakw("optional"), _required: oakw("required"), _interface: oakw("interface"), _typedef: oakw("typedef"), _dictionaryLiteral: okw("{"), _arrayLiteral: okw("[")};
        var lineBreak = /\r\n?|\n|\u2028|\u2029/;
        var lineBreakG = new RegExp(lineBreak.source, "g");
        function isNewLine(code)
        {
            return code === 10 || code === 13 || code === 0x2028 || code === 0x2029;
        }
        function nextLineBreak(code, from, end)
        {
            if (end === void 0)
                end = code.length;
            for (var i = from; i < end; i++)
            {
                var next = code.charCodeAt(i);
                if (isNewLine(next))
                {
                    return i < end - 1 && next === 13 && code.charCodeAt(i + 1) === 10 ? i + 2 : i + 1;
                }
            }
            return -1;
        }
        var nonASCIIwhitespace = /[\u1680\u2000-\u200a\u202f\u205f\u3000\ufeff]/;
        var skipWhiteSpace = /(?:\s|\/\/.*|\/\*[^]*?\*\/)*/g;
        var Position =         function Position(line, col)
        {
            this.line = line;
            this.column = col;
        };
        Position.prototype.offset =         function offset(n)
        {
            return new Position(this.line, this.column + n);
        };
        var SourceLocation =         function SourceLocation(p, start, end)
        {
            this.start = start;
            this.end = end;
            if (p.sourceFile !== null)
            {
                this.source = p.sourceFile;
            }
        };
        function getLineInfo(input, offset)
        {
            for (var line = 1, cur = 0; ; )
            {
                var nextBreak = nextLineBreak(input, cur, offset);
                if (nextBreak < 0)
                {
                    return new Position(line, offset - cur);
                }
                ++line;
                cur = nextBreak;
            }
        }
        var defaultOptions = {ecmaVersion: null, sourceType: "script", onInsertedSemicolon: null, onTrailingComma: null, allowReserved: null, allowReturnOutsideFunction: false, allowImportExportEverywhere: false, allowAwaitOutsideFunction: null, allowSuperOutsideMethod: null, allowHashBang: true, locations: false, onToken: null, onComment: null, ranges: false, program: null, sourceFile: null, directSourceFile: null, preserveParens: false, objj: true, preprocess: true, preprocessGetIncludeFile: defaultGetIncludeFile, preprocessAddMacro: null, preprocessGetMacro: null, preprocessUndefineMacro: null, preprocessIsMacro: null, macros: null, preIncludeFiles: null};
        function defaultGetIncludeFile(filename)
        {
            return {include: "#define FOO(x) x\n", sourceFile: filename};
        }
        var warnedAboutEcmaVersion = false;
        function getOptions(opts)
        {
            var options = {};
            for (var opt in defaultOptions)
            {
                options[opt] = opts && hasOwn(opts, opt) ? opts[opt] : defaultOptions[opt];
            }
            if (options.ecmaVersion === "latest")
            {
                options.ecmaVersion = 1e8;
            }
            else if (options.ecmaVersion == null)
            {
                if (!warnedAboutEcmaVersion && typeof console === "object" && console.warn)
                {
                    warnedAboutEcmaVersion = true;
                    console.warn("Since Acorn 8.0.0, options.ecmaVersion is required.\nDefaulting to 2020, but this will stop working in the future.");
                }
                options.ecmaVersion = 11;
            }
            else if (options.ecmaVersion >= 2015)
            {
                options.ecmaVersion -= 2009;
            }
            if (options.allowReserved == null)
            {
                options.allowReserved = options.ecmaVersion < 5;
            }
            if (opts.allowHashBang == null)
            {
                options.allowHashBang = options.allowHashBang || options.ecmaVersion >= 14;
            }
            if (isArray(options.onToken))
            {
                var tokens = options.onToken;
                options.onToken =                 function(token)
                {
                    return tokens.push(token);
                };
            }
            if (isArray(options.onComment))
            {
                options.onComment = pushComment(options, options.onComment);
            }
            return options;
        }
        function pushComment(options, array)
        {
            return             function(block, text, start, end, startLoc, endLoc)
            {
                var comment = {type: block ? "Block" : "Line", value: text, start: start, end: end};
                if (options.locations)
                {
                    comment.loc = new SourceLocation(this, startLoc, endLoc);
                }
                if (options.ranges)
                {
                    comment.range = [start, end];
                }
                array.push(comment);
            };
        }
        var SCOPE_TOP = 1,
            SCOPE_FUNCTION = 2,
            SCOPE_ASYNC = 4,
            SCOPE_GENERATOR = 8,
            SCOPE_ARROW = 16,
            SCOPE_SIMPLE_CATCH = 32,
            SCOPE_SUPER = 64,
            SCOPE_DIRECT_SUPER = 128,
            SCOPE_CLASS_STATIC_BLOCK = 256,
            SCOPE_OBJJ_METHOD = 512,
            SCOPE_VAR = SCOPE_TOP | SCOPE_FUNCTION | SCOPE_CLASS_STATIC_BLOCK;
        function functionFlags(async, generator)
        {
            return SCOPE_FUNCTION | (async ? SCOPE_ASYNC : 0) | (generator ? SCOPE_GENERATOR : 0);
        }
        var BIND_NONE = 0,
            BIND_VAR = 1,
            BIND_LEXICAL = 2,
            BIND_FUNCTION = 3,
            BIND_SIMPLE_CATCH = 4,
            BIND_OUTSIDE = 5;
        var Macro =         function Macro(ident, macro, parameters, start, isArgument, parameterScope, variadicName, locationOffset, aSourceFile)
        {
            this.identifier = ident;
            if (macro != null)
            {
                this.macro = macro;
            }
            if (parameters)
            {
                this.parameters = parameters;
            }
            if (start != null)
            {
                this.start = start;
            }
            if (isArgument)
            {
                this.isArgument = true;
            }
            if (parameterScope)
            {
                this.parameterScope = parameterScope;
            }
            if (variadicName)
            {
                this.variadicName = variadicName;
            }
            if (locationOffset)
            {
                this.locationOffset = locationOffset;
            }
            if (aSourceFile)
            {
                this.sourceFile = aSourceFile;
            }
        };
        Macro.prototype.isParameterFunction =         function isParameterFunction()
        {
            return this.isParameterFunctionVar || (this.isParameterFunctionVar = wordsRegexp((this.parameters || []).join(" ")));
        };
        var Parser =         function Parser(options, input, startPos)
        {
            this.options = options = getOptions(options);
            this.sourceFile = options.sourceFile;
            this.keywords = wordsRegexp(keywords$1[options.ecmaVersion >= 6 ? 6 : options.sourceType === "module" ? "5module" : 5]);
            var reserved = "";
            if (options.allowReserved !== true)
            {
                reserved = reservedWords[options.ecmaVersion >= 6 ? 6 : options.ecmaVersion === 5 ? 5 : 3];
                if (options.sourceType === "module")
                {
                    reserved += " await";
                }
            }
            this.reservedWords = wordsRegexp(reserved);
            var reservedStrict = (reserved ? reserved + " " : "") + reservedWords.strict;
            this.reservedWordsStrict = wordsRegexp(reservedStrict);
            this.reservedWordsStrictBind = wordsRegexp(reservedStrict + " " + reservedWords.strictBind);
            this.input = String(input);
            this.containsEsc = false;
            if (startPos)
            {
                this.pos = startPos;
                this.lineStart = this.input.lastIndexOf("\n", startPos - 1) + 1;
                this.curLine = this.input.slice(0, this.lineStart).split(lineBreak).length;
            }
            else
            {
                this.pos = this.lineStart = 0;
                this.curLine = 1;
            }
            this.type = types$1.eof;
            this.value = null;
            this.start = this.end = this.pos;
            this.startLoc = this.endLoc = this.curPosition();
            this.lastTokEndLoc = this.lastTokStartLoc = null;
            this.lastTokStart = this.lastTokEnd = this.pos;
            this.context = this.initialContext();
            this.exprAllowed = true;
            this.inModule = options.sourceType === "module";
            this.strict = this.inModule || this.strictDirective(this.pos);
            this.potentialArrowAt = -1;
            this.potentialArrowInForAwait = false;
            this.yieldPos = this.awaitPos = this.awaitIdentPos = 0;
            this.labels = [];
            this.undefinedExports = Object.create(null);
            if (this.pos === 0 && options.allowHashBang && this.input.slice(0, 2) === "#!")
            {
                this.skipLineComment(2);
            }
            this.scopeStack = [];
            this.enterScope(SCOPE_TOP);
            this.regexpState = null;
            this.privateNameStack = [];
            this.preprocessParameterScope = null;
            this.preTokParameterScope = null;
            this.preprocessMacroParameterListMode = false;
            this.preprocessIsParsingPreprocess = false;
            this.preprocessStack = [];
            this.preprocessStackLastItem = null;
            this.preprocessOnlyTransformArgumentsForLastToken = null;
            this.preprocessDontConcatenate = false;
            this.preNotSkipping = true;
            this.preConcatenating = false;
            this.preIfLevel = [];
            this.preType = null;
            this.preVal = null;
            this.preStart = null;
            this.preEnd = null;
            this.preLastStart = null;
            this.preLastEnd = null;
            this.localLastEnd = null;
            this.firstEnd = null;
            this.preInput = null;
            this.objjInFunction = null;
            this.objjLabels = null;
            this.objjFunctionIsAsync = null;
            this.objjStrict = null;
            this.nodeMessageSendObjectExpression = null;
            this.tokFirstStart = null;
            this.firstTokEnd = null;
            this.tokMacroOffset = null;
            this.tokPosMacroOffset = null;
            this.lastTokMacroOffset = null;
            function macrosMakeBuiltin(name, macro, endPos)
            {
                return new Macro(name, macro, null, endPos - name.length);
            }
            if (this.options.preprocess)
            {
                var self = this;
                var macros = Object.create(null);
                var macrosIsRegEx;
                if (this.options.preprocessAddMacro == null)
                {
                    this.options.preprocessAddMacro =                     function(macro)
                    {
                        macros[macro.identifier] = macro;
                        macrosIsRegEx = null;
                    };
                }
                if (this.options.preprocessGetMacro == null)
                {
                    this.options.preprocessGetMacro =                     function(macroIdentifier)
                    {
                        return macros[macroIdentifier];
                    };
                }
                if (this.options.preprocessUndefineMacro == null)
                {
                    this.options.preprocessUndefineMacro =                     function defaultUndefineMacro(macroIdentifier)
                    {
                        delete macros[macroIdentifier];
                        macrosIsRegEx = null;
                    };
                }
                if (this.options.preprocessIsMacro == null)
                {
                    this.options.preprocessIsMacro =                     function(macroIdentifier)
                    {
                        return (macrosIsRegEx || (macrosIsRegEx = wordsRegexp(Object.keys(macros).concat(Object.keys(self.macrosBuiltinMacros).filter(                        function(key)
                        {
                            return this[key]().macro != null;
                        }, self.macrosBuiltinMacros)).join(" ")))).test(macroIdentifier);
                    };
                }
                this.macrosBuiltinMacros = {1:                 function()
                {
                    return macrosMakeBuiltin("__OBJJ__", self.options.objj ? "1" : null, self.pos);
                }};
                this.macrosBuiltinMacros["__" + "BROWSER" + "__"] =                 function()
                {
                    return macrosMakeBuiltin("__BROWSER__", typeof window !== "undefined" ? "1" : null, self.pos);
                };
                this.macrosBuiltinMacros["__" + "LINE" + "__"] =                 function()
                {
                    return macrosMakeBuiltin("__LINE__", String(self.options.locations ? self.curLine : getLineInfo(self.input, self.pos).line), self.pos);
                };
                this.macrosBuiltinMacros["__" + "DATE" + "__"] =                 function()
                {
                    var date,
                        day;
                    return macrosMakeBuiltin("__DATE__", (date = new Date(), day = String(date.getDate()), ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"][date.getMonth()] + (day.length > 1 ? " " : "  ") + day + " " + date.getFullYear()), self.pos);
                };
                this.macrosBuiltinMacros["__" + "TIME" + "__"] =                 function()
                {
                    var date;
                    return macrosMakeBuiltin("__TIME__", (date = new Date(), ("0" + date.getHours()).slice(-2) + ":" + ("0" + date.getMinutes()).slice(-2) + ":" + ("0" + date.getSeconds()).slice(-2)), self.pos);
                };
                if (this.options.macros)
                {
                    this.defineMacros(this.options.macros);
                }
                var preIncludeFiles = this.options.preIncludeFiles;
                if (preIncludeFiles && preIncludeFiles.length)
                {
                    for (var i = preIncludeFiles.length - 1; i >= 0; i--)
                    {
                        var preIncludeFile = preIncludeFiles[i];
                        var preIncludeMacro = new Macro(null, preIncludeFile.include, null, 0, false, null, false, null, preIncludeFile.sourceFile);
                        this.pushMacroToStack(preIncludeMacro, preIncludeMacro.macro, 0, null, null, this.pos, null, true);
                        this.skipSpace();
                    }
                }
            }
        };
        var prototypeAccessors = {inFunction: {configurable: true}, inGenerator: {configurable: true}, inAsync: {configurable: true}, canAwait: {configurable: true}, allowSuper: {configurable: true}, allowDirectSuper: {configurable: true}, treatFunctionsAsVar: {configurable: true}, allowNewDotTarget: {configurable: true}, inClassStaticBlock: {configurable: true}};
        Parser.prototype.parse =         function parse()
        {
            var node = this.options.program || this.startNode();
            this.nextToken();
            return this.parseTopLevel(node);
        };
        prototypeAccessors.inFunction.get =         function()
        {
            return (this.currentVarScope().flags & SCOPE_FUNCTION) > 0;
        };
        prototypeAccessors.inGenerator.get =         function()
        {
            return (this.currentVarScope().flags & SCOPE_GENERATOR) > 0 && !this.currentVarScope().inClassFieldInit;
        };
        prototypeAccessors.inAsync.get =         function()
        {
            return (this.currentVarScope().flags & SCOPE_ASYNC) > 0 && !this.currentVarScope().inClassFieldInit;
        };
        prototypeAccessors.canAwait.get =         function()
        {
            for (var i = this.scopeStack.length - 1; i >= 0; i--)
            {
                var scope = this.scopeStack[i];
                if (scope.inClassFieldInit || scope.flags & SCOPE_CLASS_STATIC_BLOCK)
                {
                    return false;
                }
                if (scope.flags & SCOPE_FUNCTION)
                {
                    return (scope.flags & SCOPE_ASYNC) > 0;
                }
            }
            return this.inModule && this.options.ecmaVersion >= 13 || this.options.allowAwaitOutsideFunction;
        };
        prototypeAccessors.allowSuper.get =         function()
        {
            var ref = this.currentThisScope();
            var flags = ref.flags;
            var inClassFieldInit = ref.inClassFieldInit;
            return (flags & SCOPE_SUPER) > 0 || inClassFieldInit || this.options.allowSuperOutsideMethod || this.options.objj && (this.currentObjJMethodScope().flags & SCOPE_OBJJ_METHOD) > 0;
        };
        prototypeAccessors.allowDirectSuper.get =         function()
        {
            return (this.currentThisScope().flags & SCOPE_DIRECT_SUPER) > 0;
        };
        prototypeAccessors.treatFunctionsAsVar.get =         function()
        {
            return this.treatFunctionsAsVarInScope(this.currentScope());
        };
        prototypeAccessors.allowNewDotTarget.get =         function()
        {
            var ref = this.currentThisScope();
            var flags = ref.flags;
            var inClassFieldInit = ref.inClassFieldInit;
            return (flags & (SCOPE_FUNCTION | SCOPE_CLASS_STATIC_BLOCK)) > 0 || inClassFieldInit;
        };
        prototypeAccessors.inClassStaticBlock.get =         function()
        {
            return (this.currentVarScope().flags & SCOPE_CLASS_STATIC_BLOCK) > 0;
        };
        Parser.extend =         function extend()
        {
            var plugins = [],
                len = arguments.length;
            while (len--)
                plugins[len] = arguments[len];
            var cls = this;
            for (var i = 0; i < plugins.length; i++)
            {
                cls = plugins[i](cls);
            }
            return cls;
        };
        Parser.parse =         function parse(input, options)
        {
            return new this(options, input).parse();
        };
        Parser.parseExpressionAt =         function parseExpressionAt(input, pos, options)
        {
            var parser = new this(options, input, pos);
            parser.nextToken();
            return parser.parseExpression();
        };
        Parser.tokenizer =         function tokenizer(input, options)
        {
            return new this(options, input);
        };
        Object.defineProperties(Parser.prototype, prototypeAccessors);
        var pp$c = Parser.prototype;
        var literal = /^(?:'((?:\\.|[^'\\])*?)'|"((?:\\.|[^"\\])*?)")/;
        pp$c.strictDirective =         function(start)
        {
            if (this.options.ecmaVersion < 5)
            {
                return false;
            }
            for (; ; )
            {
                skipWhiteSpace.lastIndex = start;
                start += skipWhiteSpace.exec(this.input)[0].length;
                var match = literal.exec(this.input.slice(start));
                if (!match)
                {
                    return false;
                }
                if ((match[1] || match[2]) === "use strict")
                {
                    skipWhiteSpace.lastIndex = start + match[0].length;
                    var spaceAfter = skipWhiteSpace.exec(this.input),
                        end = spaceAfter.index + spaceAfter[0].length;
                    var next = this.input.charAt(end);
                    return next === ";" || next === "}" || lineBreak.test(spaceAfter[0]) && !(/[(`.[+\-/*%<>=,?^&]/.test(next) || next === "!" && this.input.charAt(end + 1) === "=");
                }
                start += match[0].length;
                skipWhiteSpace.lastIndex = start;
                start += skipWhiteSpace.exec(this.input)[0].length;
                if (this.input[start] === ";")
                {
                    start++;
                }
            }
        };
        pp$c.eat =         function(type)
        {
            if (this.type === type)
            {
                this.next();
                return true;
            }
            else
            {
                return false;
            }
        };
        pp$c.isContextual =         function(name)
        {
            return this.type === types$1.name && this.value === name && !this.containsEsc;
        };
        pp$c.eatContextual =         function(name)
        {
            if (!this.isContextual(name))
            {
                return false;
            }
            this.next();
            return true;
        };
        pp$c.expectContextual =         function(name)
        {
            if (!this.eatContextual(name))
            {
                this.unexpected();
            }
        };
        pp$c.canInsertSemicolon =         function()
        {
            return this.type === types$1.eof || this.type === types$1.braceR || lineBreak.test(this.lastEndInput.slice(this.lastTokEnd, this.lastEndOfFile || this.tokFirstStart)) || this.lastEndOfFile != null || this.nodeMessageSendObjectExpression && this.nodeMessageSendObjectExpression.canInsertSemicolonBefore && this.options.objj;
        };
        pp$c.insertSemicolon =         function()
        {
            if (this.canInsertSemicolon())
            {
                if (this.options.onInsertedSemicolon)
                {
                    this.options.onInsertedSemicolon(this.lastTokEnd, this.lastTokEndLoc);
                }
                return true;
            }
        };
        pp$c.semicolon =         function()
        {
            if (!this.eat(types$1.semi) && !this.insertSemicolon())
            {
                this.nodeMessageSendObjectExpression ? this.raise(this.options.objj && this.nodeMessageSendObjectExpression.start || this.start, "Expected a semicolon") : this.unexpected();
            }
        };
        pp$c.afterTrailingComma =         function(tokType, notNext)
        {
            if (this.type === tokType)
            {
                if (this.options.onTrailingComma)
                {
                    this.options.onTrailingComma(this.lastTokStart, this.lastTokStartLoc);
                }
                if (!notNext)
                {
                    this.next();
                }
                return true;
            }
        };
        pp$c.expect =         function(type)
        {
            this.eat(type) || this.unexpected();
        };
        pp$c.unexpected =         function(pos)
        {
            this.raise(pos != null ? pos : this.start, "Unexpected token");
        };
        var DestructuringErrors =         function DestructuringErrors()
        {
            this.shorthandAssign = this.trailingComma = this.parenthesizedAssign = this.parenthesizedBind = this.doubleProto = -1;
        };
        pp$c.checkPatternErrors =         function(refDestructuringErrors, isAssign)
        {
            if (!refDestructuringErrors)
            {
                return;
            }
            if (refDestructuringErrors.trailingComma > -1)
            {
                this.raiseRecoverable(refDestructuringErrors.trailingComma, "Comma is not permitted after the rest element");
            }
            var parens = isAssign ? refDestructuringErrors.parenthesizedAssign : refDestructuringErrors.parenthesizedBind;
            if (parens > -1)
            {
                this.raiseRecoverable(parens, isAssign ? "Assigning to rvalue" : "Parenthesized pattern");
            }
        };
        pp$c.checkExpressionErrors =         function(refDestructuringErrors, andThrow)
        {
            if (!refDestructuringErrors)
            {
                return false;
            }
            var shorthandAssign = refDestructuringErrors.shorthandAssign;
            var doubleProto = refDestructuringErrors.doubleProto;
            if (!andThrow)
            {
                return shorthandAssign >= 0 || doubleProto >= 0;
            }
            if (shorthandAssign >= 0)
            {
                this.raise(shorthandAssign, "Shorthand property assignments are valid only in destructuring patterns");
            }
            if (doubleProto >= 0)
            {
                this.raiseRecoverable(doubleProto, "Redefinition of __proto__ property");
            }
        };
        pp$c.checkYieldAwaitInDefaultParams =         function()
        {
            if (this.yieldPos && (!this.awaitPos || this.yieldPos < this.awaitPos))
            {
                this.raise(this.yieldPos, "Yield expression cannot be a default value");
            }
            if (this.awaitPos)
            {
                this.raise(this.awaitPos, "Await expression cannot be a default value");
            }
        };
        pp$c.isSimpleAssignTarget =         function(expr)
        {
            if (expr.type === "ParenthesizedExpression")
            {
                return this.isSimpleAssignTarget(expr.expression);
            }
            return expr.type === "Identifier" || expr.type === "MemberExpression";
        };
        var pp$b = Parser.prototype;
        pp$b.parseTopLevel =         function(node)
        {
            var exports = Object.create(null);
            if (!node.body)
            {
                node.body = [];
            }
            while (this.type !== types$1.eof)
            {
                var stmt = this.parseStatement(null, true, exports);
                node.body.push(stmt);
            }
            if (this.inModule)
            {
                for (var i = 0, list = Object.keys(this.undefinedExports); i < list.length; i += 1)
                {
                    var name = list[i];
                    this.raiseRecoverable(this.undefinedExports[name].start, "Export '" + name + "' is not defined");
                }
            }
            this.adaptDirectivePrologue(node.body);
            this.next();
            node.sourceType = this.options.sourceType;
            return this.finishNode(node, "Program");
        };
        var loopLabel = {kind: "loop"},
            switchLabel = {kind: "switch"};
        pp$b.isLet =         function(context)
        {
            if (this.options.ecmaVersion < 6 || !this.isContextual("let"))
            {
                return false;
            }
            skipWhiteSpace.lastIndex = this.pos;
            var skip = skipWhiteSpace.exec(this.input);
            var next = this.pos + skip[0].length,
                nextCh = this.input.charCodeAt(next);
            if (nextCh === 91 || nextCh === 92 || nextCh > 0xd7ff && nextCh < 0xdc00)
            {
                return true;
            }
            if (context)
            {
                return false;
            }
            if (nextCh === 123)
            {
                return true;
            }
            if (isIdentifierStart(nextCh, true))
            {
                var pos = next + 1;
                while (isIdentifierChar(nextCh = this.input.charCodeAt(pos), true))
                {
                    ++pos;
                }
                if (nextCh === 92 || nextCh > 0xd7ff && nextCh < 0xdc00)
                {
                    return true;
                }
                var ident = this.input.slice(next, pos);
                if (!keywordRelationalOperator.test(ident))
                {
                    return true;
                }
            }
            return false;
        };
        pp$b.isAsyncFunction =         function()
        {
            if (this.options.ecmaVersion < 8 || !this.isContextual("async"))
            {
                return false;
            }
            skipWhiteSpace.lastIndex = this.pos;
            var skip = skipWhiteSpace.exec(this.input);
            var next = this.pos + skip[0].length,
                after;
            return !lineBreak.test(this.input.slice(this.pos, next)) && this.input.slice(next, next + 8) === "function" && (next + 8 === this.input.length || !(isIdentifierChar(after = this.input.charCodeAt(next + 8)) || after > 0xd7ff && after < 0xdc00));
        };
        pp$b.parseStatement =         function(context, topLevel, exports)
        {
            var starttype = this.type,
                node = this.startNode(),
                kind;
            if (this.nodeMessageSendObjectExpression)
            {
                node.expression = this.parseObjjMessageSendExpression(this.nodeMessageSendObjectExpression, this.nodeMessageSendObjectExpression.object);
                this.nodeMessageSendObjectExpression = null;
                this.semicolon();
                return this.finishNode(node, "ExpressionStatement");
            }
            if (this.isLet(context))
            {
                starttype = types$1._var;
                kind = "let";
            }
            if (this.options.objj)
            {
                switch(starttype) {
                    case objjAtTypes._implementation:
                        return this.parseObjjImplementation(node);
                    case objjAtTypes._interface:
                        return this.parseObjjInterface(node);
                    case objjAtTypes._protocol:
                        if (this.input.charCodeAt(this.pos) !== 40)
                        {
                            return this.parseObjjProtocol(node);
                        }
                        else
                        {
                            break;
                        }
                    case objjAtTypes._import:
                        return this.parseObjjImport(node);
                    case objjAtTypes._preprocess:
                        return this.parseObjjPreprocess(node);
                    case objjAtTypes._class:
                        return this.parseObjjClass(node);
                    case objjAtTypes._global:
                        return this.parseObjjGlobal(node);
                    case objjAtTypes._typedef:
                        return this.parseObjjTypedef(node);
                }
            }
            switch(starttype) {
                case types$1._break:
                case types$1._continue:
                    return this.parseBreakContinueStatement(node, starttype.keyword);
                case types$1._debugger:
                    return this.parseDebuggerStatement(node);
                case types$1._do:
                    return this.parseDoStatement(node);
                case types$1._for:
                    return this.parseForStatement(node);
                case types$1._function:
                    if (context && (this.strict || context !== "if" && context !== "label") && this.options.ecmaVersion >= 6)
                    {
                        this.unexpected();
                    }
                    return this.parseFunctionStatement(node, false, !context);
                case types$1._class:
                    if (context)
                    {
                        this.unexpected();
                    }
                    return this.parseClass(node, true);
                case types$1._if:
                    return this.parseIfStatement(node);
                case types$1._return:
                    return this.parseReturnStatement(node);
                case types$1._switch:
                    return this.parseSwitchStatement(node);
                case types$1._throw:
                    return this.parseThrowStatement(node);
                case types$1._try:
                    return this.parseTryStatement(node);
                case types$1._const:
                case types$1._var:
                    kind = kind || this.value;
                    if (context && kind !== "var")
                    {
                        this.unexpected();
                    }
                    return this.parseVarStatement(node, kind);
                case types$1._while:
                    return this.parseWhileStatement(node);
                case types$1._with:
                    return this.parseWithStatement(node);
                case types$1.braceL:
                    return this.parseBlock(true, node);
                case types$1.semi:
                    return this.parseEmptyStatement(node);
                case types$1._export:
                case types$1._import:
                    if (this.options.ecmaVersion > 10 && starttype === types$1._import)
                    {
                        skipWhiteSpace.lastIndex = this.pos;
                        var skip = skipWhiteSpace.exec(this.input);
                        var next = this.pos + skip[0].length,
                            nextCh = this.input.charCodeAt(next);
                        if (nextCh === 40 || nextCh === 46)
                        {
                            return this.parseExpressionStatement(node, this.parseExpression());
                        }
                    }
                    if (!this.options.allowImportExportEverywhere)
                    {
                        if (!topLevel)
                        {
                            this.raise(this.start, "'import' and 'export' may only appear at the top level");
                        }
                        if (!this.inModule)
                        {
                            this.raise(this.start, "'import' and 'export' may appear only with 'sourceType: module'");
                        }
                    }
                    return starttype === types$1._import ? this.parseImport(node) : this.parseExport(node, exports);
default:
                    if (this.isAsyncFunction())
                    {
                        if (context)
                        {
                            this.unexpected();
                        }
                        this.next();
                        return this.parseFunctionStatement(node, true, !context);
                    }
                    var maybeName = this.value,
                        expr = this.parseExpression();
                    if (starttype === types$1.name && expr.type === "Identifier" && this.eat(types$1.colon))
                    {
                        return this.parseLabeledStatement(node, maybeName, expr, context);
                    }
                    else
                    {
                        return this.parseExpressionStatement(node, expr);
                    }
            }
        };
        pp$b.parseBreakContinueStatement =         function(node, keyword)
        {
            var isBreak = keyword === "break";
            this.next();
            if (this.eat(types$1.semi) || this.insertSemicolon())
            {
                node.label = null;
            }
            else if (this.type !== types$1.name)
            {
                this.unexpected();
            }
            else
            {
                node.label = this.parseIdent();
                this.semicolon();
            }
            var i = 0;
            for (; i < this.labels.length; ++i)
            {
                var lab = this.labels[i];
                if (node.label == null || lab.name === node.label.name)
                {
                    if (lab.kind != null && (isBreak || lab.kind === "loop"))
                    {
                        break;
                    }
                    if (node.label && isBreak)
                    {
                        break;
                    }
                }
            }
            if (i === this.labels.length)
            {
                this.raise(node.start, "Unsyntactic " + keyword);
            }
            return this.finishNode(node, isBreak ? "BreakStatement" : "ContinueStatement");
        };
        pp$b.parseDebuggerStatement =         function(node)
        {
            this.next();
            this.semicolon();
            return this.finishNode(node, "DebuggerStatement");
        };
        pp$b.parseDoStatement =         function(node)
        {
            this.next();
            this.labels.push(loopLabel);
            node.body = this.parseStatement("do");
            this.labels.pop();
            this.expect(types$1._while);
            node.test = this.parseParenExpression();
            if (this.options.ecmaVersion >= 6)
            {
                this.eat(types$1.semi);
            }
            else
            {
                this.semicolon();
            }
            return this.finishNode(node, "DoWhileStatement");
        };
        pp$b.parseForStatement =         function(node)
        {
            this.next();
            var awaitAt = this.options.ecmaVersion >= 9 && this.canAwait && this.eatContextual("await") ? this.lastTokStart : -1;
            this.labels.push(loopLabel);
            this.enterScope(0);
            this.expect(types$1.parenL);
            if (this.type === types$1.semi)
            {
                if (awaitAt > -1)
                {
                    this.unexpected(awaitAt);
                }
                return this.parseFor(node, null);
            }
            var isLet = this.isLet();
            if (this.type === types$1._var || this.type === types$1._const || isLet)
            {
                var init$1 = this.startNode(),
                    kind = isLet ? "let" : this.value;
                this.next();
                this.parseVar(init$1, true, kind);
                this.finishNode(init$1, "VariableDeclaration");
                if ((this.type === types$1._in || this.options.ecmaVersion >= 6 && this.isContextual("of")) && init$1.declarations.length === 1)
                {
                    if (this.options.ecmaVersion >= 9)
                    {
                        if (this.type === types$1._in)
                        {
                            if (awaitAt > -1)
                            {
                                this.unexpected(awaitAt);
                            }
                        }
                        else
                        {
                            node.await = awaitAt > -1;
                        }
                    }
                    return this.parseForIn(node, init$1);
                }
                if (awaitAt > -1)
                {
                    this.unexpected(awaitAt);
                }
                return this.parseFor(node, init$1);
            }
            var startsWithLet = this.isContextual("let"),
                isForOf = false;
            var refDestructuringErrors = new DestructuringErrors();
            var init = this.parseExpression(awaitAt > -1 ? "await" : true, refDestructuringErrors);
            if (this.type === types$1._in || (isForOf = this.options.ecmaVersion >= 6 && this.isContextual("of")))
            {
                if (this.options.ecmaVersion >= 9)
                {
                    if (this.type === types$1._in)
                    {
                        if (awaitAt > -1)
                        {
                            this.unexpected(awaitAt);
                        }
                    }
                    else
                    {
                        node.await = awaitAt > -1;
                    }
                }
                if (startsWithLet && isForOf)
                {
                    this.raise(init.start, "The left-hand side of a for-of loop may not start with 'let'.");
                }
                this.toAssignable(init, false, refDestructuringErrors);
                this.checkLValPattern(init);
                return this.parseForIn(node, init);
            }
            else
            {
                this.checkExpressionErrors(refDestructuringErrors, true);
            }
            if (awaitAt > -1)
            {
                this.unexpected(awaitAt);
            }
            return this.parseFor(node, init);
        };
        pp$b.parseFunctionStatement =         function(node, isAsync, declarationPosition)
        {
            this.next();
            return this.parseFunction(node, FUNC_STATEMENT | (declarationPosition ? 0 : FUNC_HANGING_STATEMENT), false, isAsync);
        };
        pp$b.parseIfStatement =         function(node)
        {
            this.next();
            node.test = this.parseParenExpression();
            node.consequent = this.parseStatement("if");
            node.alternate = this.eat(types$1._else) ? this.parseStatement("if") : null;
            return this.finishNode(node, "IfStatement");
        };
        pp$b.parseReturnStatement =         function(node)
        {
            if (!this.inFunction && !this.options.allowReturnOutsideFunction && !this.objjInFunction)
            {
                this.raise(this.start, "'return' outside of function");
            }
            this.next();
            if (this.eat(types$1.semi) || this.insertSemicolon())
            {
                node.argument = null;
            }
            else
            {
                node.argument = this.parseExpression();
                this.semicolon();
            }
            return this.finishNode(node, "ReturnStatement");
        };
        pp$b.parseSwitchStatement =         function(node)
        {
            this.next();
            node.discriminant = this.parseParenExpression();
            node.cases = [];
            this.expect(types$1.braceL);
            this.labels.push(switchLabel);
            this.enterScope(0);
            var cur;
            for (var sawDefault = false; this.type !== types$1.braceR; )
            {
                if (this.type === types$1._case || this.type === types$1._default)
                {
                    var isCase = this.type === types$1._case;
                    if (cur)
                    {
                        this.finishNode(cur, "SwitchCase");
                    }
                    node.cases.push(cur = this.startNode());
                    cur.consequent = [];
                    this.next();
                    if (isCase)
                    {
                        cur.test = this.parseExpression();
                    }
                    else
                    {
                        if (sawDefault)
                        {
                            this.raiseRecoverable(this.lastTokStart, "Multiple default clauses");
                        }
                        sawDefault = true;
                        cur.test = null;
                    }
                    this.expect(types$1.colon);
                }
                else
                {
                    if (!cur)
                    {
                        this.unexpected();
                    }
                    cur.consequent.push(this.parseStatement(null));
                }
            }
            this.exitScope();
            if (cur)
            {
                this.finishNode(cur, "SwitchCase");
            }
            this.next();
            this.labels.pop();
            return this.finishNode(node, "SwitchStatement");
        };
        pp$b.parseThrowStatement =         function(node)
        {
            this.next();
            if (lineBreak.test(this.input.slice(this.lastTokEnd, this.start)))
            {
                this.raise(this.lastTokEnd, "Illegal newline after throw");
            }
            node.argument = this.parseExpression();
            this.semicolon();
            return this.finishNode(node, "ThrowStatement");
        };
        var empty$1 = [];
        pp$b.parseTryStatement =         function(node)
        {
            this.next();
            node.block = this.parseBlock();
            node.handler = null;
            if (this.type === types$1._catch)
            {
                var clause = this.startNode();
                this.next();
                if (this.eat(types$1.parenL))
                {
                    clause.param = this.parseBindingAtom();
                    var simple = clause.param.type === "Identifier";
                    this.enterScope(simple ? SCOPE_SIMPLE_CATCH : 0);
                    this.checkLValPattern(clause.param, simple ? BIND_SIMPLE_CATCH : BIND_LEXICAL);
                    this.expect(types$1.parenR);
                }
                else
                {
                    if (this.options.ecmaVersion < 10)
                    {
                        this.unexpected();
                    }
                    clause.param = null;
                    this.enterScope(0);
                }
                clause.body = this.parseBlock(false);
                this.exitScope();
                node.handler = this.finishNode(clause, "CatchClause");
            }
            node.finalizer = this.eat(types$1._finally) ? this.parseBlock() : null;
            if (!node.handler && !node.finalizer)
            {
                this.raise(node.start, "Missing catch or finally clause");
            }
            return this.finishNode(node, "TryStatement");
        };
        pp$b.parseVarStatement =         function(node, kind)
        {
            this.next();
            this.parseVar(node, false, kind);
            this.semicolon();
            return this.finishNode(node, "VariableDeclaration");
        };
        pp$b.parseWhileStatement =         function(node)
        {
            this.next();
            node.test = this.parseParenExpression();
            this.labels.push(loopLabel);
            node.body = this.parseStatement("while");
            this.labels.pop();
            return this.finishNode(node, "WhileStatement");
        };
        pp$b.parseWithStatement =         function(node)
        {
            if (this.strict)
            {
                this.raise(this.start, "'with' in strict mode");
            }
            this.next();
            node.object = this.parseParenExpression();
            node.body = this.parseStatement("with");
            return this.finishNode(node, "WithStatement");
        };
        pp$b.parseEmptyStatement =         function(node)
        {
            this.next();
            return this.finishNode(node, "EmptyStatement");
        };
        pp$b.parseLabeledStatement =         function(node, maybeName, expr, context)
        {
            for (var i$1 = 0, list = this.labels; i$1 < list.length; i$1 += 1)
            {
                var label = list[i$1];
                if (label.name === maybeName)
                {
                    this.raise(expr.start, "Label '" + maybeName + "' is already declared");
                }
            }
            var kind = this.type.isLoop ? "loop" : this.type === types$1._switch ? "switch" : null;
            for (var i = this.labels.length - 1; i >= 0; i--)
            {
                var label$1 = this.labels[i];
                if (label$1.statementStart === node.start)
                {
                    label$1.statementStart = this.start;
                    label$1.kind = kind;
                }
                else
                {
                    break;
                }
            }
            this.labels.push({name: maybeName, kind: kind, statementStart: this.start});
            node.body = this.parseStatement(context ? context.indexOf("label") === -1 ? context + "label" : context : "label");
            this.labels.pop();
            node.label = expr;
            return this.finishNode(node, "LabeledStatement");
        };
        pp$b.parseExpressionStatement =         function(node, expr)
        {
            node.expression = expr;
            this.semicolon();
            return this.finishNode(node, "ExpressionStatement");
        };
        pp$b.parseBlock =         function(createNewLexicalScope, node, exitStrict)
        {
            if (createNewLexicalScope === void 0)
                createNewLexicalScope = true;
            if (node === void 0)
                node = this.startNode();
            node.body = [];
            this.expect(types$1.braceL);
            if (createNewLexicalScope)
            {
                this.enterScope(0);
            }
            while (this.type !== types$1.braceR)
            {
                var stmt = this.parseStatement(null);
                node.body.push(stmt);
            }
            if (exitStrict)
            {
                this.strict = false;
            }
            this.next();
            if (createNewLexicalScope)
            {
                this.exitScope();
            }
            return this.finishNode(node, "BlockStatement");
        };
        pp$b.parseFor =         function(node, init)
        {
            node.init = init;
            this.expect(types$1.semi);
            node.test = this.type === types$1.semi ? null : this.parseExpression();
            this.expect(types$1.semi);
            node.update = this.type === types$1.parenR ? null : this.parseExpression();
            this.expect(types$1.parenR);
            node.body = this.parseStatement("for");
            this.exitScope();
            this.labels.pop();
            return this.finishNode(node, "ForStatement");
        };
        pp$b.parseForIn =         function(node, init)
        {
            var isForIn = this.type === types$1._in;
            this.next();
            if (init.type === "VariableDeclaration" && init.declarations[0].init != null && (!isForIn || this.options.ecmaVersion < 8 || this.strict || init.kind !== "var" || init.declarations[0].id.type !== "Identifier"))
            {
                this.raise(init.start, (isForIn ? "for-in" : "for-of") + " loop variable declaration may not have an initializer");
            }
            node.left = init;
            node.right = isForIn ? this.parseExpression() : this.parseMaybeAssign();
            this.expect(types$1.parenR);
            node.body = this.parseStatement("for");
            this.exitScope();
            this.labels.pop();
            return this.finishNode(node, isForIn ? "ForInStatement" : "ForOfStatement");
        };
        pp$b.parseVar =         function(node, isFor, kind)
        {
            node.declarations = [];
            node.kind = kind;
            for (; ; )
            {
                var decl = this.startNode();
                this.parseVarId(decl, kind);
                if (this.eat(types$1.eq))
                {
                    decl.init = this.parseMaybeAssign(isFor);
                }
                else if (kind === "const" && !(this.type === types$1._in || this.options.ecmaVersion >= 6 && this.isContextual("of")))
                {
                    this.unexpected();
                }
                else if (decl.id.type !== "Identifier" && !(isFor && (this.type === types$1._in || this.isContextual("of"))))
                {
                    this.raise(this.lastTokEnd, "Complex binding patterns require an initialization value");
                }
                else
                {
                    decl.init = null;
                }
                node.declarations.push(this.finishNode(decl, "VariableDeclarator"));
                if (!this.eat(types$1.comma))
                {
                    break;
                }
            }
            return node;
        };
        pp$b.parseVarId =         function(decl, kind)
        {
            decl.id = this.parseBindingAtom();
            this.checkLValPattern(decl.id, kind === "var" ? BIND_VAR : BIND_LEXICAL, false);
        };
        var FUNC_STATEMENT = 1,
            FUNC_HANGING_STATEMENT = 2,
            FUNC_NULLABLE_ID = 4;
        pp$b.parseFunction =         function(node, statement, allowExpressionBody, isAsync, forInit)
        {
            this.initFunction(node);
            if (this.options.ecmaVersion >= 9 || this.options.ecmaVersion >= 6 && !isAsync)
            {
                if (this.type === types$1.star && statement & FUNC_HANGING_STATEMENT)
                {
                    this.unexpected();
                }
                node.generator = this.eat(types$1.star);
            }
            if (this.options.ecmaVersion >= 8)
            {
                node.async = !!isAsync;
            }
            if (statement & FUNC_STATEMENT)
            {
                node.id = statement & FUNC_NULLABLE_ID && this.type !== types$1.name ? null : this.parseIdent();
                if (node.id && !(statement & FUNC_HANGING_STATEMENT))
                {
                    this.checkLValSimple(node.id, this.strict || node.generator || node.async ? this.treatFunctionsAsVar ? BIND_VAR : BIND_LEXICAL : BIND_FUNCTION);
                }
            }
            var oldYieldPos = this.yieldPos,
                oldAwaitPos = this.awaitPos,
                oldAwaitIdentPos = this.awaitIdentPos;
            this.yieldPos = 0;
            this.awaitPos = 0;
            this.awaitIdentPos = 0;
            this.enterScope(functionFlags(node.async, node.generator));
            if (!(statement & FUNC_STATEMENT))
            {
                node.id = this.type === types$1.name ? this.parseIdent() : null;
            }
            this.parseFunctionParams(node);
            this.parseFunctionBody(node, allowExpressionBody, false, forInit);
            this.yieldPos = oldYieldPos;
            this.awaitPos = oldAwaitPos;
            this.awaitIdentPos = oldAwaitIdentPos;
            return this.finishNode(node, statement & FUNC_STATEMENT ? "FunctionDeclaration" : "FunctionExpression");
        };
        pp$b.parseFunctionParams =         function(node)
        {
            this.expect(types$1.parenL);
            node.params = this.parseBindingList(types$1.parenR, false, this.options.ecmaVersion >= 8);
            this.checkYieldAwaitInDefaultParams();
        };
        pp$b.parseClass =         function(node, isStatement)
        {
            this.next();
            var oldStrict = this.strict;
            this.strict = true;
            this.parseClassId(node, isStatement);
            this.parseClassSuper(node);
            var privateNameMap = this.enterClassBody();
            var classBody = this.startNode();
            var hadConstructor = false;
            classBody.body = [];
            this.expect(types$1.braceL);
            while (this.type !== types$1.braceR)
            {
                var element = this.parseClassElement(node.superClass !== null);
                if (element)
                {
                    classBody.body.push(element);
                    if (element.type === "MethodDefinition" && element.kind === "constructor")
                    {
                        if (hadConstructor)
                        {
                            this.raise(element.start, "Duplicate constructor in the same class");
                        }
                        hadConstructor = true;
                    }
                    else if (element.key && element.key.type === "PrivateIdentifier" && isPrivateNameConflicted(privateNameMap, element))
                    {
                        this.raiseRecoverable(element.key.start, "Identifier '#" + element.key.name + "' has already been declared");
                    }
                }
            }
            this.strict = oldStrict;
            this.next();
            node.body = this.finishNode(classBody, "ClassBody");
            this.exitClassBody();
            return this.finishNode(node, isStatement ? "ClassDeclaration" : "ClassExpression");
        };
        pp$b.parseClassElement =         function(constructorAllowsSuper)
        {
            if (this.eat(types$1.semi))
            {
                return null;
            }
            var ecmaVersion = this.options.ecmaVersion;
            var node = this.startNode();
            var keyName = "";
            var isGenerator = false;
            var isAsync = false;
            var kind = "method";
            var isStatic = false;
            if (this.eatContextual("static"))
            {
                if (ecmaVersion >= 13 && this.eat(types$1.braceL))
                {
                    this.parseClassStaticBlock(node);
                    return node;
                }
                if (this.isClassElementNameStart() || this.type === types$1.star)
                {
                    isStatic = true;
                }
                else
                {
                    keyName = "static";
                }
            }
            node.static = isStatic;
            if (!keyName && ecmaVersion >= 8 && this.eatContextual("async"))
            {
                if ((this.isClassElementNameStart() || this.type === types$1.star) && !this.canInsertSemicolon())
                {
                    isAsync = true;
                }
                else
                {
                    keyName = "async";
                }
            }
            if (!keyName && (ecmaVersion >= 9 || !isAsync) && this.eat(types$1.star))
            {
                isGenerator = true;
            }
            if (!keyName && !isAsync && !isGenerator)
            {
                var lastValue = this.value;
                if (this.eatContextual("get") || this.eatContextual("set"))
                {
                    if (this.isClassElementNameStart())
                    {
                        kind = lastValue;
                    }
                    else
                    {
                        keyName = lastValue;
                    }
                }
            }
            if (keyName)
            {
                node.computed = false;
                node.key = this.startNodeAt(this.lastTokStart, this.lastTokStartLoc);
                node.key.name = keyName;
                this.finishNode(node.key, "Identifier");
            }
            else
            {
                this.parseClassElementName(node);
            }
            if (ecmaVersion < 13 || this.type === types$1.parenL || kind !== "method" || isGenerator || isAsync)
            {
                var isConstructor = !node.static && checkKeyName(node, "constructor");
                var allowsDirectSuper = isConstructor && constructorAllowsSuper;
                if (isConstructor && kind !== "method")
                {
                    this.raise(node.key.start, "Constructor can't have get/set modifier");
                }
                node.kind = isConstructor ? "constructor" : kind;
                this.parseClassMethod(node, isGenerator, isAsync, allowsDirectSuper);
            }
            else
            {
                this.parseClassField(node);
            }
            return node;
        };
        pp$b.isClassElementNameStart =         function()
        {
            return this.type === types$1.name || this.type === types$1.privateId || this.type === types$1.num || this.type === types$1.string || this.type === types$1.bracketL || this.type.keyword;
        };
        pp$b.parseClassElementName =         function(element)
        {
            if (this.type === types$1.privateId)
            {
                if (this.value === "constructor")
                {
                    this.raise(this.start, "Classes can't have an element named '#constructor'");
                }
                element.computed = false;
                element.key = this.parsePrivateIdent();
            }
            else
            {
                this.parsePropertyName(element);
            }
        };
        pp$b.parseClassMethod =         function(method, isGenerator, isAsync, allowsDirectSuper)
        {
            var key = method.key;
            if (method.kind === "constructor")
            {
                if (isGenerator)
                {
                    this.raise(key.start, "Constructor can't be a generator");
                }
                if (isAsync)
                {
                    this.raise(key.start, "Constructor can't be an async method");
                }
            }
            else if (method.static && checkKeyName(method, "prototype"))
            {
                this.raise(key.start, "Classes may not have a static property named prototype");
            }
            var value = method.value = this.parseMethod(isGenerator, isAsync, allowsDirectSuper);
            if (method.kind === "get" && value.params.length !== 0)
            {
                this.raiseRecoverable(value.start, "getter should have no params");
            }
            if (method.kind === "set" && value.params.length !== 1)
            {
                this.raiseRecoverable(value.start, "setter should have exactly one param");
            }
            if (method.kind === "set" && value.params[0].type === "RestElement")
            {
                this.raiseRecoverable(value.params[0].start, "Setter cannot use rest params");
            }
            return this.finishNode(method, "MethodDefinition");
        };
        pp$b.parseClassField =         function(field)
        {
            if (checkKeyName(field, "constructor"))
            {
                this.raise(field.key.start, "Classes can't have a field named 'constructor'");
            }
            else if (field.static && checkKeyName(field, "prototype"))
            {
                this.raise(field.key.start, "Classes can't have a static field named 'prototype'");
            }
            if (this.eat(types$1.eq))
            {
                var scope = this.currentThisScope();
                var inClassFieldInit = scope.inClassFieldInit;
                scope.inClassFieldInit = true;
                field.value = this.parseMaybeAssign();
                scope.inClassFieldInit = inClassFieldInit;
            }
            else
            {
                field.value = null;
            }
            this.semicolon();
            return this.finishNode(field, "PropertyDefinition");
        };
        pp$b.parseClassStaticBlock =         function(node)
        {
            node.body = [];
            var oldLabels = this.labels;
            this.labels = [];
            this.enterScope(SCOPE_CLASS_STATIC_BLOCK | SCOPE_SUPER);
            while (this.type !== types$1.braceR)
            {
                var stmt = this.parseStatement(null);
                node.body.push(stmt);
            }
            this.next();
            this.exitScope();
            this.labels = oldLabels;
            return this.finishNode(node, "StaticBlock");
        };
        pp$b.parseClassId =         function(node, isStatement)
        {
            if (this.type === types$1.name)
            {
                node.id = this.parseIdent();
                if (isStatement)
                {
                    this.checkLValSimple(node.id, BIND_LEXICAL, false);
                }
            }
            else
            {
                if (isStatement === true)
                {
                    this.unexpected();
                }
                node.id = null;
            }
        };
        pp$b.parseClassSuper =         function(node)
        {
            node.superClass = this.eat(types$1._extends) ? this.parseExprSubscripts(false) : null;
        };
        pp$b.enterClassBody =         function()
        {
            var element = {declared: Object.create(null), used: []};
            this.privateNameStack.push(element);
            return element.declared;
        };
        pp$b.exitClassBody =         function()
        {
            var ref = this.privateNameStack.pop();
            var declared = ref.declared;
            var used = ref.used;
            var len = this.privateNameStack.length;
            var parent = len === 0 ? null : this.privateNameStack[len - 1];
            for (var i = 0; i < used.length; ++i)
            {
                var id = used[i];
                if (!hasOwn(declared, id.name))
                {
                    if (parent)
                    {
                        parent.used.push(id);
                    }
                    else
                    {
                        this.raiseRecoverable(id.start, "Private field '#" + id.name + "' must be declared in an enclosing class");
                    }
                }
            }
        };
        function isPrivateNameConflicted(privateNameMap, element)
        {
            var name = element.key.name;
            var curr = privateNameMap[name];
            var next = "true";
            if (element.type === "MethodDefinition" && (element.kind === "get" || element.kind === "set"))
            {
                next = (element.static ? "s" : "i") + element.kind;
            }
            if (curr === "iget" && next === "iset" || curr === "iset" && next === "iget" || curr === "sget" && next === "sset" || curr === "sset" && next === "sget")
            {
                privateNameMap[name] = "true";
                return false;
            }
            else if (!curr)
            {
                privateNameMap[name] = next;
                return false;
            }
            else
            {
                return true;
            }
        }
        function checkKeyName(node, name)
        {
            var computed = node.computed;
            var key = node.key;
            return !computed && (key.type === "Identifier" && key.name === name || key.type === "Literal" && key.value === name);
        }
        pp$b.parseExport =         function(node, exports)
        {
            this.next();
            if (this.eat(types$1.star))
            {
                if (this.options.ecmaVersion >= 11)
                {
                    if (this.eatContextual("as"))
                    {
                        node.exported = this.parseModuleExportName();
                        this.checkExport(exports, node.exported, this.lastTokStart);
                    }
                    else
                    {
                        node.exported = null;
                    }
                }
                this.expectContextual("from");
                if (this.type !== types$1.string)
                {
                    this.unexpected();
                }
                node.source = this.parseExprAtom();
                this.semicolon();
                return this.finishNode(node, "ExportAllDeclaration");
            }
            if (this.eat(types$1._default))
            {
                this.checkExport(exports, "default", this.lastTokStart);
                var isAsync;
                if (this.type === types$1._function || (isAsync = this.isAsyncFunction()))
                {
                    var fNode = this.startNode();
                    this.next();
                    if (isAsync)
                    {
                        this.next();
                    }
                    node.declaration = this.parseFunction(fNode, FUNC_STATEMENT | FUNC_NULLABLE_ID, false, isAsync);
                }
                else if (this.type === types$1._class)
                {
                    var cNode = this.startNode();
                    node.declaration = this.parseClass(cNode, "nullableID");
                }
                else
                {
                    node.declaration = this.parseMaybeAssign();
                    this.semicolon();
                }
                return this.finishNode(node, "ExportDefaultDeclaration");
            }
            if (this.shouldParseExportStatement())
            {
                node.declaration = this.parseStatement(null);
                if (node.declaration.type === "VariableDeclaration")
                {
                    this.checkVariableExport(exports, node.declaration.declarations);
                }
                else
                {
                    this.checkExport(exports, node.declaration.id, node.declaration.id.start);
                }
                node.specifiers = [];
                node.source = null;
            }
            else
            {
                node.declaration = null;
                node.specifiers = this.parseExportSpecifiers(exports);
                if (this.eatContextual("from"))
                {
                    if (this.type !== types$1.string)
                    {
                        this.unexpected();
                    }
                    node.source = this.parseExprAtom();
                }
                else
                {
                    for (var i = 0, list = node.specifiers; i < list.length; i += 1)
                    {
                        var spec = list[i];
                        this.checkUnreserved(spec.local);
                        this.checkLocalExport(spec.local);
                        if (spec.local.type === "Literal")
                        {
                            this.raise(spec.local.start, "A string literal cannot be used as an exported binding without `from`.");
                        }
                    }
                    node.source = null;
                }
                this.semicolon();
            }
            return this.finishNode(node, "ExportNamedDeclaration");
        };
        pp$b.checkExport =         function(exports, name, pos)
        {
            if (!exports)
            {
                return;
            }
            if (typeof name !== "string")
            {
                name = name.type === "Identifier" ? name.name : name.value;
            }
            if (hasOwn(exports, name))
            {
                this.raiseRecoverable(pos, "Duplicate export '" + name + "'");
            }
            exports[name] = true;
        };
        pp$b.checkPatternExport =         function(exports, pat)
        {
            var type = pat.type;
            if (type === "Identifier")
            {
                this.checkExport(exports, pat, pat.start);
            }
            else if (type === "ObjectPattern")
            {
                for (var i = 0, list = pat.properties; i < list.length; i += 1)
                {
                    var prop = list[i];
                    this.checkPatternExport(exports, prop);
                }
            }
            else if (type === "ArrayPattern")
            {
                for (var i$1 = 0, list$1 = pat.elements; i$1 < list$1.length; i$1 += 1)
                {
                    var elt = list$1[i$1];
                    if (elt)
                    {
                        this.checkPatternExport(exports, elt);
                    }
                }
            }
            else if (type === "Property")
            {
                this.checkPatternExport(exports, pat.value);
            }
            else if (type === "AssignmentPattern")
            {
                this.checkPatternExport(exports, pat.left);
            }
            else if (type === "RestElement")
            {
                this.checkPatternExport(exports, pat.argument);
            }
            else if (type === "ParenthesizedExpression")
            {
                this.checkPatternExport(exports, pat.expression);
            }
        };
        pp$b.checkVariableExport =         function(exports, decls)
        {
            if (!exports)
            {
                return;
            }
            for (var i = 0, list = decls; i < list.length; i += 1)
            {
                var decl = list[i];
                this.checkPatternExport(exports, decl.id);
            }
        };
        pp$b.shouldParseExportStatement =         function()
        {
            return this.type.keyword === "var" || this.type.keyword === "const" || this.type.keyword === "class" || this.type.keyword === "function" || this.isLet() || this.isAsyncFunction();
        };
        pp$b.parseExportSpecifiers =         function(exports)
        {
            var nodes = [],
                first = true;
            this.expect(types$1.braceL);
            while (!this.eat(types$1.braceR))
            {
                if (!first)
                {
                    this.expect(types$1.comma);
                    if (this.afterTrailingComma(types$1.braceR))
                    {
                        break;
                    }
                }
                else
                {
                    first = false;
                }
                var node = this.startNode();
                node.local = this.parseModuleExportName();
                node.exported = this.eatContextual("as") ? this.parseModuleExportName() : node.local;
                this.checkExport(exports, node.exported, node.exported.start);
                nodes.push(this.finishNode(node, "ExportSpecifier"));
            }
            return nodes;
        };
        pp$b.parseImport =         function(node)
        {
            this.next();
            if (this.type === types$1.string)
            {
                node.specifiers = empty$1;
                node.source = this.parseExprAtom();
            }
            else
            {
                node.specifiers = this.parseImportSpecifiers();
                this.expectContextual("from");
                node.source = this.type === types$1.string ? this.parseExprAtom() : this.unexpected();
            }
            this.semicolon();
            return this.finishNode(node, "ImportDeclaration");
        };
        pp$b.parseImportSpecifiers =         function()
        {
            var nodes = [],
                first = true;
            if (this.type === types$1.name)
            {
                var node = this.startNode();
                node.local = this.parseIdent();
                this.checkLValSimple(node.local, BIND_LEXICAL);
                nodes.push(this.finishNode(node, "ImportDefaultSpecifier"));
                if (!this.eat(types$1.comma))
                {
                    return nodes;
                }
            }
            if (this.type === types$1.star)
            {
                var node$1 = this.startNode();
                this.next();
                this.expectContextual("as");
                node$1.local = this.parseIdent();
                this.checkLValSimple(node$1.local, BIND_LEXICAL);
                nodes.push(this.finishNode(node$1, "ImportNamespaceSpecifier"));
                return nodes;
            }
            this.expect(types$1.braceL);
            while (!this.eat(types$1.braceR))
            {
                if (!first)
                {
                    this.expect(types$1.comma);
                    if (this.afterTrailingComma(types$1.braceR))
                    {
                        break;
                    }
                }
                else
                {
                    first = false;
                }
                var node$2 = this.startNode();
                node$2.imported = this.parseModuleExportName();
                if (this.eatContextual("as"))
                {
                    node$2.local = this.parseIdent();
                }
                else
                {
                    this.checkUnreserved(node$2.imported);
                    node$2.local = node$2.imported;
                }
                this.checkLValSimple(node$2.local, BIND_LEXICAL);
                nodes.push(this.finishNode(node$2, "ImportSpecifier"));
            }
            return nodes;
        };
        pp$b.parseModuleExportName =         function()
        {
            if (this.options.ecmaVersion >= 13 && this.type === types$1.string)
            {
                var stringLiteral = this.parseLiteral(this.value);
                if (loneSurrogate.test(stringLiteral.value))
                {
                    this.raise(stringLiteral.start, "An export name cannot include a lone surrogate.");
                }
                return stringLiteral;
            }
            return this.parseIdent(true);
        };
        pp$b.adaptDirectivePrologue =         function(statements)
        {
            for (var i = 0; i < statements.length && this.isDirectiveCandidate(statements[i]); ++i)
            {
                statements[i].directive = statements[i].expression.raw.slice(1, -1);
            }
        };
        pp$b.isDirectiveCandidate =         function(statement)
        {
            return this.options.ecmaVersion >= 5 && statement.type === "ExpressionStatement" && statement.expression.type === "Literal" && typeof statement.expression.value === "string" && (this.input[statement.start] === "\"" || this.input[statement.start] === "'");
        };
        var pp$a = Parser.prototype;
        pp$a.toAssignable =         function(node, isBinding, refDestructuringErrors)
        {
            if (this.options.ecmaVersion >= 6 && node)
            {
                switch(node.type) {
                    case "Identifier":
                        if (this.inAsync && node.name === "await")
                        {
                            this.raise(node.start, "Cannot use 'await' as identifier inside an async function");
                        }
                        break;
                    case "ObjectPattern":
                    case "ArrayPattern":
                    case "AssignmentPattern":
                    case "RestElement":
                    case "Dereference":
                        break;
                    case "ObjectExpression":
                        node.type = "ObjectPattern";
                        if (refDestructuringErrors)
                        {
                            this.checkPatternErrors(refDestructuringErrors, true);
                        }
                        for (var i = 0, list = node.properties; i < list.length; i += 1)
                        {
                            var prop = list[i];
                            this.toAssignable(prop, isBinding);
                            if (prop.type === "RestElement" && (prop.argument.type === "ArrayPattern" || prop.argument.type === "ObjectPattern"))
                            {
                                this.raise(prop.argument.start, "Unexpected token");
                            }
                        }
                        break;
                    case "Property":
                        if (node.kind !== "init")
                        {
                            this.raise(node.key.start, "Object pattern can't contain getter or setter");
                        }
                        this.toAssignable(node.value, isBinding);
                        break;
                    case "ArrayExpression":
                        node.type = "ArrayPattern";
                        if (refDestructuringErrors)
                        {
                            this.checkPatternErrors(refDestructuringErrors, true);
                        }
                        this.toAssignableList(node.elements, isBinding);
                        break;
                    case "SpreadElement":
                        node.type = "RestElement";
                        this.toAssignable(node.argument, isBinding);
                        if (node.argument.type === "AssignmentPattern")
                        {
                            this.raise(node.argument.start, "Rest elements cannot have a default value");
                        }
                        break;
                    case "AssignmentExpression":
                        if (node.operator !== "=")
                        {
                            this.raise(node.left.end, "Only '=' operator can be used for specifying default value.");
                        }
                        node.type = "AssignmentPattern";
                        delete node.operator;
                        this.toAssignable(node.left, isBinding);
                        break;
                    case "ParenthesizedExpression":
                        this.toAssignable(node.expression, isBinding, refDestructuringErrors);
                        break;
                    case "ChainExpression":
                        this.raiseRecoverable(node.start, "Optional chaining cannot appear in left-hand side");
                        break;
                    case "MemberExpression":
                        if (!isBinding)
                        {
                            break;
                        }
default:
                        this.raise(node.start, "Assigning to rvalue");
                }
            }
            else if (refDestructuringErrors)
            {
                this.checkPatternErrors(refDestructuringErrors, true);
            }
            return node;
        };
        pp$a.toAssignableList =         function(exprList, isBinding)
        {
            var end = exprList.length;
            for (var i = 0; i < end; i++)
            {
                var elt = exprList[i];
                if (elt)
                {
                    this.toAssignable(elt, isBinding);
                }
            }
            if (end)
            {
                var last = exprList[end - 1];
                if (this.options.ecmaVersion === 6 && isBinding && last && last.type === "RestElement" && last.argument.type !== "Identifier")
                {
                    this.unexpected(last.argument.start);
                }
            }
            return exprList;
        };
        pp$a.parseSpread =         function(refDestructuringErrors)
        {
            var node = this.startNode();
            this.next();
            node.argument = this.parseMaybeAssign(false, refDestructuringErrors);
            return this.finishNode(node, "SpreadElement");
        };
        pp$a.parseRestBinding =         function()
        {
            var node = this.startNode();
            this.next();
            if (this.options.ecmaVersion === 6 && this.type !== types$1.name)
            {
                this.unexpected();
            }
            node.argument = this.parseBindingAtom();
            return this.finishNode(node, "RestElement");
        };
        pp$a.parseBindingAtom =         function()
        {
            if (this.options.ecmaVersion >= 6)
            {
                switch(this.type) {
                    case types$1.bracketL:
                        var node = this.startNode();
                        this.next();
                        node.elements = this.parseBindingList(types$1.bracketR, true, true);
                        return this.finishNode(node, "ArrayPattern");
                    case types$1.braceL:
                        return this.parseObj(true);
                }
            }
            return this.parseIdent();
        };
        pp$a.parseBindingList =         function(close, allowEmpty, allowTrailingComma)
        {
            var elts = [],
                first = true;
            while (!this.eat(close))
            {
                if (first)
                {
                    first = false;
                }
                else
                {
                    this.expect(types$1.comma);
                }
                if (allowEmpty && this.type === types$1.comma)
                {
                    elts.push(null);
                }
                else if (allowTrailingComma && this.afterTrailingComma(close))
                {
                    break;
                }
                else if (this.type === types$1.ellipsis)
                {
                    var rest = this.parseRestBinding();
                    this.parseBindingListItem(rest);
                    elts.push(rest);
                    if (this.type === types$1.comma)
                    {
                        this.raise(this.start, "Comma is not permitted after the rest element");
                    }
                    this.expect(close);
                    break;
                }
                else
                {
                    var elem = this.parseMaybeDefault(this.start, this.startLoc);
                    this.parseBindingListItem(elem);
                    elts.push(elem);
                }
            }
            return elts;
        };
        pp$a.parseBindingListItem =         function(param)
        {
            return param;
        };
        pp$a.parseMaybeDefault =         function(startPos, startLoc, left)
        {
            left = left || this.parseBindingAtom();
            if (this.options.ecmaVersion < 6 || !this.eat(types$1.eq))
            {
                return left;
            }
            var node = this.startNodeAt(startPos, startLoc);
            node.left = left;
            node.right = this.parseMaybeAssign();
            return this.finishNode(node, "AssignmentPattern");
        };
        pp$a.checkLValSimple =         function(expr, bindingType, checkClashes)
        {
            if (bindingType === void 0)
                bindingType = BIND_NONE;
            var isBind = bindingType !== BIND_NONE;
            switch(expr.type) {
                case "Dereference":
                case "Identifier":
                    if (this.strict && this.reservedWordsStrictBind.test(expr.name))
                    {
                        this.raiseRecoverable(expr.start, (isBind ? "Binding " : "Assigning to ") + expr.name + " in strict mode");
                    }
                    if (isBind)
                    {
                        if (bindingType === BIND_LEXICAL && expr.name === "let")
                        {
                            this.raiseRecoverable(expr.start, "let is disallowed as a lexically bound name");
                        }
                        if (checkClashes)
                        {
                            if (hasOwn(checkClashes, expr.name))
                            {
                                this.raiseRecoverable(expr.start, "Argument name clash");
                            }
                            checkClashes[expr.name] = true;
                        }
                        if (bindingType !== BIND_OUTSIDE)
                        {
                            this.declareName(expr.name, bindingType, expr.start);
                        }
                    }
                    break;
                case "ChainExpression":
                    this.raiseRecoverable(expr.start, "Optional chaining cannot appear in left-hand side");
                    break;
                case "MemberExpression":
                    if (isBind)
                    {
                        this.raiseRecoverable(expr.start, "Binding member expression");
                    }
                    break;
                case "ParenthesizedExpression":
                    if (isBind)
                    {
                        this.raiseRecoverable(expr.start, "Binding parenthesized expression");
                    }
                    return this.checkLValSimple(expr.expression, bindingType, checkClashes);
default:
                    this.raise(expr.start, (isBind ? "Binding" : "Assigning to") + " rvalue");
            }
        };
        pp$a.checkLValPattern =         function(expr, bindingType, checkClashes)
        {
            if (bindingType === void 0)
                bindingType = BIND_NONE;
            switch(expr.type) {
                case "ObjectPattern":
                    for (var i = 0, list = expr.properties; i < list.length; i += 1)
                    {
                        var prop = list[i];
                        this.checkLValInnerPattern(prop, bindingType, checkClashes);
                    }
                    break;
                case "ArrayPattern":
                    for (var i$1 = 0, list$1 = expr.elements; i$1 < list$1.length; i$1 += 1)
                    {
                        var elem = list$1[i$1];
                        if (elem)
                        {
                            this.checkLValInnerPattern(elem, bindingType, checkClashes);
                        }
                    }
                    break;
default:
                    this.checkLValSimple(expr, bindingType, checkClashes);
            }
        };
        pp$a.checkLValInnerPattern =         function(expr, bindingType, checkClashes)
        {
            if (bindingType === void 0)
                bindingType = BIND_NONE;
            switch(expr.type) {
                case "Property":
                    this.checkLValInnerPattern(expr.value, bindingType, checkClashes);
                    break;
                case "AssignmentPattern":
                    this.checkLValPattern(expr.left, bindingType, checkClashes);
                    break;
                case "RestElement":
                    this.checkLValPattern(expr.argument, bindingType, checkClashes);
                    break;
default:
                    this.checkLValPattern(expr, bindingType, checkClashes);
            }
        };
        var TokContext =         function TokContext(token, isExpr, preserveSpace, override, generator)
        {
            this.token = token;
            this.isExpr = !!isExpr;
            this.preserveSpace = !!preserveSpace;
            this.override = override;
            this.generator = !!generator;
        };
        var types = {b_stat: new TokContext("{", false), b_expr: new TokContext("{", true), b_tmpl: new TokContext("${", false), p_stat: new TokContext("(", false), p_expr: new TokContext("(", true), q_tmpl: new TokContext("`", true, true,         function(p)
        {
            return p.tryReadTemplateToken();
        }), f_stat: new TokContext("function", false), f_expr: new TokContext("function", true), f_expr_gen: new TokContext("function", true, false, null, true), f_gen: new TokContext("function", false, false, null, true)};
        var pp$9 = Parser.prototype;
        pp$9.initialContext =         function()
        {
            return [types.b_stat];
        };
        pp$9.curContext =         function()
        {
            return this.context[this.context.length - 1];
        };
        pp$9.braceIsBlock =         function(prevType)
        {
            var parent = this.curContext();
            if (parent === types.f_expr || parent === types.f_stat)
            {
                return true;
            }
            if (prevType === types$1.colon && (parent === types.b_stat || parent === types.b_expr))
            {
                return !parent.isExpr;
            }
            if (prevType === types$1._return || prevType === types$1.name && this.exprAllowed)
            {
                return lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
            }
            if (prevType === types$1._else || prevType === types$1.semi || prevType === types$1.eof || prevType === types$1.parenR || prevType === types$1.arrow)
            {
                return true;
            }
            if (prevType === types$1.braceL)
            {
                return parent === types.b_stat;
            }
            if (prevType === types$1._var || prevType === types$1._const || prevType === types$1.name)
            {
                return false;
            }
            return !this.exprAllowed;
        };
        pp$9.inGeneratorContext =         function()
        {
            for (var i = this.context.length - 1; i >= 1; i--)
            {
                var context = this.context[i];
                if (context.token === "function")
                {
                    return context.generator;
                }
            }
            return false;
        };
        pp$9.updateContext =         function(prevType)
        {
            var update,
                type = this.type;
            if (this.type.keyword && prevType === types$1.dot)
            {
                this.exprAllowed = false;
            }
            else if (update = type.updateContext)
            {
                update.call(this, prevType);
            }
            else
            {
                this.exprAllowed = type.beforeExpr;
            }
        };
        pp$9.overrideContext =         function(tokenCtx)
        {
            if (this.curContext() !== tokenCtx)
            {
                this.context[this.context.length - 1] = tokenCtx;
            }
        };
        types$1.parenR.updateContext = types$1.braceR.updateContext =         function()
        {
            if (this.context.length === 1)
            {
                this.exprAllowed = true;
                return;
            }
            var out = this.context.pop();
            if (out === types.b_stat && this.curContext().token === "function")
            {
                out = this.context.pop();
            }
            this.exprAllowed = !out.isExpr;
        };
        types$1.braceL.updateContext =         function(prevType)
        {
            this.context.push(this.braceIsBlock(prevType) ? types.b_stat : types.b_expr);
            this.exprAllowed = true;
        };
        types$1.dollarBraceL.updateContext =         function()
        {
            this.context.push(types.b_tmpl);
            this.exprAllowed = true;
        };
        types$1.parenL.updateContext =         function(prevType)
        {
            var statementParens = prevType === types$1._if || prevType === types$1._for || prevType === types$1._with || prevType === types$1._while;
            this.context.push(statementParens ? types.p_stat : types.p_expr);
            this.exprAllowed = true;
        };
        types$1.incDec.updateContext =         function()
        {
        };
        types$1._function.updateContext = types$1._class.updateContext =         function(prevType)
        {
            if (prevType.beforeExpr && prevType !== types$1._else && !(prevType === types$1.semi && this.curContext() !== types.p_stat) && !(prevType === types$1._return && lineBreak.test(this.input.slice(this.lastTokEnd, this.start))) && !((prevType === types$1.colon || prevType === types$1.braceL) && this.curContext() === types.b_stat))
            {
                this.context.push(types.f_expr);
            }
            else
            {
                this.context.push(types.f_stat);
            }
            this.exprAllowed = false;
        };
        types$1.backQuote.updateContext =         function()
        {
            if (this.curContext() === types.q_tmpl)
            {
                this.context.pop();
            }
            else
            {
                this.context.push(types.q_tmpl);
            }
            this.exprAllowed = false;
        };
        types$1.star.updateContext =         function(prevType)
        {
            if (prevType === types$1._function)
            {
                var index = this.context.length - 1;
                if (this.context[index] === types.f_expr)
                {
                    this.context[index] = types.f_expr_gen;
                }
                else
                {
                    this.context[index] = types.f_gen;
                }
            }
            this.exprAllowed = true;
        };
        types$1.name.updateContext =         function(prevType)
        {
            var allowed = false;
            if (this.options.ecmaVersion >= 6 && prevType !== types$1.dot)
            {
                if (this.value === "of" && !this.exprAllowed || this.value === "yield" && this.inGeneratorContext())
                {
                    allowed = true;
                }
            }
            this.exprAllowed = allowed;
        };
        var pp$8 = Parser.prototype;
        pp$8.checkPropClash =         function(prop, propHash, refDestructuringErrors)
        {
            if (this.options.ecmaVersion >= 9 && prop.type === "SpreadElement")
            {
                return;
            }
            if (this.options.ecmaVersion >= 6 && (prop.computed || prop.method || prop.shorthand))
            {
                return;
            }
            var key = prop.key;
            var name;
            switch(key.type) {
                case "Identifier":
                    name = key.name;
                    break;
                case "Literal":
                    name = String(key.value);
                    break;
default:
                    return;
            }
            var kind = prop.kind;
            if (this.options.ecmaVersion >= 6)
            {
                if (name === "__proto__" && kind === "init")
                {
                    if (propHash.proto)
                    {
                        if (refDestructuringErrors)
                        {
                            if (refDestructuringErrors.doubleProto < 0)
                            {
                                refDestructuringErrors.doubleProto = key.start;
                            }
                        }
                        else
                        {
                            this.raiseRecoverable(key.start, "Redefinition of __proto__ property");
                        }
                    }
                    propHash.proto = true;
                }
                return;
            }
            name = "$" + name;
            var other = propHash[name];
            if (other)
            {
                var redefinition;
                if (kind === "init")
                {
                    redefinition = this.strict && other.init || other.get || other.set;
                }
                else
                {
                    redefinition = other.init || other[kind];
                }
                if (redefinition)
                {
                    this.raiseRecoverable(key.start, "Redefinition of property");
                }
            }
            else
            {
                other = propHash[name] = {init: false, get: false, set: false};
            }
            other[kind] = true;
        };
        pp$8.parseExpression =         function(forInit, refDestructuringErrors, noComma, noIn)
        {
            var startPos = this.start + this.tokMacroOffset,
                startLoc = this.startLoc;
            var expr = this.parseMaybeAssign(forInit, refDestructuringErrors);
            if (!noComma && this.type === types$1.comma)
            {
                var node = this.startNodeAt(startPos, startLoc);
                node.expressions = [expr];
                while (this.eat(types$1.comma))
                {
                    node.expressions.push(this.parseMaybeAssign(forInit, refDestructuringErrors));
                }
                return this.finishNode(node, "SequenceExpression");
            }
            return expr;
        };
        pp$8.parseMaybeAssign =         function(forInit, refDestructuringErrors, afterLeftParse)
        {
            if (this.isContextual("yield"))
            {
                if (this.inGenerator)
                {
                    return this.parseYield(forInit);
                }
                else
                {
                    this.exprAllowed = false;
                }
            }
            var ownDestructuringErrors = false,
                oldParenAssign = -1,
                oldTrailingComma = -1,
                oldDoubleProto = -1;
            if (refDestructuringErrors)
            {
                oldParenAssign = refDestructuringErrors.parenthesizedAssign;
                oldTrailingComma = refDestructuringErrors.trailingComma;
                oldDoubleProto = refDestructuringErrors.doubleProto;
                refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = -1;
            }
            else
            {
                refDestructuringErrors = new DestructuringErrors();
                ownDestructuringErrors = true;
            }
            var startPos = this.start + this.tokMacroOffset,
                startLoc = this.startLoc;
            if (this.type === types$1.parenL || this.type === types$1.name)
            {
                this.potentialArrowAt = this.start;
                this.potentialArrowInForAwait = forInit === "await";
            }
            var left = this.parseMaybeConditional(forInit, refDestructuringErrors);
            if (afterLeftParse)
            {
                left = afterLeftParse.call(this, left, startPos, startLoc);
            }
            if (this.type.isAssign)
            {
                var node = this.startNodeAt(startPos, startLoc);
                node.operator = this.value;
                if (this.type === types$1.eq)
                {
                    left = this.toAssignable(left, false, refDestructuringErrors);
                }
                if (!ownDestructuringErrors)
                {
                    refDestructuringErrors.parenthesizedAssign = refDestructuringErrors.trailingComma = refDestructuringErrors.doubleProto = -1;
                }
                if (refDestructuringErrors.shorthandAssign >= left.start)
                {
                    refDestructuringErrors.shorthandAssign = -1;
                }
                if (this.type === types$1.eq)
                {
                    this.checkLValPattern(left);
                }
                else
                {
                    this.checkLValSimple(left);
                }
                node.left = left;
                this.next();
                node.right = this.parseMaybeAssign(forInit);
                if (oldDoubleProto > -1)
                {
                    refDestructuringErrors.doubleProto = oldDoubleProto;
                }
                return this.finishNode(node, "AssignmentExpression");
            }
            else
            {
                if (ownDestructuringErrors)
                {
                    this.checkExpressionErrors(refDestructuringErrors, true);
                }
            }
            if (oldParenAssign > -1)
            {
                refDestructuringErrors.parenthesizedAssign = oldParenAssign;
            }
            if (oldTrailingComma > -1)
            {
                refDestructuringErrors.trailingComma = oldTrailingComma;
            }
            return left;
        };
        pp$8.parseMaybeConditional =         function(forInit, refDestructuringErrors)
        {
            var startPos = this.start + this.tokMacroOffset,
                startLoc = this.startLoc;
            var expr = this.parseExprOps(forInit, refDestructuringErrors);
            if (this.checkExpressionErrors(refDestructuringErrors))
            {
                return expr;
            }
            if (this.eat(types$1.question))
            {
                var node = this.startNodeAt(startPos, startLoc);
                node.test = expr;
                node.consequent = this.parseMaybeAssign();
                this.expect(types$1.colon);
                node.alternate = this.parseMaybeAssign(forInit);
                return this.finishNode(node, "ConditionalExpression");
            }
            return expr;
        };
        pp$8.parseExprOps =         function(forInit, refDestructuringErrors)
        {
            var startPos = this.start + this.tokMacroOffset,
                startLoc = this.startLoc;
            var expr = this.parseMaybeUnary(refDestructuringErrors, false, false, forInit);
            if (this.checkExpressionErrors(refDestructuringErrors))
            {
                return expr;
            }
            return expr.start === startPos && expr.type === "ArrowFunctionExpression" ? expr : this.parseExprOp(expr, startPos, startLoc, -1, forInit);
        };
        pp$8.parseExprOp =         function(left, leftStartPos, leftStartLoc, minPrec, forInit)
        {
            var prec = this.type.binop;
            if (prec != null && (!forInit || this.type !== types$1._in))
            {
                if (prec > minPrec)
                {
                    var logical = this.type === types$1.logicalOR || this.type === types$1.logicalAND;
                    var coalesce = this.type === types$1.coalesce;
                    if (coalesce)
                    {
                        prec = types$1.logicalAND.binop;
                    }
                    var op = this.value;
                    var isIn = this.type === types$1._in;
                    this.next();
                    if (isIn && this.type === types$1.colon)
                    {
                        this.inIsIdentifier = true;
                        return left;
                    }
                    var startPos = this.start + this.tokMacroOffset,
                        startLoc = this.startLoc;
                    var right = this.parseExprOp(this.parseMaybeUnary(null, false, false, forInit), startPos, startLoc, prec, forInit);
                    var node = this.buildBinary(leftStartPos, leftStartLoc, left, right, op, logical || coalesce);
                    if (logical && this.type === types$1.coalesce || coalesce && (this.type === types$1.logicalOR || this.type === types$1.logicalAND))
                    {
                        this.raiseRecoverable(this.start, "Logical expressions and coalesce expressions cannot be mixed. Wrap either by parentheses");
                    }
                    return this.parseExprOp(node, leftStartPos, leftStartLoc, minPrec, forInit);
                }
            }
            return left;
        };
        pp$8.buildBinary =         function(startPos, startLoc, left, right, op, logical)
        {
            if (right.type === "PrivateIdentifier")
            {
                this.raise(right.start, "Private identifier can only be left side of binary expression");
            }
            var node = this.startNodeAt(startPos, startLoc);
            node.left = left;
            node.operator = op;
            node.right = right;
            return this.finishNode(node, logical ? "LogicalExpression" : "BinaryExpression");
        };
        pp$8.parseMaybeUnary =         function(refDestructuringErrors, sawUnary, incDec, forInit)
        {
            var startPos = this.start + this.tokMacroOffset,
                startLoc = this.startLoc,
                expr;
            if (this.isContextual("await") && this.canAwait)
            {
                expr = this.parseAwait(forInit);
                sawUnary = true;
            }
            else if (this.type.prefix)
            {
                var node = this.startNode(),
                    update = this.type === types$1.incDec;
                node.operator = this.value;
                node.prefix = true;
                this.next();
                node.argument = this.parseMaybeUnary(null, true, update, forInit);
                this.checkExpressionErrors(refDestructuringErrors, true);
                if (update)
                {
                    this.checkLValSimple(node.argument);
                }
                else if (this.strict && node.operator === "delete" && node.argument.type === "Identifier")
                {
                    this.raiseRecoverable(node.start, "Deleting local variable in strict mode");
                }
                else if (node.operator === "delete" && isPrivateFieldAccess(node.argument))
                {
                    this.raiseRecoverable(node.start, "Private fields can not be deleted");
                }
                else
                {
                    sawUnary = true;
                }
                expr = this.finishNode(node, update ? "UpdateExpression" : "UnaryExpression");
            }
            else if (!sawUnary && this.type === types$1.privateId)
            {
                if (forInit || this.privateNameStack.length === 0)
                {
                    this.unexpected();
                }
                expr = this.parsePrivateIdent();
                if (this.type !== types$1._in)
                {
                    this.unexpected();
                }
            }
            else
            {
                expr = this.parseExprSubscripts(refDestructuringErrors, forInit);
                if (this.checkExpressionErrors(refDestructuringErrors))
                {
                    return expr;
                }
                while (this.type.postfix && !this.canInsertSemicolon())
                {
                    var node$1 = this.startNodeAt(startPos, startLoc);
                    node$1.operator = this.value;
                    node$1.prefix = false;
                    node$1.argument = expr;
                    this.checkLValSimple(expr);
                    this.next();
                    expr = this.finishNode(node$1, "UpdateExpression");
                }
            }
            if (!incDec && this.eat(types$1.starstar))
            {
                if (sawUnary)
                {
                    this.unexpected(this.lastTokStart);
                }
                else
                {
                    return this.buildBinary(startPos, startLoc, expr, this.parseMaybeUnary(null, false, false, forInit), "**", false);
                }
            }
            else
            {
                return expr;
            }
        };
        function isPrivateFieldAccess(node)
        {
            return node.type === "MemberExpression" && node.property.type === "PrivateIdentifier" || node.type === "ChainExpression" && isPrivateFieldAccess(node.expression);
        }
        pp$8.parseExprSubscripts =         function(refDestructuringErrors, forInit)
        {
            var startPos = this.start + this.tokMacroOffset,
                startLoc = this.startLoc;
            var expr = this.parseExprAtom(refDestructuringErrors, forInit);
            if (expr.type === "ArrowFunctionExpression" && this.input.slice(this.lastTokStart, this.lastTokEnd) !== ")")
            {
                return expr;
            }
            var result = this.parseSubscripts(expr, startPos, startLoc, false, forInit);
            if (refDestructuringErrors && result.type === "MemberExpression")
            {
                if (refDestructuringErrors.parenthesizedAssign >= result.start)
                {
                    refDestructuringErrors.parenthesizedAssign = -1;
                }
                if (refDestructuringErrors.parenthesizedBind >= result.start)
                {
                    refDestructuringErrors.parenthesizedBind = -1;
                }
                if (refDestructuringErrors.trailingComma >= result.start)
                {
                    refDestructuringErrors.trailingComma = -1;
                }
            }
            return result;
        };
        pp$8.parseSubscripts =         function(base, startPos, startLoc, noCalls, forInit)
        {
            var maybeAsyncArrow = this.options.ecmaVersion >= 8 && base.type === "Identifier" && base.name === "async" && this.lastTokEnd === base.end && !this.canInsertSemicolon() && base.end - base.start === 5 && this.potentialArrowAt === base.start;
            var optionalChained = false;
            while (true)
            {
                var element = this.parseSubscript(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit);
                if (element.optional)
                {
                    optionalChained = true;
                }
                if (element === base || element.type === "ArrowFunctionExpression")
                {
                    if (optionalChained)
                    {
                        var chainNode = this.startNodeAt(startPos, startLoc);
                        chainNode.expression = element;
                        element = this.finishNode(chainNode, "ChainExpression");
                    }
                    return element;
                }
                base = element;
            }
        };
        pp$8.parseSubscript =         function(base, startPos, startLoc, noCalls, maybeAsyncArrow, optionalChained, forInit)
        {
            var optionalSupported = this.options.ecmaVersion >= 11;
            var optional = optionalSupported && this.eat(types$1.questionDot);
            if (noCalls && optional)
            {
                this.raise(this.lastTokStart, "Optional chaining cannot appear in the callee of new expressions");
            }
            var messageSendNode,
                canInsertSemi;
            if (this.options.objj)
            {
                messageSendNode = this.startNode();
                canInsertSemi = this.canInsertSemicolon();
            }
            var computed = this.eat(types$1.bracketL);
            if (computed || optional && this.type !== types$1.parenL && this.type !== types$1.backQuote || this.eat(types$1.dot))
            {
                var node = this.startNodeAt(startPos, startLoc);
                node.object = base;
                if (computed)
                {
                    node.property = this.parseExpression();
                    if (this.options.objj && this.type !== types$1.bracketR)
                    {
                        messageSendNode.object = node.property;
                        messageSendNode.canInsertSemicolonBefore = canInsertSemi;
                        this.nodeMessageSendObjectExpression = messageSendNode;
                        return base;
                    }
                    this.expect(types$1.bracketR);
                }
                else if (this.type === types$1.privateId && base.type !== "Super")
                {
                    node.property = this.parsePrivateIdent();
                }
                else
                {
                    node.property = this.parseIdent(this.options.allowReserved !== "never");
                }
                node.computed = !!computed;
                if (optionalSupported)
                {
                    node.optional = optional;
                }
                base = this.finishNode(node, "MemberExpression");
            }
            else if (!noCalls && this.eat(types$1.parenL))
            {
                var refDestructuringErrors = new DestructuringErrors(),
                    oldYieldPos = this.yieldPos,
                    oldAwaitPos = this.awaitPos,
                    oldAwaitIdentPos = this.awaitIdentPos;
                this.yieldPos = 0;
                this.awaitPos = 0;
                this.awaitIdentPos = 0;
                var exprList = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, false, refDestructuringErrors);
                if (maybeAsyncArrow && !optional && !this.canInsertSemicolon() && this.eat(types$1.arrow))
                {
                    this.checkPatternErrors(refDestructuringErrors, false);
                    this.checkYieldAwaitInDefaultParams();
                    if (this.awaitIdentPos > 0)
                    {
                        this.raise(this.awaitIdentPos, "Cannot use 'await' as identifier inside an async function");
                    }
                    this.yieldPos = oldYieldPos;
                    this.awaitPos = oldAwaitPos;
                    this.awaitIdentPos = oldAwaitIdentPos;
                    return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, true, forInit);
                }
                this.checkExpressionErrors(refDestructuringErrors, true);
                this.yieldPos = oldYieldPos || this.yieldPos;
                this.awaitPos = oldAwaitPos || this.awaitPos;
                this.awaitIdentPos = oldAwaitIdentPos || this.awaitIdentPos;
                var node$1 = this.startNodeAt(startPos, startLoc);
                node$1.callee = base;
                node$1.arguments = exprList;
                if (optionalSupported)
                {
                    node$1.optional = optional;
                }
                base = this.finishNode(node$1, "CallExpression");
            }
            else if (this.type === types$1.backQuote)
            {
                if (optional || optionalChained)
                {
                    this.raise(this.start, "Optional chaining cannot appear in the tag of tagged template expressions");
                }
                var node$2 = this.startNodeAt(startPos, startLoc);
                node$2.tag = base;
                node$2.quasi = this.parseTemplate({isTagged: true});
                base = this.finishNode(node$2, "TaggedTemplateExpression");
            }
            return base;
        };
        pp$8.parseExprAtom =         function(refDestructuringErrors, forInit)
        {
            if (this.type === types$1.slash)
            {
                this.readRegexp();
            }
            var node,
                canBeArrow = this.potentialArrowAt === this.start;
            switch(this.type) {
                case types$1._super:
                    if (!this.allowSuper)
                    {
                        this.raise(this.start, "'super' keyword outside a method");
                    }
                    node = this.startNode();
                    this.next();
                    if (this.type === types$1.parenL && !this.allowDirectSuper)
                    {
                        this.raise(node.start, "super() call outside constructor of a subclass");
                    }
                    if (this.type !== types$1.dot && this.type !== types$1.bracketL && this.type !== types$1.parenL && (!this.options.objj || this.type !== types$1.name))
                    {
                        this.unexpected();
                    }
                    return this.finishNode(node, "Super");
                case types$1._this:
                    node = this.startNode();
                    this.next();
                    return this.finishNode(node, "ThisExpression");
                case types$1.name:
                case objjTypes._id:
                case objjTypes._char:
                case objjTypes._long:
                case objjTypes._short:
                    var startPos = this.start + this.tokMacroOffset,
                        startLoc = this.startLoc,
                        containsEsc = this.containsEsc;
                    var id = this.parseIdent(false);
                    if (this.options.ecmaVersion >= 8 && !containsEsc && id.name === "async" && !this.canInsertSemicolon() && this.eat(types$1._function))
                    {
                        this.overrideContext(types.f_expr);
                        return this.parseFunction(this.startNodeAt(startPos, startLoc), 0, false, true, forInit);
                    }
                    if (canBeArrow && !this.canInsertSemicolon())
                    {
                        if (this.eat(types$1.arrow))
                        {
                            return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], false, forInit);
                        }
                        if (this.options.ecmaVersion >= 8 && id.name === "async" && this.type === types$1.name && !containsEsc && (!this.potentialArrowInForAwait || this.value !== "of" || this.containsEsc))
                        {
                            id = this.parseIdent(false);
                            if (this.canInsertSemicolon() || !this.eat(types$1.arrow))
                            {
                                this.unexpected();
                            }
                            return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), [id], true, forInit);
                        }
                    }
                    return id;
                case types$1.regexp:
                    var value = this.value;
                    node = this.parseLiteral(value.value);
                    node.regex = {pattern: value.pattern, flags: value.flags};
                    return node;
                case types$1.num:
                case types$1.string:
                    return this.parseLiteral(this.value);
                case types$1._null:
                case types$1._true:
                case types$1._false:
                    node = this.startNode();
                    node.value = this.type === types$1._null ? null : this.type === types$1._true;
                    node.raw = this.type.keyword;
                    this.next();
                    return this.finishNode(node, "Literal");
                case types$1.parenL:
                    var start = this.start,
                        expr = this.parseParenAndDistinguishExpression(canBeArrow, forInit);
                    if (refDestructuringErrors)
                    {
                        if (refDestructuringErrors.parenthesizedAssign < 0 && !this.isSimpleAssignTarget(expr))
                        {
                            refDestructuringErrors.parenthesizedAssign = start;
                        }
                        if (refDestructuringErrors.parenthesizedBind < 0)
                        {
                            refDestructuringErrors.parenthesizedBind = start;
                        }
                    }
                    return expr;
                case types$1.bracketL:
                    node = this.startNode();
                    this.next();
                    var firstExpr = null;
                    if (this.type === types$1.ellipsis)
                    {
                        firstExpr = this.parseSpread(refDestructuringErrors);
                        if (refDestructuringErrors && this.type === types$1.comma && refDestructuringErrors.trailingComma < 0)
                        {
                            refDestructuringErrors.trailingComma = this.start;
                        }
                    }
                    else if (this.type !== types$1.comma && this.type !== types$1.bracketR)
                    {
                        firstExpr = this.parseExpression(false, refDestructuringErrors, true, true);
                        if (this.type !== types$1.comma && this.type !== types$1.bracketR)
                        {
                            return this.parseObjjMessageSendExpression(node, firstExpr);
                        }
                    }
                    node.elements = this.parseExprList(types$1.bracketR, true, true, refDestructuringErrors, firstExpr);
                    return this.finishNode(node, "ArrayExpression");
                case types$1.braceL:
                    this.overrideContext(types.b_expr);
                    return this.parseObj(false, refDestructuringErrors);
                case types$1._function:
                    node = this.startNode();
                    this.next();
                    return this.parseFunction(node, 0);
                case types$1._class:
                    return this.parseClass(this.startNode(), false);
                case types$1._new:
                    return this.parseNew();
                case types$1.backQuote:
                    return this.parseTemplate();
                case types$1._import:
                    if (this.options.ecmaVersion >= 11)
                    {
                        return this.parseExprImport();
                    }
                    else
                    {
                        return this.unexpected();
                    }
                case objjAtTypes._selector:
                    node = this.startNode();
                    this.next();
                    this.expect(types$1.parenL, "Expected '(' after '@selector'");
                    this.parseObjjSelector(node, types$1.parenR);
                    this.expect(types$1.parenR, "Expected closing ')' after selector");
                    return this.finishNode(node, "SelectorLiteralExpression");
                case objjAtTypes._ref:
                    node = this.startNode();
                    this.next();
                    this.expect(types$1.parenL, "Expected '(' after '@ref'");
                    node.element = this.parseIdent(node, types$1.parenR);
                    this.expect(types$1.parenR, "Expected closing ')' after ref");
                    return this.finishNode(node, "Reference");
                case objjAtTypes._deref:
                    node = this.startNode();
                    this.next();
                    this.expect(types$1.parenL, "Expected '(' after '@deref'");
                    node.expr = this.parseExpression(true, refDestructuringErrors, true, true);
                    this.expect(types$1.parenR, "Expected closing ')' after deref");
                    return this.finishNode(node, "Dereference");
                case objjAtTypes._dictionaryLiteral:
                    node = this.startNode();
                    this.next();
                    var r = this.parseObjjDictionary();
                    node.keys = r[0];
                    node.values = r[1];
                    return this.finishNode(node, "DictionaryLiteral");
                case objjAtTypes._arrayLiteral:
                    node = this.startNode();
                    firstExpr = null;
                    this.next();
                    this.expect(types$1.bracketL, "Expected '[' at beginning of array literal");
                    if (this.type !== types$1.bracketR)
                    {
                        firstExpr = this.parseExpression(true, refDestructuringErrors, true, true);
                    }
                    node.elements = this.parseExprList(types$1.bracketR, true, true, refDestructuringErrors, firstExpr);
                    return this.finishNode(node, "ArrayLiteral");
                case objjAtTypes._protocol:
                    node = this.startNode();
                    this.next();
                    this.expect(types$1.parenL, "Expected '(' after '@protocol'");
                    node.id = this.parseIdent(true);
                    this.expect(types$1.parenR, "Expected closing ')' after protocol name");
                    return this.finishNode(node, "ProtocolLiteralExpression");
default:
                    this.unexpected();
            }
        };
        pp$8.parseExprImport =         function()
        {
            var node = this.startNode();
            if (this.containsEsc)
            {
                this.raiseRecoverable(this.start, "Escape sequence in keyword import");
            }
            var meta = this.parseIdent(true);
            switch(this.type) {
                case types$1.parenL:
                    return this.parseDynamicImport(node);
                case types$1.dot:
                    node.meta = meta;
                    return this.parseImportMeta(node);
default:
                    this.unexpected();
            }
        };
        pp$8.parseDynamicImport =         function(node)
        {
            this.next();
            node.source = this.parseMaybeAssign();
            if (!this.eat(types$1.parenR))
            {
                var errorPos = this.start;
                if (this.eat(types$1.comma) && this.eat(types$1.parenR))
                {
                    this.raiseRecoverable(errorPos, "Trailing comma is not allowed in import()");
                }
                else
                {
                    this.unexpected(errorPos);
                }
            }
            return this.finishNode(node, "ImportExpression");
        };
        pp$8.parseImportMeta =         function(node)
        {
            this.next();
            var containsEsc = this.containsEsc;
            node.property = this.parseIdent(true);
            if (node.property.name !== "meta")
            {
                this.raiseRecoverable(node.property.start, "The only valid meta property for import is 'import.meta'");
            }
            if (containsEsc)
            {
                this.raiseRecoverable(node.start, "'import.meta' must not contain escaped characters");
            }
            if (this.options.sourceType !== "module" && !this.options.allowImportExportEverywhere)
            {
                this.raiseRecoverable(node.start, "Cannot use 'import.meta' outside a module");
            }
            return this.finishNode(node, "MetaProperty");
        };
        pp$8.parseLiteral =         function(value)
        {
            var node = this.startNode();
            node.value = value;
            node.raw = this.tokInput.slice(this.start, this.end);
            if (node.raw.charCodeAt(node.raw.length - 1) === 110)
            {
                node.bigint = node.raw.slice(0, -1).replace(/_/g, "");
            }
            this.next();
            return this.finishNode(node, "Literal");
        };
        pp$8.parseParenExpression =         function()
        {
            this.expect(types$1.parenL);
            var val = this.parseExpression();
            this.expect(types$1.parenR);
            return val;
        };
        pp$8.parseParenAndDistinguishExpression =         function(canBeArrow, forInit)
        {
            var startPos = this.start + this.tokMacroOffset,
                startLoc = this.startLoc,
                val,
                allowTrailingComma = this.options.ecmaVersion >= 8;
            if (this.options.ecmaVersion >= 6)
            {
                this.next();
                var innerStartPos = this.start + this.tokMacroOffset,
                    innerStartLoc = this.startLoc;
                var exprList = [],
                    first = true,
                    lastIsComma = false;
                var refDestructuringErrors = new DestructuringErrors(),
                    oldYieldPos = this.yieldPos,
                    oldAwaitPos = this.awaitPos,
                    spreadStart;
                this.yieldPos = 0;
                this.awaitPos = 0;
                while (this.type !== types$1.parenR)
                {
                    first ? first = false : this.expect(types$1.comma);
                    if (allowTrailingComma && this.afterTrailingComma(types$1.parenR, true))
                    {
                        lastIsComma = true;
                        break;
                    }
                    else if (this.type === types$1.ellipsis)
                    {
                        spreadStart = this.start;
                        exprList.push(this.parseParenItem(this.parseRestBinding()));
                        if (this.type === types$1.comma)
                        {
                            this.raise(this.start, "Comma is not permitted after the rest element");
                        }
                        break;
                    }
                    else
                    {
                        exprList.push(this.parseMaybeAssign(false, refDestructuringErrors, this.parseParenItem));
                    }
                }
                var innerEndPos = this.lastTokEnd + this.lastTokMacroOffset,
                    innerEndLoc = this.lastTokEndLoc;
                this.expect(types$1.parenR);
                if (canBeArrow && !this.canInsertSemicolon() && this.eat(types$1.arrow))
                {
                    this.checkPatternErrors(refDestructuringErrors, false);
                    this.checkYieldAwaitInDefaultParams();
                    this.yieldPos = oldYieldPos;
                    this.awaitPos = oldAwaitPos;
                    return this.parseParenArrowList(startPos, startLoc, exprList, forInit);
                }
                if (!exprList.length || lastIsComma)
                {
                    this.unexpected(this.lastTokStart);
                }
                if (spreadStart)
                {
                    this.unexpected(spreadStart);
                }
                this.checkExpressionErrors(refDestructuringErrors, true);
                this.yieldPos = oldYieldPos || this.yieldPos;
                this.awaitPos = oldAwaitPos || this.awaitPos;
                if (exprList.length > 1)
                {
                    val = this.startNodeAt(innerStartPos, innerStartLoc);
                    val.expressions = exprList;
                    this.finishNodeAt(val, "SequenceExpression", innerEndPos, innerEndLoc);
                }
                else
                {
                    val = exprList[0];
                }
            }
            else
            {
                val = this.parseParenExpression();
            }
            if (this.options.preserveParens)
            {
                var par = this.startNodeAt(startPos, startLoc);
                par.expression = val;
                return this.finishNode(par, "ParenthesizedExpression");
            }
            else
            {
                return val;
            }
        };
        pp$8.parseParenItem =         function(item)
        {
            return item;
        };
        pp$8.parseParenArrowList =         function(startPos, startLoc, exprList, forInit)
        {
            return this.parseArrowExpression(this.startNodeAt(startPos, startLoc), exprList, false, forInit);
        };
        var empty = [];
        pp$8.parseNew =         function()
        {
            if (this.containsEsc)
            {
                this.raiseRecoverable(this.start, "Escape sequence in keyword new");
            }
            var node = this.startNode();
            var meta = this.parseIdent(true);
            if (this.options.ecmaVersion >= 6 && this.eat(types$1.dot))
            {
                node.meta = meta;
                var containsEsc = this.containsEsc;
                node.property = this.parseIdent(true);
                if (node.property.name !== "target")
                {
                    this.raiseRecoverable(node.property.start, "The only valid meta property for new is 'new.target'");
                }
                if (containsEsc)
                {
                    this.raiseRecoverable(node.start, "'new.target' must not contain escaped characters");
                }
                if (!this.allowNewDotTarget)
                {
                    this.raiseRecoverable(node.start, "'new.target' can only be used in functions and class static block");
                }
                return this.finishNode(node, "MetaProperty");
            }
            var startPos = this.start + this.tokMacroOffset,
                startLoc = this.startLoc,
                isImport = this.type === types$1._import;
            node.callee = this.parseSubscripts(this.parseExprAtom(), startPos, startLoc, true, false);
            if (isImport && node.callee.type === "ImportExpression")
            {
                this.raise(startPos, "Cannot use new with import()");
            }
            if (this.eat(types$1.parenL))
            {
                node.arguments = this.parseExprList(types$1.parenR, this.options.ecmaVersion >= 8, false);
            }
            else
            {
                node.arguments = empty;
            }
            return this.finishNode(node, "NewExpression");
        };
        pp$8.parseTemplateElement =         function(ref)
        {
            var isTagged = ref.isTagged;
            var elem = this.startNode();
            if (this.type === types$1.invalidTemplate)
            {
                if (!isTagged)
                {
                    this.raiseRecoverable(this.start, "Bad escape sequence in untagged template literal");
                }
                elem.value = {raw: this.value, cooked: null};
            }
            else
            {
                elem.value = {raw: this.input.slice(this.start, this.end).replace(/\r\n?/g, "\n"), cooked: this.value};
            }
            this.next();
            elem.tail = this.type === types$1.backQuote;
            return this.finishNode(elem, "TemplateElement");
        };
        pp$8.parseTemplate =         function(ref)
        {
            if (ref === void 0)
                ref = {};
            var isTagged = ref.isTagged;
            if (isTagged === void 0)
                isTagged = false;
            var node = this.startNode();
            this.next();
            node.expressions = [];
            var curElt = this.parseTemplateElement({isTagged: isTagged});
            node.quasis = [curElt];
            while (!curElt.tail)
            {
                if (this.type === types$1.eof)
                {
                    this.raise(this.pos, "Unterminated template literal");
                }
                this.expect(types$1.dollarBraceL);
                node.expressions.push(this.parseExpression());
                this.expect(types$1.braceR);
                node.quasis.push(curElt = this.parseTemplateElement({isTagged: isTagged}));
            }
            this.next();
            return this.finishNode(node, "TemplateLiteral");
        };
        pp$8.isAsyncProp =         function(prop)
        {
            return !prop.computed && prop.key.type === "Identifier" && prop.key.name === "async" && (this.type === types$1.name || this.type === types$1.num || this.type === types$1.string || this.type === types$1.bracketL || this.type.keyword || this.options.ecmaVersion >= 9 && this.type === types$1.star) && !lineBreak.test(this.input.slice(this.lastTokEnd, this.start));
        };
        pp$8.parseObj =         function(isPattern, refDestructuringErrors)
        {
            var node = this.startNode(),
                first = true,
                propHash = {};
            node.properties = [];
            this.next();
            while (!this.eat(types$1.braceR))
            {
                if (!first)
                {
                    this.expect(types$1.comma);
                    if (this.options.ecmaVersion >= 5 && this.afterTrailingComma(types$1.braceR))
                    {
                        break;
                    }
                }
                else
                {
                    first = false;
                }
                var prop = this.parseProperty(isPattern, refDestructuringErrors);
                if (!isPattern)
                {
                    this.checkPropClash(prop, propHash, refDestructuringErrors);
                }
                node.properties.push(prop);
            }
            return this.finishNode(node, isPattern ? "ObjectPattern" : "ObjectExpression");
        };
        pp$8.parseProperty =         function(isPattern, refDestructuringErrors)
        {
            var prop = this.startNode(),
                isGenerator,
                isAsync,
                startPos,
                startLoc;
            if (this.options.ecmaVersion >= 9 && this.eat(types$1.ellipsis))
            {
                if (isPattern)
                {
                    prop.argument = this.parseIdent(false);
                    if (this.type === types$1.comma)
                    {
                        this.raise(this.start, "Comma is not permitted after the rest element");
                    }
                    return this.finishNode(prop, "RestElement");
                }
                prop.argument = this.parseMaybeAssign(false, refDestructuringErrors);
                if (this.type === types$1.comma && refDestructuringErrors && refDestructuringErrors.trailingComma < 0)
                {
                    refDestructuringErrors.trailingComma = this.start;
                }
                return this.finishNode(prop, "SpreadElement");
            }
            if (this.options.ecmaVersion >= 6)
            {
                prop.method = false;
                prop.shorthand = false;
                if (isPattern || refDestructuringErrors)
                {
                    startPos = this.start + this.tokMacroOffset;
                    startLoc = this.startLoc;
                }
                if (!isPattern)
                {
                    isGenerator = this.eat(types$1.star);
                }
            }
            var containsEsc = this.containsEsc;
            this.parsePropertyName(prop);
            if (!isPattern && !containsEsc && this.options.ecmaVersion >= 8 && !isGenerator && this.isAsyncProp(prop))
            {
                isAsync = true;
                isGenerator = this.options.ecmaVersion >= 9 && this.eat(types$1.star);
                this.parsePropertyName(prop, refDestructuringErrors);
            }
            else
            {
                isAsync = false;
            }
            this.parsePropertyValue(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc);
            return this.finishNode(prop, "Property");
        };
        pp$8.parsePropertyValue =         function(prop, isPattern, isGenerator, isAsync, startPos, startLoc, refDestructuringErrors, containsEsc)
        {
            if ((isGenerator || isAsync) && this.type === types$1.colon)
            {
                this.unexpected();
            }
            if (this.eat(types$1.colon))
            {
                prop.value = isPattern ? this.parseMaybeDefault(this.start, this.startLoc) : this.parseMaybeAssign(false, refDestructuringErrors);
                prop.kind = "init";
            }
            else if (this.options.ecmaVersion >= 6 && this.type === types$1.parenL)
            {
                if (isPattern)
                {
                    this.unexpected();
                }
                prop.kind = "init";
                prop.method = true;
                prop.value = this.parseMethod(isGenerator, isAsync);
            }
            else if (!isPattern && !containsEsc && this.options.ecmaVersion >= 5 && !prop.computed && prop.key.type === "Identifier" && (prop.key.name === "get" || prop.key.name === "set") && (this.type !== types$1.comma && this.type !== types$1.braceR && this.type !== types$1.eq))
            {
                if (isGenerator || isAsync)
                {
                    this.unexpected();
                }
                prop.kind = prop.key.name;
                this.parsePropertyName(prop);
                prop.value = this.parseMethod(false);
                var paramCount = prop.kind === "get" ? 0 : 1;
                if (prop.value.params.length !== paramCount)
                {
                    var start = prop.value.start;
                    if (prop.kind === "get")
                    {
                        this.raiseRecoverable(start, "getter should have no params");
                    }
                    else
                    {
                        this.raiseRecoverable(start, "setter should have exactly one param");
                    }
                }
                else
                {
                    if (prop.kind === "set" && prop.value.params[0].type === "RestElement")
                    {
                        this.raiseRecoverable(prop.value.params[0].start, "Setter cannot use rest params");
                    }
                }
            }
            else if (this.options.ecmaVersion >= 6 && !prop.computed && prop.key.type === "Identifier")
            {
                if (isGenerator || isAsync)
                {
                    this.unexpected();
                }
                this.checkUnreserved(prop.key);
                if (prop.key.name === "await" && !this.awaitIdentPos)
                {
                    this.awaitIdentPos = startPos;
                }
                prop.kind = "init";
                if (isPattern)
                {
                    prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key));
                }
                else if (this.type === types$1.eq && refDestructuringErrors)
                {
                    if (refDestructuringErrors.shorthandAssign < 0)
                    {
                        refDestructuringErrors.shorthandAssign = this.start;
                    }
                    prop.value = this.parseMaybeDefault(startPos, startLoc, this.copyNode(prop.key));
                }
                else
                {
                    prop.value = this.copyNode(prop.key);
                }
                prop.shorthand = true;
            }
            else
            {
                this.unexpected();
            }
        };
        pp$8.parsePropertyName =         function(prop)
        {
            if (this.options.ecmaVersion >= 6)
            {
                if (this.eat(types$1.bracketL))
                {
                    prop.computed = true;
                    prop.key = this.parseMaybeAssign();
                    this.expect(types$1.bracketR);
                    return prop.key;
                }
                else
                {
                    prop.computed = false;
                }
            }
            return prop.key = this.type === types$1.num || this.type === types$1.string ? this.parseExprAtom() : this.parseIdent(this.options.allowReserved !== "never");
        };
        pp$8.initFunction =         function(node)
        {
            node.id = null;
            if (this.options.ecmaVersion >= 6)
            {
                node.generator = node.expression = false;
            }
            if (this.options.ecmaVersion >= 8)
            {
                node.async = false;
            }
        };
        pp$8.parseMethod =         function(isGenerator, isAsync, allowDirectSuper)
        {
            var node = this.startNode(),
                oldYieldPos = this.yieldPos,
                oldAwaitPos = this.awaitPos,
                oldAwaitIdentPos = this.awaitIdentPos;
            this.initFunction(node);
            if (this.options.ecmaVersion >= 6)
            {
                node.generator = isGenerator;
            }
            if (this.options.ecmaVersion >= 8)
            {
                node.async = !!isAsync;
            }
            this.yieldPos = 0;
            this.awaitPos = 0;
            this.awaitIdentPos = 0;
            this.enterScope(functionFlags(isAsync, node.generator) | SCOPE_SUPER | (allowDirectSuper ? SCOPE_DIRECT_SUPER : 0));
            this.expect(types$1.parenL);
            node.params = this.parseBindingList(types$1.parenR, false, this.options.ecmaVersion >= 8);
            this.checkYieldAwaitInDefaultParams();
            this.parseFunctionBody(node, false, true, false);
            this.yieldPos = oldYieldPos;
            this.awaitPos = oldAwaitPos;
            this.awaitIdentPos = oldAwaitIdentPos;
            return this.finishNode(node, "FunctionExpression");
        };
        pp$8.parseArrowExpression =         function(node, params, isAsync, forInit)
        {
            var oldYieldPos = this.yieldPos,
                oldAwaitPos = this.awaitPos,
                oldAwaitIdentPos = this.awaitIdentPos;
            this.enterScope(functionFlags(isAsync, false) | SCOPE_ARROW);
            this.initFunction(node);
            if (this.options.ecmaVersion >= 8)
            {
                node.async = !!isAsync;
            }
            this.yieldPos = 0;
            this.awaitPos = 0;
            this.awaitIdentPos = 0;
            node.params = this.toAssignableList(params, true);
            this.parseFunctionBody(node, true, false, forInit);
            this.yieldPos = oldYieldPos;
            this.awaitPos = oldAwaitPos;
            this.awaitIdentPos = oldAwaitIdentPos;
            return this.finishNode(node, "ArrowFunctionExpression");
        };
        pp$8.parseFunctionBody =         function(node, isArrowFunction, isMethod, forInit)
        {
            var isExpression = isArrowFunction && this.type !== types$1.braceL;
            var oldStrict = this.strict,
                useStrict = false;
            if (isExpression)
            {
                node.body = this.parseMaybeAssign(forInit);
                node.expression = true;
                this.checkParams(node, false);
            }
            else
            {
                var nonSimple = this.options.ecmaVersion >= 7 && !this.isSimpleParamList(node.params);
                if (!oldStrict || nonSimple)
                {
                    useStrict = this.strictDirective(this.end);
                    if (useStrict && nonSimple)
                    {
                        this.raiseRecoverable(node.start, "Illegal 'use strict' directive in function with non-simple parameter list");
                    }
                }
                var oldLabels = this.labels;
                this.labels = [];
                if (useStrict)
                {
                    this.strict = true;
                }
                this.checkParams(node, !oldStrict && !useStrict && !isArrowFunction && !isMethod && this.isSimpleParamList(node.params));
                if (this.strict && node.id)
                {
                    this.checkLValSimple(node.id, BIND_OUTSIDE);
                }
                node.body = this.parseBlock(false, undefined, useStrict && !oldStrict);
                node.expression = false;
                this.adaptDirectivePrologue(node.body.body);
                this.labels = oldLabels;
            }
            this.exitScope();
        };
        pp$8.isSimpleParamList =         function(params)
        {
            for (var i = 0, list = params; i < list.length; i += 1)
            {
                var param = list[i];
                if (param.type !== "Identifier")
                {
                    return false;
                }
            }
            return true;
        };
        pp$8.checkParams =         function(node, allowDuplicates)
        {
            var nameHash = Object.create(null);
            for (var i = 0, list = node.params; i < list.length; i += 1)
            {
                var param = list[i];
                this.checkLValInnerPattern(param, BIND_VAR, allowDuplicates ? null : nameHash);
            }
        };
        pp$8.parseExprList =         function(close, allowTrailingComma, allowEmpty, refDestructuringErrors, firstExpr)
        {
            var elts = [],
                first = true;
            if (firstExpr && this.eat(close))
            {
                return [firstExpr];
            }
            while (!this.eat(close))
            {
                if (!first)
                {
                    this.expect(types$1.comma);
                    if (allowTrailingComma && this.afterTrailingComma(close))
                    {
                        break;
                    }
                }
                var elt = void 0;
                if (first && firstExpr)
                {
                    elt = firstExpr;
                }
                else if (allowEmpty && this.type === types$1.comma)
                {
                    elt = null;
                }
                else if (this.type === types$1.ellipsis)
                {
                    elt = this.parseSpread(refDestructuringErrors);
                    if (refDestructuringErrors && this.type === types$1.comma && refDestructuringErrors.trailingComma < 0)
                    {
                        refDestructuringErrors.trailingComma = this.start;
                    }
                }
                else
                {
                    elt = this.parseMaybeAssign(false, refDestructuringErrors);
                }
                if (first)
                {
                    first = false;
                }
                elts.push(elt);
            }
            return elts;
        };
        pp$8.checkUnreserved =         function(ref)
        {
            var start = ref.start;
            var end = ref.end;
            var name = ref.name;
            if (this.inGenerator && name === "yield")
            {
                this.raiseRecoverable(start, "Cannot use 'yield' as identifier inside a generator");
            }
            if (this.inAsync && name === "await")
            {
                this.raiseRecoverable(start, "Cannot use 'await' as identifier inside an async function");
            }
            if (this.currentThisScope().inClassFieldInit && name === "arguments")
            {
                this.raiseRecoverable(start, "Cannot use 'arguments' in class field initializer");
            }
            if (this.inClassStaticBlock && (name === "arguments" || name === "await"))
            {
                this.raise(start, "Cannot use " + name + " in class static initialization block");
            }
            if (this.keywords.test(name))
            {
                this.raise(start, "Unexpected keyword '" + name + "'");
            }
            if (this.options.ecmaVersion < 6 && this.input.slice(start, end).indexOf("\\") !== -1)
            {
                return;
            }
            var re = this.strict ? this.reservedWordsStrict : this.reservedWords;
            if (re.test(name))
            {
                if (!this.inAsync && name === "await")
                {
                    this.raiseRecoverable(start, "Cannot use keyword 'await' outside an async function");
                }
                if (this.options.objj && name === "super")
                {
                    return;
                }
                this.raiseRecoverable(start, "The keyword '" + name + "' is reserved");
            }
        };
        pp$8.parseIdent =         function(liberal, isBinding)
        {
            var node = this.startNode();
            if (this.type === types$1.name)
            {
                node.name = this.value;
            }
            else if (this.type.keyword)
            {
                node.name = this.type.keyword;
                if ((node.name === "class" || node.name === "function") && (this.lastTokEnd !== this.lastTokStart + 1 || this.input.charCodeAt(this.lastTokStart) !== 46))
                {
                    this.context.pop();
                }
            }
            else
            {
                this.unexpected();
            }
            this.next(!!liberal);
            this.finishNode(node, "Identifier");
            if (!liberal)
            {
                this.checkUnreserved(node);
                if (node.name === "await" && !this.awaitIdentPos)
                {
                    this.awaitIdentPos = node.start;
                }
            }
            return node;
        };
        pp$8.parsePrivateIdent =         function()
        {
            var node = this.startNode();
            if (this.type === types$1.privateId)
            {
                node.name = this.value;
            }
            else
            {
                this.unexpected();
            }
            this.next();
            this.finishNode(node, "PrivateIdentifier");
            if (this.privateNameStack.length === 0)
            {
                this.raise(node.start, "Private field '#" + node.name + "' must be declared in an enclosing class");
            }
            else
            {
                this.privateNameStack[this.privateNameStack.length - 1].used.push(node);
            }
            return node;
        };
        pp$8.parseYield =         function(forInit)
        {
            if (!this.yieldPos)
            {
                this.yieldPos = this.start;
            }
            var node = this.startNode();
            this.next();
            if (this.type === types$1.semi || this.canInsertSemicolon() || this.type !== types$1.star && !this.type.startsExpr)
            {
                node.delegate = false;
                node.argument = null;
            }
            else
            {
                node.delegate = this.eat(types$1.star);
                node.argument = this.parseMaybeAssign(forInit);
            }
            return this.finishNode(node, "YieldExpression");
        };
        pp$8.parseAwait =         function(forInit)
        {
            if (!this.awaitPos)
            {
                this.awaitPos = this.start;
            }
            var node = this.startNode();
            this.next();
            node.argument = this.parseMaybeUnary(null, true, false, forInit);
            return this.finishNode(node, "AwaitExpression");
        };
        var pp$7 = Parser.prototype;
        pp$7.raise =         function(pos, message)
        {
            var loc = getLineInfo(this.input, pos);
            message += " (" + loc.line + ":" + loc.column + ")";
            var err = new SyntaxError(message);
            err.pos = pos;
            err.loc = loc;
            err.raisedAt = this.pos;
            throw err;
        };
        pp$7.raiseRecoverable = pp$7.raise;
        pp$7.curPosition =         function()
        {
            if (this.options.locations)
            {
                var line = this.curLine;
                var column = this.pos - this.lineStart;
                if (this.preprocessStackLastItem)
                {
                    var macro = this.preprocessStackLastItem.macro;
                    var locationOffset = macro.locationOffset;
                    if (locationOffset)
                    {
                        var macroCurrentLine = locationOffset.line;
                        if (macroCurrentLine)
                        {
                            line += macroCurrentLine;
                        }
                        var macroCurrentLineStart = locationOffset.column;
                        if (macroCurrentLineStart)
                        {
                            column += this.tokPosMacroOffset - (this.curLine === 1 ? macroCurrentLineStart : 0);
                        }
                    }
                }
                return new Position(line, column);
            }
        };
        var pp$6 = Parser.prototype;
        var Scope =         function Scope(flags)
        {
            this.flags = flags;
            this.var = [];
            this.lexical = [];
            this.functions = [];
            this.inClassFieldInit = false;
        };
        pp$6.enterScope =         function(flags)
        {
            this.scopeStack.push(new Scope(flags));
        };
        pp$6.exitScope =         function()
        {
            this.scopeStack.pop();
        };
        pp$6.treatFunctionsAsVarInScope =         function(scope)
        {
            return scope.flags & SCOPE_FUNCTION || !this.inModule && scope.flags & SCOPE_TOP;
        };
        pp$6.declareName =         function(name, bindingType, pos)
        {
            var redeclared = false;
            if (bindingType === BIND_LEXICAL)
            {
                var scope = this.currentScope();
                redeclared = scope.lexical.indexOf(name) > -1 || scope.functions.indexOf(name) > -1 || scope.var.indexOf(name) > -1;
                scope.lexical.push(name);
                if (this.inModule && scope.flags & SCOPE_TOP)
                {
                    delete this.undefinedExports[name];
                }
            }
            else if (bindingType === BIND_SIMPLE_CATCH)
            {
                var scope$1 = this.currentScope();
                scope$1.lexical.push(name);
            }
            else if (bindingType === BIND_FUNCTION)
            {
                var scope$2 = this.currentScope();
                if (this.treatFunctionsAsVar)
                {
                    redeclared = scope$2.lexical.indexOf(name) > -1;
                }
                else
                {
                    redeclared = scope$2.lexical.indexOf(name) > -1 || scope$2.var.indexOf(name) > -1;
                }
                scope$2.functions.push(name);
            }
            else
            {
                for (var i = this.scopeStack.length - 1; i >= 0; --i)
                {
                    var scope$3 = this.scopeStack[i];
                    if (scope$3.lexical.indexOf(name) > -1 && !(scope$3.flags & SCOPE_SIMPLE_CATCH && scope$3.lexical[0] === name) || !this.treatFunctionsAsVarInScope(scope$3) && scope$3.functions.indexOf(name) > -1)
                    {
                        redeclared = true;
                        break;
                    }
                    scope$3.var.push(name);
                    if (this.inModule && scope$3.flags & SCOPE_TOP)
                    {
                        delete this.undefinedExports[name];
                    }
                    if (scope$3.flags & SCOPE_VAR)
                    {
                        break;
                    }
                }
            }
            if (redeclared)
            {
                this.raiseRecoverable(pos, "Identifier '" + name + "' has already been declared");
            }
        };
        pp$6.checkLocalExport =         function(id)
        {
            if (this.scopeStack[0].lexical.indexOf(id.name) === -1 && this.scopeStack[0].var.indexOf(id.name) === -1)
            {
                this.undefinedExports[id.name] = id;
            }
        };
        pp$6.currentScope =         function()
        {
            return this.scopeStack[this.scopeStack.length - 1];
        };
        pp$6.currentVarScope =         function()
        {
            for (var i = this.scopeStack.length - 1; ; i--)
            {
                var scope = this.scopeStack[i];
                if (scope.flags & SCOPE_VAR)
                {
                    return scope;
                }
            }
        };
        pp$6.currentThisScope =         function()
        {
            for (var i = this.scopeStack.length - 1; ; i--)
            {
                var scope = this.scopeStack[i];
                if (scope.flags & SCOPE_VAR && !(scope.flags & SCOPE_ARROW))
                {
                    return scope;
                }
            }
        };
        pp$6.currentObjJMethodScope =         function()
        {
            for (var i = this.scopeStack.length - 1; ; i--)
            {
                var scope = this.scopeStack[i];
                if (scope.flags & SCOPE_OBJJ_METHOD || scope.flags & SCOPE_TOP)
                {
                    return scope;
                }
            }
        };
        var pp$5 = Parser.prototype;
        var PositionOffset =         function PositionOffset(line, column, preprocessStackLastItem)
        {
            this.line = line - 1;
            this.column = column;
            if (preprocessStackLastItem)
            {
                var macro = preprocessStackLastItem.macro;
                var locationOffset = macro.locationOffset;
                if (locationOffset)
                {
                    var macroCurrentLine = locationOffset.line;
                    if (macroCurrentLine)
                    {
                        this.line += macroCurrentLine;
                    }
                    var macroCurrentLineStart = locationOffset.column;
                    if (macroCurrentLineStart)
                    {
                        this.column += macroCurrentLineStart;
                    }
                }
            }
        };
        pp$5.preprocesSkipRestOfLine =         function()
        {
            var ch = this.input.charCodeAt(this.pos);
            var last;
            while (this.pos < this.input.length && (ch !== 10 && ch !== 13 && ch !== 8232 && ch !== 8233 || last === 92))
            {
                if (ch !== 32 && ch !== 9 && ch !== 160 && (ch < 5760 || !nonASCIIwhitespace.test(String.fromCharCode(ch))))
                {
                    last = ch;
                }
                ch = this.input.charCodeAt(++this.pos);
            }
        };
        pp$5.preprocessReadToken =         function(skipComments, preprocessToken, processMacros, onlyTransformMacroArguments)
        {
            this.skipSpace(true);
            this.preStart = this.pos;
            this.preInput = this.input;
            this.preParameterScope = this.preprocessParameterScope;
            if (this.pos >= this.input.length)
            {
                return this.preprocessFinishToken(types$1.eof);
            }
            var code = this.input.charCodeAt(this.pos);
            if (!preprocessToken && !this.preNotSkipping && code !== 35)
            {
                this.preprocesSkipRestOfLine();
                this.preprocessFinishToken(preTypes._preprocessSkipLine, this.input.slice(this.preStart, this.pos));
                this.preprocessSkipSpace(true, true);
                return;
            }
            else if (this.preprocessMacroParameterListMode && code !== 41 && code !== 44)
            {
                var parenLevel = 0;
                while (this.pos < this.input.length && (parenLevel || code !== 41 && code !== 44))
                {
                    if (code === 40)
                    {
                        parenLevel++;
                    }
                    if (code === 41)
                    {
                        parenLevel--;
                    }
                    if (code === 34 || code === 39)
                    {
                        var quote = code;
                        code = this.input.charCodeAt(++this.pos);
                        while (this.pos < this.input.length && code !== quote)
                        {
                            if (code === 92)
                            {
                                code = this.input.charCodeAt(++this.pos);
                                if (code !== quote)
                                {
                                    continue;
                                }
                            }
                            code = this.input.charCodeAt(++this.pos);
                        }
                    }
                    code = this.input.charCodeAt(++this.pos);
                }
                return this.preprocessFinishToken(types$1._preprocessParamItem, this.input.slice(this.preStart, this.pos));
            }
            if (isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92 && this.input.charCodeAt(this.pos + 1) === 117)
            {
                return this.preprocessReadWord(processMacros);
            }
            if (this.getTokenFromCode(code, skipComments ? this.preprocessFinishTokenSkipComments : this.preprocessFinishToken, true) === false)
            {
                var ch = String.fromCharCode(code);
                if (ch === "\\" || nonASCIIidentifierStart.test(ch))
                {
                    return this.preprocessReadWord(processMacros);
                }
                this.raise(this.pos, "Unexpected character '" + ch + "'");
            }
        };
        pp$5.preprocessReadWord =         function(processMacros, onlyTransformMacroArguments)
        {
            var word = this.readWord1();
            var type = types$1.name;
            var readMacroWordReturn;
            if (processMacros && this.options.preprocess)
            {
                readMacroWordReturn = this.readMacroWord(word, this.preprocessNext, onlyTransformMacroArguments);
                if (readMacroWordReturn === true)
                {
                    return true;
                }
            }
            if (!this.containsEsc && isKeywordPreprocessor.test(word))
            {
                type = preKeywords[word];
            }
            this.preprocessFinishToken(type, word, readMacroWordReturn, false, processMacros);
        };
        pp$5.readMacroWord =         function(word, nextFinisher, onlyTransformArguments)
        {
            var macro,
                lastStackItem = this.preprocessStackLastItem,
                oldParameterScope = this.preprocessParameterScope;
            if (lastStackItem)
            {
                var scope = this.preTokParameterScope || this.preprocessStackLastItem;
                if (scope.parameterDict && scope.macro.isParameterFunction().test(word))
                {
                    macro = scope.parameterDict[word];
                    if (!macro && scope.macro.variadicName === word)
                    {
                        if (this.preConcatenating)
                        {
                            this.finishToken(types$1.name, "");
                            return true;
                        }
                        else
                        {
                            this.skipSpace();
                            nextFinisher.call(this, false, true, onlyTransformArguments, true);
                        }
                        return true;
                    }
                    if (this.preprocessPrescanFor(35, 35))
                    {
                        onlyTransformArguments = 2;
                    }
                    this.preprocessParameterScope = macro && macro.parameterScope;
                    onlyTransformArguments--;
                }
            }
            if (!macro && (!onlyTransformArguments && !this.preprocessOnlyTransformArgumentsForLastToken || this.pos < this.input.length) && this.options.preprocessIsMacro(word))
            {
                this.preprocessParameterScope = null;
                macro = this.options.preprocessGetMacro(word);
                if (macro)
                {
                    if (!this.preprocessStackLastItem || !this.preprocessStackLastItem.macro.isArgument)
                    {
                        var i = this.preprocessStack.length,
                            lastMacroItem;
                        while (i > 0)
                        {
                            var item = this.preprocessStack[--i],
                                macroItem = item.macro;
                            if (macroItem.identifier === word && !(lastMacroItem && lastMacroItem.isArgument))
                            {
                                macro = null;
                            }
                            lastMacroItem = macroItem;
                        }
                    }
                }
                else
                {
                    macro = this.preprocessBuiltinMacro(word);
                }
            }
            if (macro)
            {
                var parameters;
                var hasParameters = macro.parameters;
                var nextIsParenL;
                if (hasParameters)
                {
                    var pos = this.pos;
                    if (this.preprocessPrescanFor(40))
                    {
                        nextIsParenL = true;
                    }
                    else
                    {
                        return pos;
                    }
                }
                if (!hasParameters || nextIsParenL)
                {
                    if (nextIsParenL)
                    {
                        var variadicName = macro.variadicName;
                        var first = true;
                        var noParams = 0;
                        parameters = Object.create(null);
                        this.skipSpace(true);
                        if (this.input.charCodeAt(this.pos++) !== 40)
                        {
                            this.raise(this.pos - 1, "Expected '(' before macro prarameters");
                        }
                        this.skipSpace(true, true, true);
                        var code = this.input.charCodeAt(this.pos++);
                        while (this.pos < this.input.length && code !== 41)
                        {
                            if (first)
                            {
                                first = false;
                            }
                            else if (code === 44)
                            {
                                this.skipSpace(true, true, true);
                                code = this.input.charCodeAt(this.pos++);
                            }
                            else
                            {
                                this.raise(this.pos - 1, "Expected ',' between macro parameters");
                            }
                            var ident = hasParameters[noParams++];
                            var variadicAndLastParameter = variadicName && hasParameters.length === noParams;
                            var paramStart = this.pos - 1,
                                parenLevel = 0;
                            var positionOffset = this.options.locations && new PositionOffset(this.curLine, this.tokLineStart);
                            while (this.pos < this.input.length && (parenLevel || code !== 41 && (code !== 44 || variadicAndLastParameter)))
                            {
                                if (code === 40)
                                {
                                    parenLevel++;
                                }
                                if (code === 41)
                                {
                                    parenLevel--;
                                }
                                if (code === 34 || code === 39)
                                {
                                    var quote = code;
                                    code = this.input.charCodeAt(this.pos++);
                                    while (this.pos < this.input.length && code !== quote)
                                    {
                                        if (code === 92)
                                        {
                                            code = this.input.charCodeAt(this.pos++);
                                            if (code !== quote)
                                            {
                                                continue;
                                            }
                                        }
                                        code = this.input.charCodeAt(this.pos++);
                                    }
                                }
                                code = this.input.charCodeAt(this.pos++);
                            }
                            var val = this.input.slice(paramStart, this.pos - 1);
                            var trimmedLeft = val.trimStart();
                            var trimmedVal = trimmedLeft.trimEnd();
                            var trimOffset = val.length - trimmedLeft.length;
                            parameters[ident] = new Macro(ident, trimmedVal, null, paramStart + this.tokMacroOffset + trimOffset, true, this.preTokParameterScope || this.preprocessStackLastItem, false, positionOffset);
                        }
                        if (code !== 41)
                        {
                            this.raise(this.pos, "Expected ')' after macro prarameters");
                        }
                        this.skipSpace(true, true);
                    }
                    return this.readTokenFromMacro(macro, this.tokPosMacroOffset, parameters, oldParameterScope, this.pos, nextFinisher, onlyTransformArguments);
                }
            }
        };
        pp$5.preprocessPrescanFor =         function(first, second)
        {
            var i = this.preprocessStack.length;
            var scanInput = this.input;
            var scanPos = this.pos;
stackloop:             while (scanInput != null)
            {
charloop:                 for (; ; )
                {
                    var ch = scanInput.charCodeAt(scanPos);
                    if (ch === 32)
                    {
                        ++scanPos;
                    }
                    else if (ch === 13)
                    {
                        ++scanPos;
                        var next = scanInput.charCodeAt(scanPos);
                        if (next === 10)
                        {
                            ++scanPos;
                        }
                    }
                    else if (ch === 10)
                    {
                        ++scanPos;
                    }
                    else if (ch === 9)
                    {
                        ++scanPos;
                    }
                    else if (ch === 47)
                    {
                        var next$1 = scanInput.charCodeAt(scanPos + 1);
                        if (next$1 === 42)
                        {
                            var end = scanInput.indexOf("*/", scanPos += 2);
                            if (end === -1)
                            {
                                this.raise(scanPos - 2, "Unterminated comment");
                            }
                            scanPos = end + 2;
                        }
                        else if (next$1 === 47)
                        {
                            ch = scanInput.charCodeAt(scanPos += 2);
                            while (scanPos < scanInput.length && ch !== 10 && ch !== 13 && ch !== 8232 && ch !== 8233)
                            {
                                ++scanPos;
                                ch = scanInput.charCodeAt(scanPos);
                            }
                        }
                        else
                        {
                            break stackloop;
                        }
                    }
                    else if (ch === 160 || ch === 11 || ch === 12 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch)))
                    {
                        ++scanPos;
                    }
                    else if (scanPos >= scanInput.length)
                    {
                        break charloop;
                    }
                    else if (ch === 92)
                    {
                        var pos = scanPos + 1;
                        ch = scanInput.charCodeAt(pos);
                        while (pos < scanInput.length && (ch === 32 || ch === 9 || ch === 11 || ch === 12 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))))
                        {
                            ch = scanInput.charCodeAt(++pos);
                        }
                        lineBreak.lastIndex = 0;
                        var match = lineBreak.exec(scanInput.slice(pos, pos + 2));
                        if (match && match.index === 0)
                        {
                            scanPos = pos + match[0].length;
                        }
                        else
                        {
                            break stackloop;
                        }
                    }
                    else
                    {
                        break stackloop;
                    }
                }
                var stackItem = this.preprocessStack[--i];
                if (stackItem == null)
                {
                    return false;
                }
                scanPos = stackItem.end;
                scanInput = stackItem.input;
            }
            return scanInput && scanInput.charCodeAt(scanPos) === first && (second == null || scanInput.charCodeAt(scanPos + 1) === second);
        };
        pp$5.readTokenFromMacro =         function(macro, macroOffset, parameters, parameterScope, end, nextFinisher, onlyTransformArguments)
        {
            var macroString = macro.macro;
            if (!macroString && nextFinisher === this.preprocessNext)
            {
                macroString = "1";
            }
            if (macroString)
            {
                this.pushMacroToStack(macro, macroString, macroOffset, parameters, parameterScope, end, onlyTransformArguments);
            }
            else if (this.preConcatenating)
            {
                (nextFinisher === this.next ? this.finishToken : this.preprocessFinishToken).call(this, types$1.name, "");
                return true;
            }
            this.skipSpace();
            nextFinisher.call(this, false, true, onlyTransformArguments, true);
            return true;
        };
        pp$5.preprocessBuiltinMacro =         function(macroIdentifier)
        {
            var builtinMacro = this.macrosBuiltinMacros[macroIdentifier];
            return builtinMacro ? builtinMacro(this) : null;
        };
        pp$5.defineMacros =         function(macroArray)
        {
            var parseMacroOptions = {preprocess: true, ecmaVersion: this.options.ecmaVersion, preprocessAddMacro: this.options.preprocessAddMacro, preprocessGetMacro: this.options.preprocessGetMacro, preprocessUndefineMacro: this.options.preprocessUndefineMacro, preprocessIsMacro: this.options.preprocessIsMacro};
            for (var i = 0, size = macroArray.length; i < size; i++)
            {
                var macroDefinition = macroArray[i].trim();
                var pos = macroDefinition.indexOf("=");
                if (pos === 0)
                {
                    this.raise(0, "Invalid macro definition: '" + macroDefinition + "'");
                }
                var name = void 0,
                    body = void 0;
                if (pos > 0)
                {
                    name = macroDefinition.slice(0, pos);
                    body = macroDefinition.slice(pos + 1);
                }
                else
                {
                    name = macroDefinition;
                }
                if (Object.prototype.hasOwnProperty.call(this.macrosBuiltinMacros, name))
                {
                    this.raise(0, "'" + name + "' is a predefined macro name");
                }
                var p = new Parser(parseMacroOptions, name + (body != null ? " " + body : ""));
                p.preprocessParseDefine();
            }
        };
        pp$5.pushMacroToStack =         function(macro, macroString, macroOffset, parameters, parameterScope, end, onlyTransformArguments, isIncludeFile)
        {
            this.preprocessStackLastItem = {macro: macro, macroOffset: macroOffset, parameterDict: parameters, end: end, lastEnd: this.localLastEnd, tokStart: this.start, onlyTransformArgumentsForLastToken: this.preprocessOnlyTransformArgumentsForLastToken, currentLine: this.curLine, currentLineStart: this.lineStart, sourceFile: this.sourceFile};
            if (parameterScope)
            {
                this.preprocessStackLastItem.parameterScope = parameterScope;
            }
            if (isIncludeFile)
            {
                this.preprocessStackLastItem.isIncludeFile = isIncludeFile;
            }
            this.preprocessStackLastItem.input = this.input;
            this.preprocessStack.push(this.preprocessStackLastItem);
            this.preprocessOnlyTransformArgumentsForLastToken = onlyTransformArguments;
            this.input = macroString;
            this.tokPosMacroOffset = macro.start;
            this.pos = 0;
            this.curLine = 1;
            this.lineStart = 0;
            this.firstEnd = 0;
            this.localLastEnd = 0;
            if (macro.sourceFile)
            {
                this.sourceFile = macro.sourceFile;
            }
        };
        pp$5.preprocessFinishTokenSkipComments =         function(type, val)
        {
            this.preType = type;
            this.preVal = val;
            this.firstEnd = this.preEnd = this.pos;
            this.preprocessSkipSpace(true);
        };
        pp$5.preprocessNext =         function(ignoreEscapeSequenceInKeyword, stealth, onlyTransformArguments, processMacros)
        {
            if (!stealth)
            {
                this.preLastStart = this.preStart;
                this.preLastEnd = this.preEnd;
            }
            this.localLastEnd = this.firstEnd;
            return this.preprocessReadToken(false, false, processMacros, onlyTransformArguments);
        };
        pp$5.preprocessSkipSpace =         function(dontSkipComments, skipEOL)
        {
            var ch = this.skipSpace(!skipEOL, false, dontSkipComments);
            return ch;
        };
        pp$5.preprocessEat =         function(type, processMacros)
        {
            if (this.preType === type)
            {
                this.preprocessNext(false, false, false, processMacros);
                return true;
            }
        };
        pp$5.preprocessExpect =         function(type, errorMessage, processMacros)
        {
            if (this.preType === type)
            {
                this.preprocessNext(false, false, undefined, null, processMacros);
            }
            else
            {
                this.raise(this.preStart, errorMessage || "Unexpected token");
            }
        };
        function debug()
        {
        }
        pp$5.preprocessGetIdent =         function(processMacros)
        {
            var ident = this.preType === types$1.name ? this.preVal : (!this.options.forbidReserved || this.preType.okAsIdent) && this.preType.keyword || debug();
            this.exprAllowed = false;
            this.preprocessNext(false, false, false, processMacros);
            return ident;
        };
        pp$5.preprocessFinishToken =         function(type, val, overrideTokEnd, skipEOL, processMacros)
        {
            this.preType = type;
            this.preVal = val;
            this.preEnd = overrideTokEnd || this.pos;
            if (type !== types$1.eol)
            {
                this.firstEnd = this.preEnd;
            }
            var ch = this.preprocessSkipSpace(false, skipEOL);
            if (ch === 35 && this.options.preprocess && !this.preprocessDontConcatenate && this.input.charCodeAt(this.pos + 1) === 35)
            {
                var val1 = val != null ? val : type.keyword || type.type;
                this.pos += 2;
                if (val1 != null)
                {
                    var positionOffset = this.options.locations && new PositionOffset(this.curLine, this.lineStart, this.preprocessStackLastItem);
                    var saveTokInput = this.input,
                        saveTokEnd = this.preEnd,
                        saveTokStart = this.preStart,
                        start = this.preStart + this.tokMacroOffset,
                        variadicName = this.preprocessStackLastItem && this.preprocessStackLastItem.macro && this.preprocessStackLastItem.macro.variadicName;
                    this.skipSpace();
                    var isVariadic = null;
                    if (variadicName && variadicName === this.input.slice(this.pos, this.pos + variadicName.length))
                    {
                        isVariadic = true;
                    }
                    this.preConcatenating = true;
                    this.preprocessReadToken(null, null, processMacros, 2);
                    this.preConcatenating = false;
                    var val2 = this.preVal != null ? this.preVal : this.preType.keyword || this.preType.type;
                    if (val2 != null)
                    {
                        if (isVariadic && val1 === "," && val2 === "")
                        {
                            return this.preprocessReadToken();
                        }
                        var concat = "" + val1 + val2,
                            val2TokStart = this.preStart + this.tokPosMacroOffset;
                        var concatMacro = new Macro(null, concat, null, start, false, null, false, positionOffset);
                        var r = this.readTokenFromMacro(concatMacro, this.tokPosMacroOffset, this.preprocessStackLastItem ? this.preprocessStackLastItem.parameterDict : null, null, this.pos, this.preprocessNext, null);
                        if (this.preprocessStackLastItem && this.preprocessStackLastItem.macro === concatMacro)
                        {
                            this.preType = type;
                            this.preStart = saveTokStart;
                            this.preEnd = saveTokEnd;
                            this.input = saveTokInput;
                            this.tokPosMacroOffset = val2TokStart - val1.length;
                            if (!isVariadic)
                            {
                                console.warn("Warning: pasting formed '" + concat + "', an invalid preprocessing token");
                            }
                        }
                        else
                        {
                            return r;
                        }
                    }
                }
            }
        };
        var pp$4 = Parser.prototype;
        pp$4.preprocessParseDefine =         function()
        {
            this.preprocessIsParsingPreprocess = true;
            this.preprocessReadToken();
            var macroIdentifierEnd = this.preEnd;
            this.preprocessDontConcatenate = true;
            var positionOffset = this.options.locations && new PositionOffset(this.curLine, this.lineStart, this.preprocessStackLastItem);
            var macroIdentifier = this.preVal;
            var isNextCodeParenL = this.input.charCodeAt(macroIdentifierEnd) === 40;
            this.preprocessExpect(types$1.name, "Preprocessor #define expects identifier");
            var parameters;
            var variadic;
            if (isNextCodeParenL)
            {
                this.preprocessExpect(types$1.parenL);
                parameters = [];
                variadic = false;
                var first = true;
                while (!this.preprocessEat(types$1.parenR))
                {
                    if (variadic)
                    {
                        this.raise(this.preStart, "Variadic parameter must be last");
                    }
                    if (!first)
                    {
                        this.preprocessExpect(types$1.comma, "Expected ',' between macro parameters");
                    }
                    else
                    {
                        first = false;
                    }
                    parameters.push(this.preprocessEat(types$1.ellipsis) ? variadic = "__VA_ARGS__" : this.preprocessGetIdent());
                    if (this.preprocessEat(types$1.ellipsis))
                    {
                        variadic = true;
                    }
                    positionOffset = this.options.locations && new PositionOffset(this.curLine, this.lineStart, this.preprocessStackLastItem);
                }
            }
            var start = this.preStart;
            while (this.preType !== types$1.eol && this.preType !== types$1.eof)
            {
                this.preprocessReadToken();
            }
            this.preprocessDontConcatenate = false;
            var macroString = this.preInput.slice(start, this.preStart);
            macroString = macroString.replace(/\\\n/g, " \n");
            this.options.preprocessAddMacro(new Macro(macroIdentifier, macroString, parameters, start, false, null, variadic && parameters[parameters.length - 1], positionOffset));
            this.preprocessIsParsingPreprocess = false;
        };
        pp$4.preprocessSkipToElseOrEndif =         function(skipElse)
        {
            var ifLevel = [];
            while (ifLevel.length > 0 || this.preType !== preTypes._preEndif && (this.preType !== preTypes._preElse && this.preType !== preTypes._preElseIfTrue || skipElse))
            {
                switch(this.preType) {
                    case preTypes._preIf:
                    case preTypes._preIfdef:
                    case preTypes._preIfndef:
                        ifLevel.push(preTypes._preIf);
                        break;
                    case preTypes._preElse:
                        if (ifLevel[ifLevel.length - 1] !== preTypes._preIf)
                        {
                            this.raise(this.preStart, "#else after #else");
                        }
                        else
                        {
                            ifLevel[ifLevel.length - 1] = preTypes._preElse;
                        }
                        break;
                    case preTypes._preElseIf:
                        if (ifLevel[ifLevel.length - 1] !== preTypes._preIf)
                        {
                            this.raise(this.preStart, "#elif after #else");
                        }
                        break;
                    case preTypes._preEndif:
                        ifLevel.pop();
                        break;
                    case types$1.eof:
                        this.preNotSkipping = true;
                        this.raise(this.preStart, "Missing #endif");
                }
                this.preprocessReadToken(true);
            }
            this.preNotSkipping = true;
            if (this.preType === preTypes._preEndif)
            {
                this.preIfLevel.pop();
            }
        };
        pp$4.preprocessParseExpression =         function(processMacros)
        {
            return this.preprocessParseExprOps(processMacros);
        };
        pp$4.preprocessParseExprOps =         function(processMacros)
        {
            return this.preprocessParseExprOp(this.preprocessParseMaybeUnary(processMacros), -1, processMacros);
        };
        pp$4.preprocessParseExprOp =         function(left, minPrec, processMacros)
        {
            var prec = this.preType.binop;
            if (prec)
            {
                if (!this.preType.preprocess)
                {
                    this.raise(this.preStart, "Unsupported macro operator");
                }
                if (prec > minPrec)
                {
                    var node = this.startNodeFrom(left);
                    node.left = left;
                    node.operator = this.preVal;
                    this.preprocessNext(false, false, false, processMacros);
                    node.right = this.preprocessParseExprOp(this.preprocessParseMaybeUnary(processMacros), prec, processMacros);
                    node = this.preprocessFinishNode(node, /&&|\|\|/.test(node.operator) ? "LogicalExpression" : "BinaryExpression");
                    return this.preprocessParseExprOp(node, minPrec, processMacros);
                }
            }
            return left;
        };
        pp$4.preprocessParseMaybeUnary =         function(processMacros)
        {
            if (this.preType.preprocess && this.preType.prefix)
            {
                var node = this.startNode();
                node.operator = this.preVal;
                node.prefix = true;
                this.preprocessNext(false, false, false, processMacros);
                node.argument = this.preprocessParseMaybeUnary(processMacros);
                return this.preprocessFinishNode(node, "UnaryExpression");
            }
            return this.preprocessParseExprAtom(processMacros);
        };
        pp$4.preprocessParseExprAtom =         function(processMacros)
        {
            switch(this.preType) {
                case types$1.name:
                    return this.preprocessParseIdent(processMacros);
                case types$1.num:
                case types$1.string:
                    return this.preprocessParseStringNumLiteral(processMacros);
                case types$1.parenL:
                    var tokStart1 = this.preStart;
                    this.preprocessNext(false, false, false, processMacros);
                    var val = this.preprocessParseExpression(processMacros);
                    val.start = tokStart1;
                    val.end = this.preEnd;
                    this.preprocessExpect(types$1.parenR, "Expected closing ')' in macro expression", processMacros);
                    return val;
                case preTypes._preDefined:
                    var node = this.startNode();
                    this.preprocessNext(false, false, false, processMacros);
                    node.object = this.preprocessParseDefinedExpression(processMacros);
                    return this.preprocessFinishNode(node, "DefinedExpression");
default:
                    this.unexpected();
            }
        };
        pp$4.preprocessParseIdent =         function(processMacros)
        {
            var node = this.startNode();
            node.name = this.preprocessGetIdent(processMacros);
            return this.preprocessFinishNode(node, "Identifier");
        };
        pp$4.preprocessParseDefinedExpression =         function(processMacros)
        {
            switch(this.preType) {
                case types$1.name:
                    return this.preprocessParseIdent(processMacros);
                case types$1.num:
                case types$1.string:
                    return this.preprocessParseStringNumLiteral(processMacros);
                case types$1.parenL:
                    var tokStart1 = this.preStart;
                    this.preprocessNext(false, false, false, processMacros);
                    var val = this.preprocessParseDefinedExpression(processMacros);
                    val.start = tokStart1;
                    val.end = this.preEnd;
                    this.preprocessExpect(types$1.parenR, "Expected closing ')' in macro expression", processMacros);
                    return val;
default:
                    this.unexpected();
            }
        };
        pp$4.preprocessParseStringNumLiteral =         function(processMacros)
        {
            var node = this.startNode();
            node.value = this.preVal;
            node.raw = this.preInput.slice(this.preStart, this.preEnd);
            this.preprocessNext(false, false, false, processMacros);
            return this.preprocessFinishNode(node, "Literal");
        };
        pp$4.preprocessFinishNode =         function(node, type)
        {
            node.type = type;
            node.end = this.preEnd;
            return node;
        };
        pp$4.preprocessEvalExpression =         function(expr)
        {
            function recursiveWalk(node, state, funcs)
            {
                var visitor = funcs;
                function c(node, st, override)
                {
                    return visitor[override || node.type](node, st, c);
                }
                return c(node, state);
            }
            var self = this;
            return recursiveWalk(expr, {}, {LogicalExpression:             function(node, st, c)
            {
                var left = node.left,
                    right = node.right;
                switch(node.operator) {
                    case "||":
                        return c(left, st) || c(right, st);
                    case "&&":
                        return c(left, st) && c(right, st);
                }
            }, BinaryExpression:             function(node, st, c)
            {
                var left = node.left,
                    right = node.right;
                switch(node.operator) {
                    case "+":
                        return c(left, st) + c(right, st);
                    case "-":
                        return c(left, st) - c(right, st);
                    case "*":
                        return c(left, st) * c(right, st);
                    case "/":
                        return c(left, st) / c(right, st);
                    case "%":
                        return c(left, st) % c(right, st);
                    case "<":
                        return c(left, st) < c(right, st);
                    case ">":
                        return c(left, st) > c(right, st);
                    case "^":
                        return c(left, st) ^ c(right, st);
                    case "&":
                        return c(left, st) & c(right, st);
                    case "|":
                        return c(left, st) | c(right, st);
                    case "==":
                        return c(left, st) == c(right, st);
                    case "===":
                        return c(left, st) === c(right, st);
                    case "!=":
                        return c(left, st) != c(right, st);
                    case "!==":
                        return c(left, st) !== c(right, st);
                    case "<=":
                        return c(left, st) <= c(right, st);
                    case ">=":
                        return c(left, st) >= c(right, st);
                    case ">>":
                        return c(left, st) >> c(right, st);
                    case ">>>":
                        return c(left, st) >>> c(right, st);
                    case "<<":
                        return c(left, st) << c(right, st);
                }
            }, UnaryExpression:             function(node, st, c)
            {
                var arg = node.argument;
                switch(node.operator) {
                    case "-":
                        return -c(arg, st);
                    case "+":
                        return +c(arg, st);
                    case "!":
                        return !c(arg, st);
                    case "~":
                        return ~c(arg, st);
                }
            }, Literal:             function(node, st, c)
            {
                return node.value;
            }, Identifier:             function(node, st, c)
            {
                return 0;
            }, DefinedExpression:             function(node, st, c)
            {
                var objectNode = node.object;
                if (objectNode.type === "Identifier")
                {
                    var name = objectNode.name,
                        macro = self.options.preprocessGetMacro(name) || self.preprocessBuiltinMacro(name);
                    return macro || 0;
                }
                else
                {
                    return c(objectNode, st);
                }
            }});
        };
        var pp$3 = Parser.prototype;
        pp$3.parseObjjImplementation =         function(node)
        {
            this.next();
            node.classname = this.parseIdent(true);
            if (this.eat(types$1.colon))
            {
                node.superclassname = this.parseIdent(true);
            }
            else if (this.eat(types$1.parenL))
            {
                node.categoryname = this.parseIdent(true);
                this.expect(types$1.parenR, "Expected closing ')' after category name");
            }
            if (this.value === "<")
            {
                this.next();
                var protocols = [],
                    first = true;
                node.protocols = protocols;
                while (this.value !== ">")
                {
                    if (!first)
                    {
                        this.expect(types$1._comma, "Expected ',' between protocol names");
                    }
                    else
                    {
                        first = false;
                    }
                    protocols.push(this.parseIdent(true));
                }
                this.next();
            }
            if (this.eat(types$1.braceL))
            {
                node.ivardeclarations = [];
                for (; ; )
                {
                    if (this.eat(types$1.braceR))
                    {
                        break;
                    }
                    this.parseObjjIvarDeclaration(node);
                }
                node.endOfIvars = this.start;
            }
            node.body = [];
            while (!this.eat(objjAtTypes._end))
            {
                if (this.type === types$1.eof)
                {
                    this.raise(this.pos, "Expected '@end' after '@implementation'");
                }
                node.body.push(this.parseObjjClassElement());
            }
            return this.finishNode(node, "ClassDeclarationStatement");
        };
        pp$3.parseObjjInterface =         function(node)
        {
            this.next();
            node.classname = this.parseIdent(true);
            if (this.eat(types$1.colon))
            {
                node.superclassname = this.parseIdent(true);
            }
            else if (this.eat(types$1.parenL))
            {
                node.categoryname = this.parseIdent(true);
                this.expect(types$1.parenR, "Expected closing ')' after category name");
            }
            if (this.value === "<")
            {
                this.next();
                var protocols = [],
                    first = true;
                node.protocols = protocols;
                while (this.value !== ">")
                {
                    if (!first)
                    {
                        this.expect(types$1.comma, "Expected ',' between protocol names");
                    }
                    else
                    {
                        first = false;
                    }
                    protocols.push(this.parseIdent(true));
                }
                this.next();
            }
            if (this.eat(types$1.braceL))
            {
                node.ivardeclarations = [];
                for (; ; )
                {
                    if (this.eat(types$1.braceR))
                    {
                        break;
                    }
                    this.parseObjjIvarDeclaration(node);
                }
                node.endOfIvars = this.start;
            }
            node.body = [];
            while (!this.eat(objjAtTypes._end))
            {
                if (this.type === types$1.eof)
                {
                    this.raise(this.pos, "Expected '@end' after '@interface'");
                }
                node.body.push(this.parseClassElement());
            }
            return this.finishNode(node, "InterfaceDeclarationStatement");
        };
        pp$3.parseObjjProtocol =         function(node)
        {
            this.next();
            node.protocolname = this.parseIdent(true);
            if (this.value === "<")
            {
                this.next();
                var protocols = [],
                    first = true;
                node.protocols = protocols;
                while (this.value !== ">")
                {
                    if (!first)
                    {
                        this.expect(types$1.comma, "Expected ',' between protocol names");
                    }
                    else
                    {
                        first = false;
                    }
                    protocols.push(this.parseIdent(true));
                }
                this.next();
            }
            while (!this.eat(objjAtTypes._end))
            {
                if (this.type === types$1.eof)
                {
                    this.raise(this.pos, "Expected '@end' after '@protocol'");
                }
                if (this.eat(objjAtTypes._required))
                {
                    continue;
                }
                if (this.eat(objjAtTypes._optional))
                {
                    while (!this.eat(objjAtTypes._required) && this.type !== objjAtTypes._end)
                    {
                        (node.optional || (node.optional = [])).push(this.parseObjjProtocolClassElement());
                    }
                }
                else
                {
                    (node.required || (node.required = [])).push(this.parseObjjProtocolClassElement());
                }
            }
            return this.finishNode(node, "ProtocolDeclarationStatement");
        };
        pp$3.parseObjjProtocolClassElement =         function()
        {
            var element = this.startNode();
            this.parseObjjMethodDeclaration(element);
            this.semicolon();
            return this.finishNode(element, "MethodDeclarationStatement");
        };
        pp$3.parseObjjMethodDeclaration =         function(node)
        {
            node.methodtype = this.value;
            this.expect(types$1.plusMin, "Method declaration must start with '+' or '-'");
            if (this.eat(types$1.parenL))
            {
                var typeNode = this.startNode();
                if (this.eat(objjAtTypes._action) || this.eat(objjTypes._action))
                {
                    node.action = this.finishNode(typeNode, "ObjectiveJActionType");
                    typeNode = this.startNode();
                }
                if (!this.eat(types$1.parenR))
                {
                    node.returntype = this.parseObjectiveJType(typeNode, true);
                    this.expect(types$1.parenR, "Expected closing ')' after method return type");
                }
            }
            var first = true,
                selectors = [],
                args = [];
            node.selectors = selectors;
            node.arguments = args;
            for (; ; )
            {
                if (this.type !== types$1.colon)
                {
                    selectors.push(this.parseIdent(true));
                    if (first && this.type !== types$1.colon)
                    {
                        break;
                    }
                }
                else
                {
                    selectors.push(null);
                }
                this.expect(types$1.colon, "Expected ':' in selector");
                var argument = {};
                args.push(argument);
                if (this.eat(types$1.parenL))
                {
                    argument.type = this.parseObjectiveJType();
                    this.expect(types$1.parenR, "Expected closing ')' after method argument type");
                }
                argument.identifier = this.parseIdent(false);
                if (this.type === types$1.braceL || this.type === types$1.semi)
                {
                    break;
                }
                if (this.eat(types$1.comma))
                {
                    this.expect(types$1.ellipsis, "Expected '...' after ',' in method declaration");
                    node.parameters = true;
                    break;
                }
                first = false;
            }
        };
        pp$3.parseObjjImport =         function(node)
        {
            this.next();
            if (this.type === types$1.string)
            {
                node.localfilepath = true;
            }
            else if (this.type === objjTypes._filename)
            {
                node.localfilepath = false;
            }
            else
            {
                this.unexpected();
            }
            node.filename = this.parseObjjStringNumRegExpLiteral();
            return this.finishNode(node, "ImportStatement");
        };
        pp$3.parseObjjStringNumRegExpLiteral =         function()
        {
            var node = this.startNode();
            node.value = this.value;
            node.raw = this.tokInput.slice(this.start, this.end);
            this.next();
            return this.finishNode(node, "Literal");
        };
        pp$3.parseObjjIvarDeclaration =         function(node)
        {
            var outlet;
            if (this.eat(objjAtTypes._outlet))
            {
                outlet = true;
            }
            var type = this.parseObjectiveJType();
            if (this.strict && this.reservedWordsStrictBind.test(type.name))
            {
                this.raise(type.start, "Binding " + type.name + " in strict mode");
            }
            for (; ; )
            {
                var decl = this.startNode();
                if (outlet)
                {
                    decl.outlet = outlet;
                }
                decl.ivartype = type;
                decl.id = this.parseIdent();
                if (this.strict && this.reservedWordsStrictBind.test(decl.id.name))
                {
                    this.raise(decl.id.start, "Binding " + decl.id.name + " in strict mode");
                }
                if (this.eat(objjAtTypes._accessors))
                {
                    decl.accessors = {};
                    if (this.eat(types$1.parenL))
                    {
                        if (!this.eat(types$1.parenR))
                        {
                            for (; ; )
                            {
                                var config = this.parseIdent(true);
                                switch(config.name) {
                                    case "property":
                                    case "getter":
                                        this.expect(types$1.eq, "Expected '=' after 'getter' accessor attribute");
                                        decl.accessors[config.name] = this.parseIdent(true);
                                        break;
                                    case "setter":
                                        this.expect(types$1.eq, "Expected '=' after 'setter' accessor attribute");
                                        var setter = this.parseIdent(true);
                                        decl.accessors[config.name] = setter;
                                        if (this.eat(types$1.colon))
                                        {
                                            setter.end = this.start;
                                        }
                                        setter.name += ":";
                                        break;
                                    case "readwrite":
                                    case "readonly":
                                    case "copy":
                                        decl.accessors[config.name] = true;
                                        break;
default:
                                        this.raise(config.start, "Unknown accessors attribute '" + config.name + "'");
                                }
                                if (!this.eat(types$1.comma))
                                {
                                    break;
                                }
                            }
                            this.expect(types$1.parenR, "Expected closing ')' after accessor attributes");
                        }
                    }
                }
                this.finishNode(decl, "IvarDeclaration");
                node.ivardeclarations.push(decl);
                if (!this.eat(types$1._comma))
                {
                    break;
                }
            }
            this.semicolon();
        };
        pp$3.parseObjjClassElement =         function()
        {
            var element = this.startNode();
            if (this.value === "+" || this.value === "-")
            {
                this.parseObjjMethodDeclaration(element);
                this.eat(types$1.semi);
                element.startOfBody = this.lastTokEnd;
                var oldInFunc = this.objjInFunction,
                    oldLabels = this.objjLabels,
                    oldAsync = this.objjFunctionIsAsync;
                this.objjInFunction = true;
                this.objjLabels = [];
                this.objjFunctionIsAsync = !!element.returntype && !!element.returntype.async;
                this.enterScope(functionFlags(this.objjFunctionIsAsync, false) | SCOPE_SUPER | SCOPE_OBJJ_METHOD);
                element.body = this.parseBlock(true);
                this.exitScope();
                this.objjInFunction = oldInFunc;
                this.objjLabels = oldLabels;
                this.objjFunctionIsAsync = oldAsync;
                return this.finishNode(element, "MethodDeclarationStatement");
            }
            else
            {
                return this.parseStatement();
            }
        };
        pp$3.parseObjectiveJType =         function(startFrom, canBeAsync)
        {
            var node = startFrom ? this.startNodeFrom(startFrom) : this.startNode(),
                allowProtocol = false;
            if (canBeAsync && this.options.ecmaVersion >= 8 && this.eatContextual("async"))
            {
                node.async = true;
            }
            if (this.type === types$1.name)
            {
                node.name = this.value;
                node.typeisclass = true;
                allowProtocol = true;
                this.next();
            }
            else
            {
                node.typeisclass = false;
                node.name = this.type.keyword;
                if (!this.eat(types$1._void))
                {
                    if (this.eat(objjTypes._id))
                    {
                        allowProtocol = true;
                    }
                    else
                    {
                        var nextKeyWord;
                        if (this.eat(objjTypes._float) || this.eat(objjTypes._boolean) || this.eat(objjTypes._SEL) || this.eat(objjTypes._double))
                        {
                            nextKeyWord = this.type.keyword;
                        }
                        else
                        {
                            if (this.eat(objjTypes._signed) || this.eat(objjTypes._unsigned))
                            {
                                nextKeyWord = this.type.keyword || true;
                            }
                            if (this.eat(objjTypes._char) || this.eat(objjTypes._byte) || this.eat(objjTypes._short))
                            {
                                if (nextKeyWord)
                                {
                                    node.name += " " + nextKeyWord;
                                }
                                nextKeyWord = this.type.keyword || true;
                            }
                            else
                            {
                                if (this.eat(objjTypes._int))
                                {
                                    if (nextKeyWord)
                                    {
                                        node.name += " " + nextKeyWord;
                                    }
                                    nextKeyWord = this.type.keyword || true;
                                }
                                if (this.eat(objjTypes._long))
                                {
                                    if (nextKeyWord)
                                    {
                                        node.name += " " + nextKeyWord;
                                    }
                                    nextKeyWord = this.type.keyword || true;
                                    if (this.eat(objjTypes._long))
                                    {
                                        node.name += " " + nextKeyWord;
                                    }
                                }
                            }
                            if (!nextKeyWord)
                            {
                                node.name = !this.options.forbidReserved && this.type.label || this.unexpected();
                                node.typeisclass = true;
                                allowProtocol = true;
                                this.next();
                            }
                        }
                    }
                }
            }
            if (allowProtocol)
            {
                if (this.value === "<")
                {
                    var first = true,
                        protocols = [];
                    node.protocols = protocols;
                    do
                    {
                        this.next();
                        if (first)
                        {
                            first = false;
                        }
                        else
                        {
                            this.eat(types$1.comma);
                        }
                        protocols.push(this.parseIdent(true));
                    }
                    while (this.value !== ">");
                    this.next();
                }
            }
            return this.finishNode(node, "ObjectiveJType");
        };
        pp$3.parseObjjPreprocess =         function(node)
        {
            this.next();
            return this.finishNode(node, "PreprocessStatement");
        };
        pp$3.parseObjjClass =         function(node)
        {
            this.next();
            node.id = this.parseIdent(false);
            return this.finishNode(node, "ClassStatement");
        };
        pp$3.parseObjjGlobal =         function(node)
        {
            this.next();
            node.id = this.parseIdent(false);
            return this.finishNode(node, "GlobalStatement");
        };
        pp$3.parseObjjTypedef =         function(node)
        {
            this.next();
            node.typedefname = this.parseIdent(true);
            return this.finishNode(node, "TypeDefStatement");
        };
        pp$3.parseObjjDictionary =         function()
        {
            this.expect(types$1.braceL, "Expected '{' before dictionary");
            var keys = [],
                values = [],
                first = true;
            while (!this.eat(types$1.braceR))
            {
                if (!first)
                {
                    this.expect(types$1.comma, "Expected ',' between expressions");
                    if (this.eat(types$1.braceR))
                    {
                        break;
                    }
                }
                keys.push(this.parseExpression(true, null, true, true));
                this.expect(types$1.colon, "Expected ':' between dictionary key and value");
                values.push(this.parseExpression(true, null, true, true));
                first = false;
            }
            return [keys, values];
        };
        pp$3.parseObjjSelector =         function(node, close)
        {
            var first = true,
                selectors = [];
            for (; ; )
            {
                if (this.type !== types$1.colon)
                {
                    selectors.push(this.parseIdent(true).name);
                    if (first && this.type === close)
                    {
                        break;
                    }
                }
                this.expect(types$1.colon, "Expected ':' in selector");
                selectors.push(":");
                if (this.type === close)
                {
                    break;
                }
                first = false;
            }
            node.selector = selectors.join("");
        };
        pp$3.parseObjjMessageSendExpression =         function(node, firstExpr)
        {
            this.parseObjjSelectorWithArguments(node, types$1.bracketR);
            if (firstExpr.type === "Super")
            {
                node.superObject = true;
            }
            else
            {
                node.object = firstExpr;
            }
            return this.finishNode(node, "MessageSendExpression");
        };
        pp$3.parseObjjSelectorWithArguments =         function(node, close)
        {
            var first = true,
                selectors = [],
                args = [];
            node.selectors = selectors;
            node.arguments = args;
            for (; ; )
            {
                if (this.type !== types$1.colon || this.inIsIdentifier && this.type === types$1.colon)
                {
                    if (this.inIsIdentifier)
                    {
                        var inNode = this.finishNode(this.startNode(), "Identifier");
                        inNode.name = "in";
                        selectors.push(inNode);
                        this.inIsIdentifier = false;
                    }
                    else
                    {
                        selectors.push(this.parseIdent(true));
                    }
                    if (first && this.eat(close))
                    {
                        break;
                    }
                }
                else
                {
                    selectors.push(null);
                }
                this.expect(types$1.colon, "Expected ':' in selector");
                args.push(this.parseExpression(true, null, true, true));
                if (this.eat(close))
                {
                    break;
                }
                if (this.type === types$1.comma)
                {
                    node.parameters = [];
                    while (this.eat(types$1.comma))
                    {
                        node.parameters.push(this.parseExpression(true, null, true, true));
                    }
                    this.eat(close);
                    break;
                }
                first = false;
            }
        };
        var Node =         function Node(parser, pos, loc)
        {
            this.type = "";
            this.start = pos;
            this.end = 0;
            if (parser.options.locations)
            {
                this.loc = new SourceLocation(parser, loc);
            }
            if (parser.options.directSourceFile)
            {
                this.sourceFile = parser.options.directSourceFile;
            }
            if (parser.options.ranges)
            {
                this.range = [pos, 0];
            }
        };
        var pp$2 = Parser.prototype;
        pp$2.startNode =         function()
        {
            return new Node(this, this.start + this.tokMacroOffset, this.startLoc);
        };
        pp$2.startNodeAt =         function(pos, loc)
        {
            return new Node(this, pos, loc);
        };
        pp$2.startNodeFrom =         function(other)
        {
            var node = new Node(this);
            node.start = other.start;
            if (other.commentsBefore)
            {
                node.commentsBefore = other.commentsBefore;
                delete other.commentsBefore;
            }
            if (other.spacesBefore)
            {
                node.spacesBefore = other.spacesBefore;
                delete other.spacesBefore;
            }
            if (this.options.locations)
            {
                node.loc = new SourceLocation(this, node.start, node.end);
                node.loc.start = other.loc.start;
            }
            if (this.options.ranges)
            {
                node.range = [other.range[0], 0];
            }
            return node;
        };
        function finishNodeAt(node, type, pos, loc)
        {
            node.type = type;
            node.end = pos;
            if (this.options.locations)
            {
                node.loc.end = loc;
            }
            if (this.options.ranges)
            {
                node.range[1] = pos;
            }
            return node;
        }
        pp$2.finishNode =         function(node, type)
        {
            return finishNodeAt.call(this, node, type, this.lastTokEnd + this.lastTokMacroOffset, this.lastTokEndLoc);
        };
        pp$2.finishNodeAt =         function(node, type, pos, loc)
        {
            return finishNodeAt.call(this, node, type, pos, loc);
        };
        pp$2.copyNode =         function(node)
        {
            var newNode = new Node(this, node.start, this.startLoc);
            for (var prop in node)
            {
                newNode[prop] = node[prop];
            }
            return newNode;
        };
        var ecma9BinaryProperties = "ASCII ASCII_Hex_Digit AHex Alphabetic Alpha Any Assigned Bidi_Control Bidi_C Bidi_Mirrored Bidi_M Case_Ignorable CI Cased Changes_When_Casefolded CWCF Changes_When_Casemapped CWCM Changes_When_Lowercased CWL Changes_When_NFKC_Casefolded CWKCF Changes_When_Titlecased CWT Changes_When_Uppercased CWU Dash Default_Ignorable_Code_Point DI Deprecated Dep Diacritic Dia Emoji Emoji_Component Emoji_Modifier Emoji_Modifier_Base Emoji_Presentation Extender Ext Grapheme_Base Gr_Base Grapheme_Extend Gr_Ext Hex_Digit Hex IDS_Binary_Operator IDSB IDS_Trinary_Operator IDST ID_Continue IDC ID_Start IDS Ideographic Ideo Join_Control Join_C Logical_Order_Exception LOE Lowercase Lower Math Noncharacter_Code_Point NChar Pattern_Syntax Pat_Syn Pattern_White_Space Pat_WS Quotation_Mark QMark Radical Regional_Indicator RI Sentence_Terminal STerm Soft_Dotted SD Terminal_Punctuation Term Unified_Ideograph UIdeo Uppercase Upper Variation_Selector VS White_Space space XID_Continue XIDC XID_Start XIDS";
        var ecma10BinaryProperties = ecma9BinaryProperties + " Extended_Pictographic";
        var ecma11BinaryProperties = ecma10BinaryProperties;
        var ecma12BinaryProperties = ecma11BinaryProperties + " EBase EComp EMod EPres ExtPict";
        var ecma13BinaryProperties = ecma12BinaryProperties;
        var unicodeBinaryProperties = {9: ecma9BinaryProperties, 10: ecma10BinaryProperties, 11: ecma11BinaryProperties, 12: ecma12BinaryProperties, 13: ecma13BinaryProperties};
        var unicodeGeneralCategoryValues = "Cased_Letter LC Close_Punctuation Pe Connector_Punctuation Pc Control Cc cntrl Currency_Symbol Sc Dash_Punctuation Pd Decimal_Number Nd digit Enclosing_Mark Me Final_Punctuation Pf Format Cf Initial_Punctuation Pi Letter L Letter_Number Nl Line_Separator Zl Lowercase_Letter Ll Mark M Combining_Mark Math_Symbol Sm Modifier_Letter Lm Modifier_Symbol Sk Nonspacing_Mark Mn Number N Open_Punctuation Ps Other C Other_Letter Lo Other_Number No Other_Punctuation Po Other_Symbol So Paragraph_Separator Zp Private_Use Co Punctuation P punct Separator Z Space_Separator Zs Spacing_Mark Mc Surrogate Cs Symbol S Titlecase_Letter Lt Unassigned Cn Uppercase_Letter Lu";
        var ecma9ScriptValues = "Adlam Adlm Ahom Anatolian_Hieroglyphs Hluw Arabic Arab Armenian Armn Avestan Avst Balinese Bali Bamum Bamu Bassa_Vah Bass Batak Batk Bengali Beng Bhaiksuki Bhks Bopomofo Bopo Brahmi Brah Braille Brai Buginese Bugi Buhid Buhd Canadian_Aboriginal Cans Carian Cari Caucasian_Albanian Aghb Chakma Cakm Cham Cham Cherokee Cher Common Zyyy Coptic Copt Qaac Cuneiform Xsux Cypriot Cprt Cyrillic Cyrl Deseret Dsrt Devanagari Deva Duployan Dupl Egyptian_Hieroglyphs Egyp Elbasan Elba Ethiopic Ethi Georgian Geor Glagolitic Glag Gothic Goth Grantha Gran Greek Grek Gujarati Gujr Gurmukhi Guru Han Hani Hangul Hang Hanunoo Hano Hatran Hatr Hebrew Hebr Hiragana Hira Imperial_Aramaic Armi Inherited Zinh Qaai Inscriptional_Pahlavi Phli Inscriptional_Parthian Prti Javanese Java Kaithi Kthi Kannada Knda Katakana Kana Kayah_Li Kali Kharoshthi Khar Khmer Khmr Khojki Khoj Khudawadi Sind Lao Laoo Latin Latn Lepcha Lepc Limbu Limb Linear_A Lina Linear_B Linb Lisu Lisu Lycian Lyci Lydian Lydi Mahajani Mahj Malayalam Mlym Mandaic Mand Manichaean Mani Marchen Marc Masaram_Gondi Gonm Meetei_Mayek Mtei Mende_Kikakui Mend Meroitic_Cursive Merc Meroitic_Hieroglyphs Mero Miao Plrd Modi Mongolian Mong Mro Mroo Multani Mult Myanmar Mymr Nabataean Nbat New_Tai_Lue Talu Newa Newa Nko Nkoo Nushu Nshu Ogham Ogam Ol_Chiki Olck Old_Hungarian Hung Old_Italic Ital Old_North_Arabian Narb Old_Permic Perm Old_Persian Xpeo Old_South_Arabian Sarb Old_Turkic Orkh Oriya Orya Osage Osge Osmanya Osma Pahawh_Hmong Hmng Palmyrene Palm Pau_Cin_Hau Pauc Phags_Pa Phag Phoenician Phnx Psalter_Pahlavi Phlp Rejang Rjng Runic Runr Samaritan Samr Saurashtra Saur Sharada Shrd Shavian Shaw Siddham Sidd SignWriting Sgnw Sinhala Sinh Sora_Sompeng Sora Soyombo Soyo Sundanese Sund Syloti_Nagri Sylo Syriac Syrc Tagalog Tglg Tagbanwa Tagb Tai_Le Tale Tai_Tham Lana Tai_Viet Tavt Takri Takr Tamil Taml Tangut Tang Telugu Telu Thaana Thaa Thai Thai Tibetan Tibt Tifinagh Tfng Tirhuta Tirh Ugaritic Ugar Vai Vaii Warang_Citi Wara Yi Yiii Zanabazar_Square Zanb";
        var ecma10ScriptValues = ecma9ScriptValues + " Dogra Dogr Gunjala_Gondi Gong Hanifi_Rohingya Rohg Makasar Maka Medefaidrin Medf Old_Sogdian Sogo Sogdian Sogd";
        var ecma11ScriptValues = ecma10ScriptValues + " Elymaic Elym Nandinagari Nand Nyiakeng_Puachue_Hmong Hmnp Wancho Wcho";
        var ecma12ScriptValues = ecma11ScriptValues + " Chorasmian Chrs Diak Dives_Akuru Khitan_Small_Script Kits Yezi Yezidi";
        var ecma13ScriptValues = ecma12ScriptValues + " Cypro_Minoan Cpmn Old_Uyghur Ougr Tangsa Tnsa Toto Vithkuqi Vith";
        var unicodeScriptValues = {9: ecma9ScriptValues, 10: ecma10ScriptValues, 11: ecma11ScriptValues, 12: ecma12ScriptValues, 13: ecma13ScriptValues};
        var data = {};
        function buildUnicodeData(ecmaVersion)
        {
            var d = data[ecmaVersion] = {binary: wordsRegexp(unicodeBinaryProperties[ecmaVersion] + " " + unicodeGeneralCategoryValues), nonBinary: {General_Category: wordsRegexp(unicodeGeneralCategoryValues), Script: wordsRegexp(unicodeScriptValues[ecmaVersion])}};
            d.nonBinary.Script_Extensions = d.nonBinary.Script;
            d.nonBinary.gc = d.nonBinary.General_Category;
            d.nonBinary.sc = d.nonBinary.Script;
            d.nonBinary.scx = d.nonBinary.Script_Extensions;
        }
        for (var i = 0, list = [9, 10, 11, 12, 13]; i < list.length; i += 1)
        {
            var ecmaVersion = list[i];
            buildUnicodeData(ecmaVersion);
        }
        var pp$1 = Parser.prototype;
        var RegExpValidationState =         function RegExpValidationState(parser)
        {
            this.parser = parser;
            this.validFlags = "gim" + (parser.options.ecmaVersion >= 6 ? "uy" : "") + (parser.options.ecmaVersion >= 9 ? "s" : "") + (parser.options.ecmaVersion >= 13 ? "d" : "");
            this.unicodeProperties = data[parser.options.ecmaVersion >= 13 ? 13 : parser.options.ecmaVersion];
            this.source = "";
            this.flags = "";
            this.start = 0;
            this.switchU = false;
            this.switchN = false;
            this.pos = 0;
            this.lastIntValue = 0;
            this.lastStringValue = "";
            this.lastAssertionIsQuantifiable = false;
            this.numCapturingParens = 0;
            this.maxBackReference = 0;
            this.groupNames = [];
            this.backReferenceNames = [];
        };
        RegExpValidationState.prototype.reset =         function reset(start, pattern, flags)
        {
            var unicode = flags.indexOf("u") !== -1;
            this.start = start | 0;
            this.source = pattern + "";
            this.flags = flags;
            this.switchU = unicode && this.parser.options.ecmaVersion >= 6;
            this.switchN = unicode && this.parser.options.ecmaVersion >= 9;
        };
        RegExpValidationState.prototype.raise =         function raise(message)
        {
            this.parser.raiseRecoverable(this.start, "Invalid regular expression: /" + this.source + "/: " + message);
        };
        RegExpValidationState.prototype.at =         function at(i, forceU)
        {
            if (forceU === void 0)
                forceU = false;
            var s = this.source;
            var l = s.length;
            if (i >= l)
            {
                return -1;
            }
            var c = s.charCodeAt(i);
            if (!(forceU || this.switchU) || c <= 0xD7FF || c >= 0xE000 || i + 1 >= l)
            {
                return c;
            }
            var next = s.charCodeAt(i + 1);
            return next >= 0xDC00 && next <= 0xDFFF ? (c << 10) + next - 0x35FDC00 : c;
        };
        RegExpValidationState.prototype.nextIndex =         function nextIndex(i, forceU)
        {
            if (forceU === void 0)
                forceU = false;
            var s = this.source;
            var l = s.length;
            if (i >= l)
            {
                return l;
            }
            var c = s.charCodeAt(i),
                next;
            if (!(forceU || this.switchU) || c <= 0xD7FF || c >= 0xE000 || i + 1 >= l || (next = s.charCodeAt(i + 1)) < 0xDC00 || next > 0xDFFF)
            {
                return i + 1;
            }
            return i + 2;
        };
        RegExpValidationState.prototype.current =         function current(forceU)
        {
            if (forceU === void 0)
                forceU = false;
            return this.at(this.pos, forceU);
        };
        RegExpValidationState.prototype.lookahead =         function lookahead(forceU)
        {
            if (forceU === void 0)
                forceU = false;
            return this.at(this.nextIndex(this.pos, forceU), forceU);
        };
        RegExpValidationState.prototype.advance =         function advance(forceU)
        {
            if (forceU === void 0)
                forceU = false;
            this.pos = this.nextIndex(this.pos, forceU);
        };
        RegExpValidationState.prototype.eat =         function eat(ch, forceU)
        {
            if (forceU === void 0)
                forceU = false;
            if (this.current(forceU) === ch)
            {
                this.advance(forceU);
                return true;
            }
            return false;
        };
        pp$1.validateRegExpFlags =         function(state)
        {
            var validFlags = state.validFlags;
            var flags = state.flags;
            for (var i = 0; i < flags.length; i++)
            {
                var flag = flags.charAt(i);
                if (validFlags.indexOf(flag) === -1)
                {
                    this.raise(state.start, "Invalid regular expression flag");
                }
                if (flags.indexOf(flag, i + 1) > -1)
                {
                    this.raise(state.start, "Duplicate regular expression flag");
                }
            }
        };
        pp$1.validateRegExpPattern =         function(state)
        {
            this.regexp_pattern(state);
            if (!state.switchN && this.options.ecmaVersion >= 9 && state.groupNames.length > 0)
            {
                state.switchN = true;
                this.regexp_pattern(state);
            }
        };
        pp$1.regexp_pattern =         function(state)
        {
            state.pos = 0;
            state.lastIntValue = 0;
            state.lastStringValue = "";
            state.lastAssertionIsQuantifiable = false;
            state.numCapturingParens = 0;
            state.maxBackReference = 0;
            state.groupNames.length = 0;
            state.backReferenceNames.length = 0;
            this.regexp_disjunction(state);
            if (state.pos !== state.source.length)
            {
                if (state.eat(0x29))
                {
                    state.raise("Unmatched ')'");
                }
                if (state.eat(0x5D) || state.eat(0x7D))
                {
                    state.raise("Lone quantifier brackets");
                }
            }
            if (state.maxBackReference > state.numCapturingParens)
            {
                state.raise("Invalid escape");
            }
            for (var i = 0, list = state.backReferenceNames; i < list.length; i += 1)
            {
                var name = list[i];
                if (state.groupNames.indexOf(name) === -1)
                {
                    state.raise("Invalid named capture referenced");
                }
            }
        };
        pp$1.regexp_disjunction =         function(state)
        {
            this.regexp_alternative(state);
            while (state.eat(0x7C))
            {
                this.regexp_alternative(state);
            }
            if (this.regexp_eatQuantifier(state, true))
            {
                state.raise("Nothing to repeat");
            }
            if (state.eat(0x7B))
            {
                state.raise("Lone quantifier brackets");
            }
        };
        pp$1.regexp_alternative =         function(state)
        {
            while (state.pos < state.source.length && this.regexp_eatTerm(state))
            {
            }
        };
        pp$1.regexp_eatTerm =         function(state)
        {
            if (this.regexp_eatAssertion(state))
            {
                if (state.lastAssertionIsQuantifiable && this.regexp_eatQuantifier(state))
                {
                    if (state.switchU)
                    {
                        state.raise("Invalid quantifier");
                    }
                }
                return true;
            }
            if (state.switchU ? this.regexp_eatAtom(state) : this.regexp_eatExtendedAtom(state))
            {
                this.regexp_eatQuantifier(state);
                return true;
            }
            return false;
        };
        pp$1.regexp_eatAssertion =         function(state)
        {
            var start = state.pos;
            state.lastAssertionIsQuantifiable = false;
            if (state.eat(0x5E) || state.eat(0x24))
            {
                return true;
            }
            if (state.eat(0x5C))
            {
                if (state.eat(0x42) || state.eat(0x62))
                {
                    return true;
                }
                state.pos = start;
            }
            if (state.eat(0x28) && state.eat(0x3F))
            {
                var lookbehind = false;
                if (this.options.ecmaVersion >= 9)
                {
                    lookbehind = state.eat(0x3C);
                }
                if (state.eat(0x3D) || state.eat(0x21))
                {
                    this.regexp_disjunction(state);
                    if (!state.eat(0x29))
                    {
                        state.raise("Unterminated group");
                    }
                    state.lastAssertionIsQuantifiable = !lookbehind;
                    return true;
                }
            }
            state.pos = start;
            return false;
        };
        pp$1.regexp_eatQuantifier =         function(state, noError)
        {
            if (noError === void 0)
                noError = false;
            if (this.regexp_eatQuantifierPrefix(state, noError))
            {
                state.eat(0x3F);
                return true;
            }
            return false;
        };
        pp$1.regexp_eatQuantifierPrefix =         function(state, noError)
        {
            return state.eat(0x2A) || state.eat(0x2B) || state.eat(0x3F) || this.regexp_eatBracedQuantifier(state, noError);
        };
        pp$1.regexp_eatBracedQuantifier =         function(state, noError)
        {
            var start = state.pos;
            if (state.eat(0x7B))
            {
                var min = 0,
                    max = -1;
                if (this.regexp_eatDecimalDigits(state))
                {
                    min = state.lastIntValue;
                    if (state.eat(0x2C) && this.regexp_eatDecimalDigits(state))
                    {
                        max = state.lastIntValue;
                    }
                    if (state.eat(0x7D))
                    {
                        if (max !== -1 && max < min && !noError)
                        {
                            state.raise("numbers out of order in {} quantifier");
                        }
                        return true;
                    }
                }
                if (state.switchU && !noError)
                {
                    state.raise("Incomplete quantifier");
                }
                state.pos = start;
            }
            return false;
        };
        pp$1.regexp_eatAtom =         function(state)
        {
            return this.regexp_eatPatternCharacters(state) || state.eat(0x2E) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state);
        };
        pp$1.regexp_eatReverseSolidusAtomEscape =         function(state)
        {
            var start = state.pos;
            if (state.eat(0x5C))
            {
                if (this.regexp_eatAtomEscape(state))
                {
                    return true;
                }
                state.pos = start;
            }
            return false;
        };
        pp$1.regexp_eatUncapturingGroup =         function(state)
        {
            var start = state.pos;
            if (state.eat(0x28))
            {
                if (state.eat(0x3F) && state.eat(0x3A))
                {
                    this.regexp_disjunction(state);
                    if (state.eat(0x29))
                    {
                        return true;
                    }
                    state.raise("Unterminated group");
                }
                state.pos = start;
            }
            return false;
        };
        pp$1.regexp_eatCapturingGroup =         function(state)
        {
            if (state.eat(0x28))
            {
                if (this.options.ecmaVersion >= 9)
                {
                    this.regexp_groupSpecifier(state);
                }
                else if (state.current() === 0x3F)
                {
                    state.raise("Invalid group");
                }
                this.regexp_disjunction(state);
                if (state.eat(0x29))
                {
                    state.numCapturingParens += 1;
                    return true;
                }
                state.raise("Unterminated group");
            }
            return false;
        };
        pp$1.regexp_eatExtendedAtom =         function(state)
        {
            return state.eat(0x2E) || this.regexp_eatReverseSolidusAtomEscape(state) || this.regexp_eatCharacterClass(state) || this.regexp_eatUncapturingGroup(state) || this.regexp_eatCapturingGroup(state) || this.regexp_eatInvalidBracedQuantifier(state) || this.regexp_eatExtendedPatternCharacter(state);
        };
        pp$1.regexp_eatInvalidBracedQuantifier =         function(state)
        {
            if (this.regexp_eatBracedQuantifier(state, true))
            {
                state.raise("Nothing to repeat");
            }
            return false;
        };
        pp$1.regexp_eatSyntaxCharacter =         function(state)
        {
            var ch = state.current();
            if (isSyntaxCharacter(ch))
            {
                state.lastIntValue = ch;
                state.advance();
                return true;
            }
            return false;
        };
        function isSyntaxCharacter(ch)
        {
            return ch === 0x24 || ch >= 0x28 && ch <= 0x2B || ch === 0x2E || ch === 0x3F || ch >= 0x5B && ch <= 0x5E || ch >= 0x7B && ch <= 0x7D;
        }
        pp$1.regexp_eatPatternCharacters =         function(state)
        {
            var start = state.pos;
            var ch = 0;
            while ((ch = state.current()) !== -1 && !isSyntaxCharacter(ch))
            {
                state.advance();
            }
            return state.pos !== start;
        };
        pp$1.regexp_eatExtendedPatternCharacter =         function(state)
        {
            var ch = state.current();
            if (ch !== -1 && ch !== 0x24 && !(ch >= 0x28 && ch <= 0x2B) && ch !== 0x2E && ch !== 0x3F && ch !== 0x5B && ch !== 0x5E && ch !== 0x7C)
            {
                state.advance();
                return true;
            }
            return false;
        };
        pp$1.regexp_groupSpecifier =         function(state)
        {
            if (state.eat(0x3F))
            {
                if (this.regexp_eatGroupName(state))
                {
                    if (state.groupNames.indexOf(state.lastStringValue) !== -1)
                    {
                        state.raise("Duplicate capture group name");
                    }
                    state.groupNames.push(state.lastStringValue);
                    return;
                }
                state.raise("Invalid group");
            }
        };
        pp$1.regexp_eatGroupName =         function(state)
        {
            state.lastStringValue = "";
            if (state.eat(0x3C))
            {
                if (this.regexp_eatRegExpIdentifierName(state) && state.eat(0x3E))
                {
                    return true;
                }
                state.raise("Invalid capture group name");
            }
            return false;
        };
        pp$1.regexp_eatRegExpIdentifierName =         function(state)
        {
            state.lastStringValue = "";
            if (this.regexp_eatRegExpIdentifierStart(state))
            {
                state.lastStringValue += codePointToString(state.lastIntValue);
                while (this.regexp_eatRegExpIdentifierPart(state))
                {
                    state.lastStringValue += codePointToString(state.lastIntValue);
                }
                return true;
            }
            return false;
        };
        pp$1.regexp_eatRegExpIdentifierStart =         function(state)
        {
            var start = state.pos;
            var forceU = this.options.ecmaVersion >= 11;
            var ch = state.current(forceU);
            state.advance(forceU);
            if (ch === 0x5C && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU))
            {
                ch = state.lastIntValue;
            }
            if (isRegExpIdentifierStart(ch))
            {
                state.lastIntValue = ch;
                return true;
            }
            state.pos = start;
            return false;
        };
        function isRegExpIdentifierStart(ch)
        {
            return isIdentifierStart(ch, true) || ch === 0x24 || ch === 0x5F;
        }
        pp$1.regexp_eatRegExpIdentifierPart =         function(state)
        {
            var start = state.pos;
            var forceU = this.options.ecmaVersion >= 11;
            var ch = state.current(forceU);
            state.advance(forceU);
            if (ch === 0x5C && this.regexp_eatRegExpUnicodeEscapeSequence(state, forceU))
            {
                ch = state.lastIntValue;
            }
            if (isRegExpIdentifierPart(ch))
            {
                state.lastIntValue = ch;
                return true;
            }
            state.pos = start;
            return false;
        };
        function isRegExpIdentifierPart(ch)
        {
            return isIdentifierChar(ch, true) || ch === 0x24 || ch === 0x5F || ch === 0x200C || ch === 0x200D;
        }
        pp$1.regexp_eatAtomEscape =         function(state)
        {
            if (this.regexp_eatBackReference(state) || this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state) || state.switchN && this.regexp_eatKGroupName(state))
            {
                return true;
            }
            if (state.switchU)
            {
                if (state.current() === 0x63)
                {
                    state.raise("Invalid unicode escape");
                }
                state.raise("Invalid escape");
            }
            return false;
        };
        pp$1.regexp_eatBackReference =         function(state)
        {
            var start = state.pos;
            if (this.regexp_eatDecimalEscape(state))
            {
                var n = state.lastIntValue;
                if (state.switchU)
                {
                    if (n > state.maxBackReference)
                    {
                        state.maxBackReference = n;
                    }
                    return true;
                }
                if (n <= state.numCapturingParens)
                {
                    return true;
                }
                state.pos = start;
            }
            return false;
        };
        pp$1.regexp_eatKGroupName =         function(state)
        {
            if (state.eat(0x6B))
            {
                if (this.regexp_eatGroupName(state))
                {
                    state.backReferenceNames.push(state.lastStringValue);
                    return true;
                }
                state.raise("Invalid named reference");
            }
            return false;
        };
        pp$1.regexp_eatCharacterEscape =         function(state)
        {
            return this.regexp_eatControlEscape(state) || this.regexp_eatCControlLetter(state) || this.regexp_eatZero(state) || this.regexp_eatHexEscapeSequence(state) || this.regexp_eatRegExpUnicodeEscapeSequence(state, false) || !state.switchU && this.regexp_eatLegacyOctalEscapeSequence(state) || this.regexp_eatIdentityEscape(state);
        };
        pp$1.regexp_eatCControlLetter =         function(state)
        {
            var start = state.pos;
            if (state.eat(0x63))
            {
                if (this.regexp_eatControlLetter(state))
                {
                    return true;
                }
                state.pos = start;
            }
            return false;
        };
        pp$1.regexp_eatZero =         function(state)
        {
            if (state.current() === 0x30 && !isDecimalDigit(state.lookahead()))
            {
                state.lastIntValue = 0;
                state.advance();
                return true;
            }
            return false;
        };
        pp$1.regexp_eatControlEscape =         function(state)
        {
            var ch = state.current();
            if (ch === 0x74)
            {
                state.lastIntValue = 0x09;
                state.advance();
                return true;
            }
            if (ch === 0x6E)
            {
                state.lastIntValue = 0x0A;
                state.advance();
                return true;
            }
            if (ch === 0x76)
            {
                state.lastIntValue = 0x0B;
                state.advance();
                return true;
            }
            if (ch === 0x66)
            {
                state.lastIntValue = 0x0C;
                state.advance();
                return true;
            }
            if (ch === 0x72)
            {
                state.lastIntValue = 0x0D;
                state.advance();
                return true;
            }
            return false;
        };
        pp$1.regexp_eatControlLetter =         function(state)
        {
            var ch = state.current();
            if (isControlLetter(ch))
            {
                state.lastIntValue = ch % 0x20;
                state.advance();
                return true;
            }
            return false;
        };
        function isControlLetter(ch)
        {
            return ch >= 0x41 && ch <= 0x5A || ch >= 0x61 && ch <= 0x7A;
        }
        pp$1.regexp_eatRegExpUnicodeEscapeSequence =         function(state, forceU)
        {
            if (forceU === void 0)
                forceU = false;
            var start = state.pos;
            var switchU = forceU || state.switchU;
            if (state.eat(0x75))
            {
                if (this.regexp_eatFixedHexDigits(state, 4))
                {
                    var lead = state.lastIntValue;
                    if (switchU && lead >= 0xD800 && lead <= 0xDBFF)
                    {
                        var leadSurrogateEnd = state.pos;
                        if (state.eat(0x5C) && state.eat(0x75) && this.regexp_eatFixedHexDigits(state, 4))
                        {
                            var trail = state.lastIntValue;
                            if (trail >= 0xDC00 && trail <= 0xDFFF)
                            {
                                state.lastIntValue = (lead - 0xD800) * 0x400 + (trail - 0xDC00) + 0x10000;
                                return true;
                            }
                        }
                        state.pos = leadSurrogateEnd;
                        state.lastIntValue = lead;
                    }
                    return true;
                }
                if (switchU && state.eat(0x7B) && this.regexp_eatHexDigits(state) && state.eat(0x7D) && isValidUnicode(state.lastIntValue))
                {
                    return true;
                }
                if (switchU)
                {
                    state.raise("Invalid unicode escape");
                }
                state.pos = start;
            }
            return false;
        };
        function isValidUnicode(ch)
        {
            return ch >= 0 && ch <= 0x10FFFF;
        }
        pp$1.regexp_eatIdentityEscape =         function(state)
        {
            if (state.switchU)
            {
                if (this.regexp_eatSyntaxCharacter(state))
                {
                    return true;
                }
                if (state.eat(0x2F))
                {
                    state.lastIntValue = 0x2F;
                    return true;
                }
                return false;
            }
            var ch = state.current();
            if (ch !== 0x63 && (!state.switchN || ch !== 0x6B))
            {
                state.lastIntValue = ch;
                state.advance();
                return true;
            }
            return false;
        };
        pp$1.regexp_eatDecimalEscape =         function(state)
        {
            state.lastIntValue = 0;
            var ch = state.current();
            if (ch >= 0x31 && ch <= 0x39)
            {
                do
                {
                    state.lastIntValue = 10 * state.lastIntValue + (ch - 0x30);
                    state.advance();
                }
                while ((ch = state.current()) >= 0x30 && ch <= 0x39);
                return true;
            }
            return false;
        };
        pp$1.regexp_eatCharacterClassEscape =         function(state)
        {
            var ch = state.current();
            if (isCharacterClassEscape(ch))
            {
                state.lastIntValue = -1;
                state.advance();
                return true;
            }
            if (state.switchU && this.options.ecmaVersion >= 9 && (ch === 0x50 || ch === 0x70))
            {
                state.lastIntValue = -1;
                state.advance();
                if (state.eat(0x7B) && this.regexp_eatUnicodePropertyValueExpression(state) && state.eat(0x7D))
                {
                    return true;
                }
                state.raise("Invalid property name");
            }
            return false;
        };
        function isCharacterClassEscape(ch)
        {
            return ch === 0x64 || ch === 0x44 || ch === 0x73 || ch === 0x53 || ch === 0x77 || ch === 0x57;
        }
        pp$1.regexp_eatUnicodePropertyValueExpression =         function(state)
        {
            var start = state.pos;
            if (this.regexp_eatUnicodePropertyName(state) && state.eat(0x3D))
            {
                var name = state.lastStringValue;
                if (this.regexp_eatUnicodePropertyValue(state))
                {
                    var value = state.lastStringValue;
                    this.regexp_validateUnicodePropertyNameAndValue(state, name, value);
                    return true;
                }
            }
            state.pos = start;
            if (this.regexp_eatLoneUnicodePropertyNameOrValue(state))
            {
                var nameOrValue = state.lastStringValue;
                this.regexp_validateUnicodePropertyNameOrValue(state, nameOrValue);
                return true;
            }
            return false;
        };
        pp$1.regexp_validateUnicodePropertyNameAndValue =         function(state, name, value)
        {
            if (!hasOwn(state.unicodeProperties.nonBinary, name))
            {
                state.raise("Invalid property name");
            }
            if (!state.unicodeProperties.nonBinary[name].test(value))
            {
                state.raise("Invalid property value");
            }
        };
        pp$1.regexp_validateUnicodePropertyNameOrValue =         function(state, nameOrValue)
        {
            if (!state.unicodeProperties.binary.test(nameOrValue))
            {
                state.raise("Invalid property name");
            }
        };
        pp$1.regexp_eatUnicodePropertyName =         function(state)
        {
            var ch = 0;
            state.lastStringValue = "";
            while (isUnicodePropertyNameCharacter(ch = state.current()))
            {
                state.lastStringValue += codePointToString(ch);
                state.advance();
            }
            return state.lastStringValue !== "";
        };
        function isUnicodePropertyNameCharacter(ch)
        {
            return isControlLetter(ch) || ch === 0x5F;
        }
        pp$1.regexp_eatUnicodePropertyValue =         function(state)
        {
            var ch = 0;
            state.lastStringValue = "";
            while (isUnicodePropertyValueCharacter(ch = state.current()))
            {
                state.lastStringValue += codePointToString(ch);
                state.advance();
            }
            return state.lastStringValue !== "";
        };
        function isUnicodePropertyValueCharacter(ch)
        {
            return isUnicodePropertyNameCharacter(ch) || isDecimalDigit(ch);
        }
        pp$1.regexp_eatLoneUnicodePropertyNameOrValue =         function(state)
        {
            return this.regexp_eatUnicodePropertyValue(state);
        };
        pp$1.regexp_eatCharacterClass =         function(state)
        {
            if (state.eat(0x5B))
            {
                state.eat(0x5E);
                this.regexp_classRanges(state);
                if (state.eat(0x5D))
                {
                    return true;
                }
                state.raise("Unterminated character class");
            }
            return false;
        };
        pp$1.regexp_classRanges =         function(state)
        {
            while (this.regexp_eatClassAtom(state))
            {
                var left = state.lastIntValue;
                if (state.eat(0x2D) && this.regexp_eatClassAtom(state))
                {
                    var right = state.lastIntValue;
                    if (state.switchU && (left === -1 || right === -1))
                    {
                        state.raise("Invalid character class");
                    }
                    if (left !== -1 && right !== -1 && left > right)
                    {
                        state.raise("Range out of order in character class");
                    }
                }
            }
        };
        pp$1.regexp_eatClassAtom =         function(state)
        {
            var start = state.pos;
            if (state.eat(0x5C))
            {
                if (this.regexp_eatClassEscape(state))
                {
                    return true;
                }
                if (state.switchU)
                {
                    var ch$1 = state.current();
                    if (ch$1 === 0x63 || isOctalDigit(ch$1))
                    {
                        state.raise("Invalid class escape");
                    }
                    state.raise("Invalid escape");
                }
                state.pos = start;
            }
            var ch = state.current();
            if (ch !== 0x5D)
            {
                state.lastIntValue = ch;
                state.advance();
                return true;
            }
            return false;
        };
        pp$1.regexp_eatClassEscape =         function(state)
        {
            var start = state.pos;
            if (state.eat(0x62))
            {
                state.lastIntValue = 0x08;
                return true;
            }
            if (state.switchU && state.eat(0x2D))
            {
                state.lastIntValue = 0x2D;
                return true;
            }
            if (!state.switchU && state.eat(0x63))
            {
                if (this.regexp_eatClassControlLetter(state))
                {
                    return true;
                }
                state.pos = start;
            }
            return this.regexp_eatCharacterClassEscape(state) || this.regexp_eatCharacterEscape(state);
        };
        pp$1.regexp_eatClassControlLetter =         function(state)
        {
            var ch = state.current();
            if (isDecimalDigit(ch) || ch === 0x5F)
            {
                state.lastIntValue = ch % 0x20;
                state.advance();
                return true;
            }
            return false;
        };
        pp$1.regexp_eatHexEscapeSequence =         function(state)
        {
            var start = state.pos;
            if (state.eat(0x78))
            {
                if (this.regexp_eatFixedHexDigits(state, 2))
                {
                    return true;
                }
                if (state.switchU)
                {
                    state.raise("Invalid escape");
                }
                state.pos = start;
            }
            return false;
        };
        pp$1.regexp_eatDecimalDigits =         function(state)
        {
            var start = state.pos;
            var ch = 0;
            state.lastIntValue = 0;
            while (isDecimalDigit(ch = state.current()))
            {
                state.lastIntValue = 10 * state.lastIntValue + (ch - 0x30);
                state.advance();
            }
            return state.pos !== start;
        };
        function isDecimalDigit(ch)
        {
            return ch >= 0x30 && ch <= 0x39;
        }
        pp$1.regexp_eatHexDigits =         function(state)
        {
            var start = state.pos;
            var ch = 0;
            state.lastIntValue = 0;
            while (isHexDigit(ch = state.current()))
            {
                state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
                state.advance();
            }
            return state.pos !== start;
        };
        function isHexDigit(ch)
        {
            return ch >= 0x30 && ch <= 0x39 || ch >= 0x41 && ch <= 0x46 || ch >= 0x61 && ch <= 0x66;
        }
        function hexToInt(ch)
        {
            if (ch >= 0x41 && ch <= 0x46)
            {
                return 10 + (ch - 0x41);
            }
            if (ch >= 0x61 && ch <= 0x66)
            {
                return 10 + (ch - 0x61);
            }
            return ch - 0x30;
        }
        pp$1.regexp_eatLegacyOctalEscapeSequence =         function(state)
        {
            if (this.regexp_eatOctalDigit(state))
            {
                var n1 = state.lastIntValue;
                if (this.regexp_eatOctalDigit(state))
                {
                    var n2 = state.lastIntValue;
                    if (n1 <= 3 && this.regexp_eatOctalDigit(state))
                    {
                        state.lastIntValue = n1 * 64 + n2 * 8 + state.lastIntValue;
                    }
                    else
                    {
                        state.lastIntValue = n1 * 8 + n2;
                    }
                }
                else
                {
                    state.lastIntValue = n1;
                }
                return true;
            }
            return false;
        };
        pp$1.regexp_eatOctalDigit =         function(state)
        {
            var ch = state.current();
            if (isOctalDigit(ch))
            {
                state.lastIntValue = ch - 0x30;
                state.advance();
                return true;
            }
            state.lastIntValue = 0;
            return false;
        };
        function isOctalDigit(ch)
        {
            return ch >= 0x30 && ch <= 0x37;
        }
        pp$1.regexp_eatFixedHexDigits =         function(state, length)
        {
            var start = state.pos;
            state.lastIntValue = 0;
            for (var i = 0; i < length; ++i)
            {
                var ch = state.current();
                if (!isHexDigit(ch))
                {
                    state.pos = start;
                    return false;
                }
                state.lastIntValue = 16 * state.lastIntValue + hexToInt(ch);
                state.advance();
            }
            return true;
        };
        var Token =         function Token(p)
        {
            this.type = p.type;
            this.value = p.value;
            this.start = p.start;
            this.end = p.end;
            if (p.tokMacroOffset)
            {
                this.tokMacroOffset = p.tokMacroOffset;
            }
            if (p.options.locations)
            {
                this.loc = new SourceLocation(p, p.startLoc, p.endLoc);
            }
            if (p.options.ranges)
            {
                this.range = [p.start, p.end];
            }
        };
        var pp = Parser.prototype;
        pp.next =         function(ignoreEscapeSequenceInKeyword, stealth, onlyTransformArguments)
        {
            if (!ignoreEscapeSequenceInKeyword && this.type.keyword && this.containsEsc)
            {
                this.raiseRecoverable(this.start, "Escape sequence in keyword " + this.type.keyword);
            }
            if (this.options.onToken)
            {
                this.options.onToken(new Token(this));
            }
            if (!stealth)
            {
                this.lastTokEnd = this.end;
                this.lastTokStart = this.start;
                this.lastTokEndLoc = this.endLoc;
                this.lastTokStartLoc = this.startLoc;
                this.lastEndOfFile = this.firstEndOfFile;
                this.lastTokMacroOffset = this.tokMacroOffset;
            }
            this.firstEndOfFile = null;
            this.nodeMessageSendObjectExpression = null;
            this.nextToken(stealth, onlyTransformArguments);
        };
        pp.getToken =         function()
        {
            this.next();
            return new Token(this);
        };
        if (typeof Symbol !== "undefined")
        {
            pp[Symbol.iterator] =             function()
            {
                var this$1$1 = this;
                return {next:                 function()
                {
                    var token = this$1$1.getToken();
                    return {done: token.type === types$1.eof, value: token};
                }};
            };
        }
        pp.nextToken =         function(stealth, onlyTransformMacroArguments)
        {
            var curContext = this.curContext();
            if (!curContext || !curContext.preserveSpace)
            {
                this.skipSpace();
            }
            this.start = this.pos;
            this.tokInput = this.input;
            if (!stealth)
            {
                this.lastEndInput = this.tokInput;
                this.tokFirstStart = this.start;
            }
            this.localLastEnd = this.firstEnd;
            this.tokMacroOffset = this.tokPosMacroOffset;
            this.preTokParameterScope = this.preprocessParameterScope;
            if (this.options.locations)
            {
                this.startLoc = this.curPosition();
            }
            if (this.pos >= this.input.length)
            {
                return this.finishToken(types$1.eof);
            }
            if (curContext.override)
            {
                return curContext.override(this);
            }
            else
            {
                this.readToken(this.fullCharCodeAtPos(), stealth, onlyTransformMacroArguments);
            }
        };
        pp.readToken =         function(code, stealth, onlyTransformMacroArguments)
        {
            if (isIdentifierStart(code, this.options.ecmaVersion >= 6) || code === 92)
            {
                return this.readWord(null, onlyTransformMacroArguments);
            }
            return this.getTokenFromCode(code);
        };
        pp.fullCharCodeAtPos =         function()
        {
            var code = this.input.charCodeAt(this.pos);
            if (code <= 0xd7ff || code >= 0xdc00)
            {
                return code;
            }
            var next = this.input.charCodeAt(this.pos + 1);
            return next <= 0xdbff || next >= 0xe000 ? code : (code << 10) + next - 0x35fdc00;
        };
        pp.skipBlockComment =         function()
        {
            var startLoc = this.options.onComment && this.curPosition();
            var start = this.pos,
                end = this.input.indexOf("*/", this.pos += 2);
            if (end === -1)
            {
                this.raise(this.pos - 2, "Unterminated comment");
            }
            this.pos = end + 2;
            if (this.options.locations)
            {
                for (var nextBreak = void 0, pos = start; (nextBreak = nextLineBreak(this.input, pos, this.pos)) > -1; )
                {
                    ++this.curLine;
                    pos = this.lineStart = nextBreak;
                }
            }
            if (this.options.onComment)
            {
                this.options.onComment(true, this.input.slice(start + 2, end), start, this.pos, startLoc, this.curPosition());
            }
        };
        pp.skipLineComment =         function(startSkip)
        {
            var start = this.pos;
            var startLoc = this.options.onComment && this.curPosition();
            var ch = this.input.charCodeAt(this.pos += startSkip);
            while (this.pos < this.input.length && !isNewLine(ch))
            {
                ch = this.input.charCodeAt(++this.pos);
            }
            if (this.options.onComment)
            {
                this.options.onComment(false, this.input.slice(start + startSkip, this.pos), start, this.pos, startLoc, this.curPosition());
            }
        };
        pp.skipSpace =         function(dontSkipEOL, dontSkipMacroBoundary)
        {
            var ch;
loop:             while (true)
            {
                if (this.pos >= this.input.length)
                {
                    if (this.options.preprocess)
                    {
                        if (dontSkipMacroBoundary)
                        {
                            return true;
                        }
                        if (!this.preprocessStack.length)
                        {
                            break;
                        }
                        if (this.firstEndOfFile == null)
                        {
                            this.firstEndOfFile = this.pos;
                        }
                        var lastItem = this.preprocessStack.pop();
                        this.pos = lastItem.end;
                        this.input = lastItem.input;
                        this.curLine = lastItem.currentLine;
                        this.lineStart = lastItem.currentLineStart;
                        this.preprocessOnlyTransformArgumentsForLastToken = lastItem.onlyTransformArgumentsForLastToken;
                        this.preprocessParameterScope = lastItem.parameterScope;
                        this.tokPosMacroOffset = lastItem.macroOffset;
                        this.sourceFile = lastItem.sourceFile;
                        this.firstEnd = lastItem.lastEnd;
                        var lastIndex = this.preprocessStack.length;
                        this.preprocessStackLastItem = lastIndex ? this.preprocessStack[lastIndex - 1] : null;
                        return this.skipSpace(dontSkipEOL);
                    }
                    else
                    {
                        break;
                    }
                }
                ch = this.input.charCodeAt(this.pos);
                switch(ch) {
                    case 32:
                    case 160:
                        ++this.pos;
                        break;
                    case 13:
                        if (dontSkipEOL)
                        {
                            break loop;
                        }
                        if (this.input.charCodeAt(this.pos + 1) === 10)
                        {
                            ++this.pos;
                        }
                    case 10:
                    case 8232:
                    case 8233:
                        if (dontSkipEOL)
                        {
                            break loop;
                        }
                        ++this.pos;
                        if (this.options.locations)
                        {
                            ++this.curLine;
                            this.lineStart = this.pos;
                        }
                        break;
                    case 47:
                        switch(this.input.charCodeAt(this.pos + 1)) {
                            case 42:
                                this.skipBlockComment();
                                break;
                            case 47:
                                this.skipLineComment(2);
                                break;
default:
                                break loop;
                        }
                        break;
                    case 92:
                        if (!this.options.preprocess)
                        {
                            break loop;
                        }
                        var pos = this.pos + 1;
                        ch = this.input.charCodeAt(pos);
                        while (pos < this.input.length && (ch === 32 || ch === 9 || ch === 11 || ch === 12 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch))))
                        {
                            ch = this.input.charCodeAt(++pos);
                        }
                        lineBreak.lastIndex = 0;
                        var match = lineBreak.exec(this.input.slice(pos, pos + 2));
                        if (match && match.index === 0)
                        {
                            this.pos = pos + match[0].length;
                            if (this.options.locations)
                            {
                                ++this.curLine;
                                this.lineStart = this.pos;
                            }
                        }
                        else
                        {
                            break loop;
                        }
                        break;
default:
                        if (ch > 8 && ch < 14 || ch >= 5760 && nonASCIIwhitespace.test(String.fromCharCode(ch)))
                        {
                            ++this.pos;
                        }
                        else
                        {
                            break loop;
                        }
                }
            }
            return ch;
        };
        pp.finishToken =         function(type, val)
        {
            this.end = this.pos;
            if (this.options.locations)
            {
                this.endLoc = this.curPosition();
            }
            var prevType = this.type;
            this.type = type;
            this.value = val;
            this.updateContext(prevType);
            if (this.options.preprocess && this.preprocessPrescanFor(35, 35))
            {
                this.skipSpace();
                var val1 = val != null ? val : type.label || type.type;
                this.pos += 2;
                if (val1 != null)
                {
                    var positionOffset = this.options.locations && new PositionOffset(this.curLine, this.lineStart);
                    var saveTokInput = this.tokInput,
                        saveTokEnd = this.end,
                        saveTokStart = this.start,
                        start = this.start + this.tokMacroOffset,
                        variadicName = this.preprocessStackLastItem && this.preprocessStackLastItem.macro && this.preprocessStackLastItem.macro.variadicName;
                    this.skipSpace();
                    var isVariadic;
                    if (variadicName && variadicName === this.input.slice(this.pos, this.pos + variadicName.length))
                    {
                        isVariadic = true;
                    }
                    this.preConcatenating = true;
                    this.nextToken(false, 2);
                    this.preConcatenating = false;
                    var val2 = this.value != null ? this.value : this.type.keyword || this.type.label;
                    if (val2 != null)
                    {
                        if (isVariadic && val1 === "," && val2 === "")
                        {
                            return this.nextToken();
                        }
                        var concat = "" + val1 + val2,
                            val2TokStart = this.start + this.tokPosMacroOffset;
                        this.skipSpace();
                        var concatMacro = new Macro(null, concat, null, start, false, null, false, positionOffset);
                        var r = this.readTokenFromMacro(concatMacro, this.tokPosMacroOffset, this.preprocessStackLastItem ? this.preprocessStackLastItem.parameterDict : null, null, this.pos, this.next, null);
                        if (this.preprocessStackLastItem && this.preprocessStackLastItem.macro === concatMacro && this.pos !== this.input.length)
                        {
                            this.type = type;
                            this.start = saveTokStart;
                            this.end = saveTokEnd;
                            this.tokInput = saveTokInput;
                            this.tokPosMacroOffset = val2TokStart - val1.length;
                            if (!isVariadic)
                            {
                                console.warn("Warning: pasting formed '" + concat + "', an invalid preprocessing token");
                            }
                        }
                        else
                        {
                            return r;
                        }
                    }
                }
            }
        };
        pp.readToken_dot =         function(finisher)
        {
            var next = this.input.charCodeAt(this.pos + 1);
            if (next >= 48 && next <= 57)
            {
                return this.readNumber(true, pp.finishToken);
            }
            var next2 = this.input.charCodeAt(this.pos + 2);
            if ((this.options.ecmaVersion >= 6 || this.preprocessIsParsingPreprocess) && next === 46 && next2 === 46)
            {
                this.pos += 3;
                return finisher.call(this, types$1.ellipsis);
            }
            else
            {
                ++this.pos;
                return finisher.call(this, types$1.dot);
            }
        };
        pp.readToken_slash =         function(finisher)
        {
            var next = this.input.charCodeAt(this.pos + 1);
            if (this.exprAllowed)
            {
                ++this.pos;
                return this.readRegexp();
            }
            if (next === 61)
            {
                return this.finishOp(types$1.assign, 2, finisher);
            }
            return this.finishOp(types$1.slash, 1, finisher);
        };
        pp.readToken_mult_modulo_exp =         function(code, finisher)
        {
            var next = this.input.charCodeAt(this.pos + 1);
            var size = 1;
            var tokentype = code === 42 ? types$1.star : types$1.modulo;
            if (this.options.ecmaVersion >= 7 && code === 42 && next === 42)
            {
                ++size;
                tokentype = types$1.starstar;
                next = this.input.charCodeAt(this.pos + 2);
            }
            if (next === 61)
            {
                return this.finishOp(types$1.assign, size + 1, finisher);
            }
            return this.finishOp(tokentype, size, finisher);
        };
        pp.readToken_pipe_amp =         function(code, finisher)
        {
            var next = this.input.charCodeAt(this.pos + 1);
            if (next === code)
            {
                if (this.options.ecmaVersion >= 12)
                {
                    var next2 = this.input.charCodeAt(this.pos + 2);
                    if (next2 === 61)
                    {
                        return this.finishOp(types$1.assign, 3, finisher);
                    }
                }
                return this.finishOp(code === 124 ? types$1.logicalOR : types$1.logicalAND, 2, finisher);
            }
            if (next === 61)
            {
                return this.finishOp(types$1.assign, 2, finisher);
            }
            return this.finishOp(code === 124 ? types$1.bitwiseOR : types$1.bitwiseAND, 1, finisher);
        };
        pp.readToken_caret =         function(finisher)
        {
            var next = this.input.charCodeAt(this.pos + 1);
            if (next === 61)
            {
                return this.finishOp(types$1.assign, 2, finisher);
            }
            return this.finishOp(types$1.bitwiseXOR, 1, finisher);
        };
        pp.readToken_plus_min =         function(code, finisher)
        {
            var next = this.input.charCodeAt(this.pos + 1);
            if (next === code)
            {
                if (next === 45 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 62 && (this.lastTokEnd === 0 || lineBreak.test(this.input.slice(this.lastTokEnd, this.pos))))
                {
                    this.skipLineComment(3);
                    this.skipSpace();
                    return this.nextToken();
                }
                return this.finishOp(types$1.incDec, 2, finisher);
            }
            if (next === 61)
            {
                return this.finishOp(types$1.assign, 2, finisher);
            }
            return this.finishOp(types$1.plusMin, 1, finisher);
        };
        pp.readToken_lt_gt =         function(code, finisher)
        {
            if (code === 60 && (this.type === objjAtTypes._import || this.preType === preTypes._preInclude) && this.options.objj)
            {
                for (var start = this.pos + 1; ; )
                {
                    var ch = this.input.charCodeAt(++this.pos);
                    if (ch === 62)
                    {
                        return finisher.call(this, objjTypes._filename, this.input.slice(start, this.pos++));
                    }
                    if (this.pos >= this.input.length || ch === 13 || ch === 10 || ch === 8232 || ch === 8233)
                    {
                        this.raise(this.start, "Unterminated import statement");
                    }
                }
            }
            var next = this.input.charCodeAt(this.pos + 1);
            var size = 1;
            if (next === code)
            {
                size = code === 62 && this.input.charCodeAt(this.pos + 2) === 62 ? 3 : 2;
                if (this.input.charCodeAt(this.pos + size) === 61)
                {
                    return this.finishOp(types$1.assign, size + 1, finisher);
                }
                return this.finishOp(types$1.bitShift, size, finisher);
            }
            if (next === 33 && code === 60 && !this.inModule && this.input.charCodeAt(this.pos + 2) === 45 && this.input.charCodeAt(this.pos + 3) === 45)
            {
                this.skipLineComment(4);
                this.skipSpace();
                return this.nextToken();
            }
            if (next === 61)
            {
                size = 2;
            }
            return this.finishOp(types$1.relational, size, finisher);
        };
        pp.readToken_eq_excl =         function(code, finisher)
        {
            var next = this.input.charCodeAt(this.pos + 1);
            if (next === 61)
            {
                return this.finishOp(types$1.equality, this.input.charCodeAt(this.pos + 2) === 61 ? 3 : 2, finisher);
            }
            if (code === 61 && next === 62 && this.options.ecmaVersion >= 6)
            {
                this.pos += 2;
                return finisher.call(this, types$1.arrow);
            }
            return this.finishOp(code === 61 ? types$1.eq : types$1.prefix, 1, finisher);
        };
        pp.readToken_question =         function()
        {
            var ecmaVersion = this.options.ecmaVersion;
            if (ecmaVersion >= 11)
            {
                var next = this.input.charCodeAt(this.pos + 1);
                if (next === 46)
                {
                    var next2 = this.input.charCodeAt(this.pos + 2);
                    if (next2 < 48 || next2 > 57)
                    {
                        return this.finishOp(types$1.questionDot, 2);
                    }
                }
                if (next === 63)
                {
                    if (ecmaVersion >= 12)
                    {
                        var next2$1 = this.input.charCodeAt(this.pos + 2);
                        if (next2$1 === 61)
                        {
                            return this.finishOp(types$1.assign, 3);
                        }
                    }
                    return this.finishOp(types$1.coalesce, 2);
                }
            }
            return this.finishOp(types$1.question, 1);
        };
        pp.readToken_numberSign =         function(finisher)
        {
            if (this.preprocessIsParsingPreprocess)
            {
                ++this.pos;
                return finisher.call(this, preTypes._preprocess);
            }
            lineBreak.lastIndex = 0;
            var match = lineBreak.exec(this.input.slice(this.localLastEnd, this.pos));
            if (this.lastEnd !== 0 && this.lastEnd !== this.pos && !match && (this.preprocessStackLastItem && !this.preprocessStackLastItem.isIncludeFile || this.pos !== 0))
            {
                if (this.preprocessStackLastItem)
                {
                    return this.preprocessStringify();
                }
            }
            var ecmaVersion = this.options.ecmaVersion;
            var code = 35;
            var numberSignPos = this.pos++;
            var wordStart = this.pos;
            var wordStartCode = this.fullCharCodeAtPos();
            var errorPos = numberSignPos;
            var word = this.readWord1();
preprocess:             if (this.options.preprocess)
            {
                if (word.length === 0)
                {
                    this.skipSpace();
                    word = this.readWord1();
                }
                lineBreak.lastIndex = 0;
                var match$1 = lineBreak.exec(this.input.slice(this.localLastEnd, numberSignPos));
                if (this.lastTokEnd === 0 || this.lastTokEnd === numberSignPos || match$1 || !(this.preprocessStackLastItem && !this.preprocessStackLastItem.isIncludeFile) && numberSignPos === 0)
                {
                    switch(word) {
                        case "pragma":
                            this.preStart = this.start;
                            this.preprocesSkipRestOfLine();
                            break;
                        case "define":
                            this.preStart = this.start;
                            if (this.preNotSkipping)
                            {
                                this.preprocessParseDefine();
                            }
                            else
                            {
                                return finisher.call(this, preTypes._preDefine);
                            }
                            break;
                        case "undef":
                            this.preprocessReadToken();
                            this.options.preprocessUndefineMacro(this.preprocessGetIdent());
                            break;
                        case "if":
                            this.preStart = this.start;
                            if (this.preNotSkipping)
                            {
                                var saveTokRegexpAllowed = this.exprAllowed;
                                this.exprAllowed = false;
                                this.preIfLevel.push(preTypes._preIf);
                                this.preprocessReadToken(false, false, true);
                                var expr = this.preprocessParseExpression(true);
                                var test = this.preprocessEvalExpression(expr);
                                if (!test)
                                {
                                    this.preNotSkipping = false;
                                    this.preprocessSkipToElseOrEndif();
                                }
                                this.exprAllowed = saveTokRegexpAllowed;
                            }
                            else
                            {
                                return finisher.call(this, preTypes._preIf);
                            }
                            break;
                        case "ifdef":
                            this.preStart = this.start;
                            if (this.preNotSkipping)
                            {
                                this.preIfLevel.push(preTypes._preIf);
                                this.preprocessReadToken();
                                var identifer = this.preprocessGetIdent();
                                var isMacro = this.options.preprocessIsMacro(identifer);
                                if (!isMacro)
                                {
                                    this.preNotSkipping = false;
                                    this.preprocessSkipToElseOrEndif();
                                }
                            }
                            else
                            {
                                return finisher.call(this, preTypes._preIfdef);
                            }
                            break;
                        case "ifndef":
                            this.preStart = this.start;
                            if (this.preNotSkipping)
                            {
                                this.preIfLevel.push(preTypes._preIf);
                                this.preprocessReadToken();
                                var identifer$1 = this.preprocessGetIdent();
                                var isMacro$1 = this.options.preprocessIsMacro(identifer$1);
                                if (isMacro$1)
                                {
                                    this.preNotSkipping = false;
                                    this.preprocessSkipToElseOrEndif();
                                }
                            }
                            else
                            {
                                return finisher.call(this, preTypes._preIfdef);
                            }
                            break;
                        case "elif":
                            this.preStart = this.start;
                            if (this.preIfLevel.length)
                            {
                                if (this.preNotSkipping)
                                {
                                    if (this.preIfLevel[this.preIfLevel.length - 1] === preTypes._preIf)
                                    {
                                        this.preNotSkipping = false;
                                        finisher.call(this, preTypes._preElseIf);
                                        this.preprocessReadToken();
                                        this.preprocessSkipToElseOrEndif(true);
                                    }
                                    else
                                    {
                                        this.raise(this.preStart, "#elsif after #else");
                                    }
                                }
                                else
                                {
                                    var saveTokRegexpAllowed$1 = this.exprAllowed;
                                    this.exprAllowed = false;
                                    this.preNotSkipping = true;
                                    this.preprocessReadToken(false, false, true);
                                    var expr$1 = this.preprocessParseExpression(true);
                                    this.preNotSkipping = false;
                                    this.tokRegexpAllowed = saveTokRegexpAllowed$1;
                                    var test$1 = this.preprocessEvalExpression(expr$1);
                                    return finisher.call(this, test$1 ? preTypes._preElseIfTrue : preTypes._preElseIfFalse);
                                }
                            }
                            else
                            {
                                this.raise(this.preStart, "#elif without #if");
                            }
                            break;
                        case "else":
                            this.preStart = this.start;
                            if (this.preIfLevel.length)
                            {
                                if (this.preNotSkipping)
                                {
                                    if (this.preIfLevel[this.preIfLevel.length - 1] === preTypes._preIf)
                                    {
                                        this.preIfLevel[this.preIfLevel.length - 1] = preTypes._preElse;
                                        this.preNotSkipping = false;
                                        finisher.call(this, preTypes._preElse);
                                        this.preprocessReadToken();
                                        this.preprocessSkipToElseOrEndif(true);
                                    }
                                    else
                                    {
                                        this.raise(this.preStart, "#else after #else");
                                    }
                                }
                                else
                                {
                                    this.preIfLevel[this.preIfLevel.length - 1] = preTypes._preElse;
                                    return finisher.call(this, preTypes._preElse);
                                }
                            }
                            else
                            {
                                this.raise(this.preStart, "#else without #if");
                            }
                            break;
                        case "endif":
                            this.preStart = this.start;
                            if (this.preIfLevel.length)
                            {
                                if (this.preNotSkipping)
                                {
                                    this.preIfLevel.pop();
                                    break;
                                }
                            }
                            else
                            {
                                this.raise(this.preStart, "#endif without #if");
                            }
                            return finisher.call(this, preTypes._preEndif);
                        case "include":
                            if (!this.preNotSkipping)
                            {
                                return finisher.call(this, preTypes._preInclude);
                            }
                            this.preprocessReadToken();
                            var localfilepath;
                            if (this.preType === types$1.string)
                            {
                                localfilepath = true;
                            }
                            else if (this.preType === preTypes._filename)
                            {
                                localfilepath = false;
                            }
                            else
                            {
                                this.raise(this.preStart, "Expected \"FILENAME\" or <FILENAME>: " + (this.preType.keyword || this.preType.type));
                            }
                            var theFileName = this.preVal;
                            var includeDict = this.options.preprocessGetIncludeFile(this.preVal, localfilepath) || this.raise(this.preStart, "'" + theFileName + "' file not found");
                            var includeString = includeDict.include;
                            var includeMacro = new Macro(null, includeString, null, 0, false, null, false, null, includeDict.sourceFile);
                            this.preprocessFinishToken(preTypes._preprocess, null, null, true);
                            this.pushMacroToStack(includeMacro, includeMacro.macro, this.tokPosMacroOffset, null, null, this.pos, null, true);
                            this.skipSpace();
                            this.nextToken(true);
                            return;
                        case "error":
                            var start = this.preStart;
                            this.preprocessReadToken(false, false, true);
                            this.raise(start, "Error: " + String(this.preprocessEvalExpression(this.preprocessParseExpression())));
                            break;
                        case "warning":
                            this.preprocessReadToken(false, false, true);
                            console.warn("Warning: " + String(this.preprocessEvalExpression(this.preprocessParseExpression())));
                            break;
default:
                            break preprocess;
                    }
                    this.preprocessFinishToken(this.preType, null, null, true);
                    return this.next(false, true);
                }
                else if (isKeywordPreprocessor.test(word))
                {
                    this.raise(errorPos, "Preprocessor directives may only be used at the beginning of a line");
                }
            }
            if (ecmaVersion >= 13)
            {
                errorPos = wordStart;
                code = wordStartCode;
                if (isIdentifierStart(wordStartCode, true) || wordStartCode === 92)
                {
                    return this.finishToken(types$1.privateId, word);
                }
            }
            this.raise(errorPos, "Unexpected character '" + codePointToString(code) + "'");
        };
        pp.readToken_at =         function(code, finisher)
        {
            var next = this.input.charCodeAt(++this.pos);
            if (next === 34 || next === 39)
            {
                var tmp = this.readString(next, finisher);
                return tmp;
            }
            if (next === 123)
            {
                return finisher.call(this, objjAtTypes._dictionaryLiteral);
            }
            if (next === 91)
            {
                return finisher.call(this, objjAtTypes._arrayLiteral);
            }
            var word = this.readWord1(),
                token = objjAtKeywords[word];
            if (!token)
            {
                this.raise(this.tokStart, "Unrecognized Objective-J keyword '@" + word + "'");
            }
            return finisher.call(this, token);
        };
        pp.getTokenFromCode =         function(code, finisher, allowEndOfLineToken)
        {
            if (finisher === void 0)
                finisher = this.finishToken;
            switch(code) {
                case 46:
                    return this.readToken_dot(finisher);
                case 40:
                    ++this.pos;
                    return finisher.call(this, types$1.parenL);
                case 41:
                    ++this.pos;
                    return finisher.call(this, types$1.parenR);
                case 59:
                    ++this.pos;
                    return finisher.call(this, types$1.semi);
                case 44:
                    ++this.pos;
                    return finisher.call(this, types$1.comma);
                case 91:
                    ++this.pos;
                    return finisher.call(this, types$1.bracketL);
                case 93:
                    ++this.pos;
                    return finisher.call(this, types$1.bracketR);
                case 123:
                    ++this.pos;
                    return finisher.call(this, types$1.braceL);
                case 125:
                    ++this.pos;
                    return finisher.call(this, types$1.braceR);
                case 58:
                    ++this.pos;
                    return finisher.call(this, types$1.colon);
                case 96:
                    if (this.options.ecmaVersion < 6)
                    {
                        break;
                    }
                    ++this.pos;
                    return finisher.call(this, types$1.backQuote);
                case 48:
                    var next = this.input.charCodeAt(this.pos + 1);
                    if (next === 120 || next === 88)
                    {
                        return this.readRadixNumber(16, finisher);
                    }
                    if (this.options.ecmaVersion >= 6)
                    {
                        if (next === 111 || next === 79)
                        {
                            return this.readRadixNumber(8, finisher);
                        }
                        if (next === 98 || next === 66)
                        {
                            return this.readRadixNumber(2, finisher);
                        }
                    }
                case 49:
                case 50:
                case 51:
                case 52:
                case 53:
                case 54:
                case 55:
                case 56:
                case 57:
                    return this.readNumber(false, finisher);
                case 34:
                case 39:
                    return this.readString(code, finisher);
                case 47:
                    return this.readToken_slash(finisher);
                case 37:
                case 42:
                    return this.readToken_mult_modulo_exp(code, finisher);
                case 124:
                case 38:
                    return this.readToken_pipe_amp(code, finisher);
                case 94:
                    return this.readToken_caret(finisher);
                case 43:
                case 45:
                    return this.readToken_plus_min(code, finisher);
                case 60:
                case 62:
                    return this.readToken_lt_gt(code, finisher);
                case 61:
                case 33:
                    return this.readToken_eq_excl(code, finisher);
                case 63:
                    return this.readToken_question();
                case 126:
                    return this.finishOp(types$1.prefix, 1, finisher);
                case 35:
                    return this.readToken_numberSign(finisher);
                case 92:
                    if (this.options.preprocess)
                    {
                        return this.finishOp(preTypes._preBackslash, 1, finisher);
                    }
                case 64:
                    if (this.options.objj)
                    {
                        return this.readToken_at(code, finisher);
                    }
                    return false;
            }
            if (allowEndOfLineToken)
            {
                if (code === 13 || code === 10 || code === 8232 || code === 8233)
                {
                    var size = code === 13 && this.input.charCodeAt(this.pos + 1) === 10 ? 2 : 1;
                    if (this.options.locations)
                    {
                        this.lineStart = this.pos + size;
                        ++this.curLine;
                    }
                    return this.finishOp(types$1.eol, size, finisher);
                }
            }
            this.raise(this.pos, "Unexpected character '" + codePointToString(code) + "'");
        };
        pp.preprocessStringify =         function()
        {
            var saveStackLength = this.preprocessStack.length,
                saveLastItem = this.preprocessStackLastItem;
            this.pos++;
            this.preConcatenating = true;
            this.next(false, false, 2);
            this.preConcatenating = false;
            var start = this.start + this.tokMacroOffset;
            var positionOffset = this.options.locations && new PositionOffset(this.curLine, this.lineStart);
            var string;
            if (this.type === types$1.string)
            {
                var quote = this.tokInput.slice(this.start, this.start + 1);
                var escapedQuote = quote === "\"" ? "\\\"" : "'";
                string = escapedQuote;
                string += preprocessStringifyEscape(this.value);
                string += escapedQuote;
            }
            else
            {
                string = this.value != null ? this.value : this.type.keyword || this.type.label;
            }
            while (this.preprocessStack.length > saveStackLength && saveLastItem === this.preprocessStack[saveStackLength - 1] && this.pos !== this.input.length)
            {
                this.preConcatenating = true;
                this.next(false, false, 2);
                this.preConcatenating = false;
                if (this.lastEnd !== this.start)
                {
                    string += " ";
                }
                if (this.type === types$1.string)
                {
                    var quote$1 = this.tokInput.slice(this.start, this.start + 1);
                    var escapedQuote$1 = quote$1 === "\"" ? "\\\"" : "'";
                    string += escapedQuote$1;
                    string += preprocessStringifyEscape(this.value);
                    string += escapedQuote$1;
                }
                else
                {
                    string += this.value != null ? this.value : this.type.keyword || this.type.label;
                }
            }
            var stringifyMacro = new Macro(null, "\"" + string + "\"", null, start, false, null, false, positionOffset);
            return this.readTokenFromMacro(stringifyMacro, this.tokPosMacroOffset, null, null, this.pos, this.next);
        };
        function preprocessStringifyEscape(aString)
        {
            var escaped,
                pos,
                size,
                ch;
            for ((escaped = "", pos = 0, size = aString.length, ch = aString.charCodeAt(pos)); pos < size; ch = aString.charCodeAt(++pos))
            {
                switch(ch) {
                    case 34:
                        escaped += "\\\\\\\"";
                        break;
                    case 10:
                        escaped += "\\\\n";
                        break;
                    case 13:
                        escaped += "\\\\r";
                        break;
                    case 9:
                        escaped += "\\\\t";
                        break;
                    case 8:
                        escaped += "\\\\b";
                        break;
                    case 11:
                        escaped += "\\\\v";
                        break;
                    case 0x00A0:
                        escaped += "\\\\u00A0";
                        break;
                    case 0x2028:
                        escaped += "\\\\u2028";
                        break;
                    case 0x2029:
                        escaped += "\\\\u2029";
                        break;
                    case 92:
                        escaped += "\\\\";
                        break;
default:
                        escaped += aString.charAt(pos);
                        break;
                }
            }
            return escaped;
        }
        pp.finishOp =         function(type, size, finisher)
        {
            if (finisher === void 0)
                finisher = this.finishToken;
            var str = this.input.slice(this.pos, this.pos + size);
            this.pos += size;
            return finisher.call(this, type, str);
        };
        pp.readRegexp =         function()
        {
            var escaped,
                inClass,
                start = this.pos;
            for (; ; )
            {
                if (this.pos >= this.input.length)
                {
                    this.raise(start, "Unterminated regular expression");
                }
                var ch = this.input.charAt(this.pos);
                if (lineBreak.test(ch))
                {
                    this.raise(start, "Unterminated regular expression");
                }
                if (!escaped)
                {
                    if (ch === "[")
                    {
                        inClass = true;
                    }
                    else if (ch === "]" && inClass)
                    {
                        inClass = false;
                    }
                    else if (ch === "/" && !inClass)
                    {
                        break;
                    }
                    escaped = ch === "\\";
                }
                else
                {
                    escaped = false;
                }
                ++this.pos;
            }
            var pattern = this.input.slice(start, this.pos);
            ++this.pos;
            var flagsStart = this.pos;
            var flags = this.readWord1();
            if (this.containsEsc)
            {
                this.unexpected(flagsStart);
            }
            var state = this.regexpState || (this.regexpState = new RegExpValidationState(this));
            state.reset(start, pattern, flags);
            this.validateRegExpFlags(state);
            this.validateRegExpPattern(state);
            var value = null;
            try {
                value = new RegExp(pattern, flags);
            }
            catch(e) {
            }
            return this.finishToken(types$1.regexp, {pattern: pattern, flags: flags, value: value});
        };
        pp.readInt =         function(radix, len, maybeLegacyOctalNumericLiteral)
        {
            var allowSeparators = this.options.ecmaVersion >= 12 && len === undefined;
            var isLegacyOctalNumericLiteral = maybeLegacyOctalNumericLiteral && this.input.charCodeAt(this.pos) === 48;
            var start = this.pos,
                total = 0,
                lastCode = 0;
            for (var i = 0, e = len == null ? Infinity : len; i < e; (++i, ++this.pos))
            {
                var code = this.input.charCodeAt(this.pos),
                    val = void 0;
                if (allowSeparators && code === 95)
                {
                    if (isLegacyOctalNumericLiteral)
                    {
                        this.raiseRecoverable(this.pos, "Numeric separator is not allowed in legacy octal numeric literals");
                    }
                    if (lastCode === 95)
                    {
                        this.raiseRecoverable(this.pos, "Numeric separator must be exactly one underscore");
                    }
                    if (i === 0)
                    {
                        this.raiseRecoverable(this.pos, "Numeric separator is not allowed at the first of digits");
                    }
                    lastCode = code;
                    continue;
                }
                if (code >= 97)
                {
                    val = code - 97 + 10;
                }
                else if (code >= 65)
                {
                    val = code - 65 + 10;
                }
                else if (code >= 48 && code <= 57)
                {
                    val = code - 48;
                }
                else
                {
                    val = Infinity;
                }
                if (val >= radix)
                {
                    break;
                }
                lastCode = code;
                total = total * radix + val;
            }
            if (allowSeparators && lastCode === 95)
            {
                this.raiseRecoverable(this.pos - 1, "Numeric separator is not allowed at the last of digits");
            }
            if (this.pos === start || len != null && this.pos - start !== len)
            {
                return null;
            }
            return total;
        };
        function stringToNumber(str, isLegacyOctalNumericLiteral)
        {
            if (isLegacyOctalNumericLiteral)
            {
                return parseInt(str, 8);
            }
            return parseFloat(str.replace(/_/g, ""));
        }
        function stringToBigInt(str)
        {
            if (typeof BigInt !== "function")
            {
                return null;
            }
            return BigInt(str.replace(/_/g, ""));
        }
        pp.readRadixNumber =         function(radix, finisher)
        {
            var start = this.pos;
            this.pos += 2;
            var val = this.readInt(radix);
            if (val == null)
            {
                this.raise(this.start + 2, "Expected number in radix " + radix);
            }
            if (this.options.ecmaVersion >= 11 && this.input.charCodeAt(this.pos) === 110)
            {
                val = stringToBigInt(this.input.slice(start, this.pos));
                ++this.pos;
            }
            else if (isIdentifierStart(this.fullCharCodeAtPos()))
            {
                this.raise(this.pos, "Identifier directly after number");
            }
            return finisher.call(this, types$1.num, val);
        };
        pp.readNumber =         function(startsWithDot, finisher)
        {
            var start = this.pos;
            if (!startsWithDot && this.readInt(10, undefined, true) === null)
            {
                this.raise(start, "Invalid number");
            }
            var octal = this.pos - start >= 2 && this.input.charCodeAt(start) === 48;
            if (octal && this.strict)
            {
                this.raise(start, "Invalid number");
            }
            var next = this.input.charCodeAt(this.pos);
            if (!octal && !startsWithDot && this.options.ecmaVersion >= 11 && next === 110)
            {
                var val$1 = stringToBigInt(this.input.slice(start, this.pos));
                ++this.pos;
                if (isIdentifierStart(this.fullCharCodeAtPos()))
                {
                    this.raise(this.pos, "Identifier directly after number");
                }
                return finisher.call(this, types$1.num, val$1);
            }
            if (octal && /[89]/.test(this.input.slice(start, this.pos)))
            {
                octal = false;
            }
            if (next === 46 && !octal)
            {
                ++this.pos;
                this.readInt(10);
                next = this.input.charCodeAt(this.pos);
            }
            if ((next === 69 || next === 101) && !octal)
            {
                next = this.input.charCodeAt(++this.pos);
                if (next === 43 || next === 45)
                {
                    ++this.pos;
                }
                if (this.readInt(10) === null)
                {
                    this.raise(start, "Invalid number");
                }
            }
            if (isIdentifierStart(this.fullCharCodeAtPos()))
            {
                this.raise(this.pos, "Identifier directly after number");
            }
            var val = stringToNumber(this.input.slice(start, this.pos), octal);
            return finisher.call(this, types$1.num, val);
        };
        pp.readCodePoint =         function()
        {
            var ch = this.input.charCodeAt(this.pos),
                code;
            if (ch === 123)
            {
                if (this.options.ecmaVersion < 6)
                {
                    this.unexpected();
                }
                var codePos = ++this.pos;
                code = this.readHexChar(this.input.indexOf("}", this.pos) - this.pos);
                ++this.pos;
                if (code > 0x10FFFF)
                {
                    this.invalidStringToken(codePos, "Code point out of bounds");
                }
            }
            else
            {
                code = this.readHexChar(4);
            }
            return code;
        };
        pp.readString =         function(quote, finisher)
        {
            var out = "",
                chunkStart = ++this.pos;
            for (; ; )
            {
                if (this.pos >= this.input.length)
                {
                    this.raise(this.start, "Unterminated string constant");
                }
                var ch = this.input.charCodeAt(this.pos);
                if (ch === quote)
                {
                    break;
                }
                if (ch === 92)
                {
                    out += this.input.slice(chunkStart, this.pos);
                    out += this.readEscapedChar(false);
                    chunkStart = this.pos;
                }
                else if (ch === 0x2028 || ch === 0x2029)
                {
                    if (this.options.ecmaVersion < 10)
                    {
                        this.raise(this.start, "Unterminated string constant");
                    }
                    ++this.pos;
                    if (this.options.locations)
                    {
                        this.curLine++;
                        this.lineStart = this.pos;
                    }
                }
                else
                {
                    if (isNewLine(ch))
                    {
                        this.raise(this.start, "Unterminated string constant");
                    }
                    ++this.pos;
                }
            }
            out += this.input.slice(chunkStart, this.pos++);
            return finisher.call(this, types$1.string, out);
        };
        var INVALID_TEMPLATE_ESCAPE_ERROR = {};
        pp.tryReadTemplateToken =         function()
        {
            this.inTemplateElement = true;
            try {
                this.readTmplToken();
            }
            catch(err) {
                if (err === INVALID_TEMPLATE_ESCAPE_ERROR)
                {
                    this.readInvalidTemplateToken();
                }
                else
                {
                    throw err;
                }
            }
            this.inTemplateElement = false;
        };
        pp.invalidStringToken =         function(position, message)
        {
            if (this.inTemplateElement && this.options.ecmaVersion >= 9)
            {
                throw INVALID_TEMPLATE_ESCAPE_ERROR;
            }
            else
            {
                this.raise(position, message);
            }
        };
        pp.readTmplToken =         function()
        {
            var out = "",
                chunkStart = this.pos;
            for (; ; )
            {
                if (this.pos >= this.input.length)
                {
                    this.raise(this.start, "Unterminated template");
                }
                var ch = this.input.charCodeAt(this.pos);
                if (ch === 96 || ch === 36 && this.input.charCodeAt(this.pos + 1) === 123)
                {
                    if (this.pos === this.start && (this.type === types$1.template || this.type === types$1.invalidTemplate))
                    {
                        if (ch === 36)
                        {
                            this.pos += 2;
                            return this.finishToken(types$1.dollarBraceL);
                        }
                        else
                        {
                            ++this.pos;
                            return this.finishToken(types$1.backQuote);
                        }
                    }
                    out += this.input.slice(chunkStart, this.pos);
                    return this.finishToken(types$1.template, out);
                }
                if (ch === 92)
                {
                    out += this.input.slice(chunkStart, this.pos);
                    out += this.readEscapedChar(true);
                    chunkStart = this.pos;
                }
                else if (isNewLine(ch))
                {
                    out += this.input.slice(chunkStart, this.pos);
                    ++this.pos;
                    switch(ch) {
                        case 13:
                            if (this.input.charCodeAt(this.pos) === 10)
                            {
                                ++this.pos;
                            }
                        case 10:
                            out += "\n";
                            break;
default:
                            out += String.fromCharCode(ch);
                            break;
                    }
                    if (this.options.locations)
                    {
                        ++this.curLine;
                        this.lineStart = this.pos;
                    }
                    chunkStart = this.pos;
                }
                else
                {
                    ++this.pos;
                }
            }
        };
        pp.readInvalidTemplateToken =         function()
        {
            for (; this.pos < this.input.length; this.pos++)
            {
                switch(this.input[this.pos]) {
                    case "\\":
                        ++this.pos;
                        break;
                    case "$":
                        if (this.input[this.pos + 1] !== "{")
                        {
                            break;
                        }
                    case "`":
                        return this.finishToken(types$1.invalidTemplate, this.input.slice(this.start, this.pos));
                }
            }
            this.raise(this.start, "Unterminated template");
        };
        pp.readEscapedChar =         function(inTemplate)
        {
            var ch = this.input.charCodeAt(++this.pos);
            ++this.pos;
            switch(ch) {
                case 110:
                    return "\n";
                case 114:
                    return "\r";
                case 120:
                    return String.fromCharCode(this.readHexChar(2));
                case 117:
                    return codePointToString(this.readCodePoint());
                case 116:
                    return "\t";
                case 98:
                    return "\b";
                case 118:
                    return "\u000b";
                case 102:
                    return "\f";
                case 13:
                    if (this.input.charCodeAt(this.pos) === 10)
                    {
                        ++this.pos;
                    }
                case 10:
                    if (this.options.locations)
                    {
                        this.lineStart = this.pos;
                        ++this.curLine;
                    }
                    return "";
                case 56:
                case 57:
                    if (this.strict)
                    {
                        this.invalidStringToken(this.pos - 1, "Invalid escape sequence");
                    }
                    if (inTemplate)
                    {
                        var codePos = this.pos - 1;
                        this.invalidStringToken(codePos, "Invalid escape sequence in template string");
                        return null;
                    }
default:
                    if (ch >= 48 && ch <= 55)
                    {
                        var octalStr = this.input.substr(this.pos - 1, 3).match(/^[0-7]+/)[0];
                        var octal = parseInt(octalStr, 8);
                        if (octal > 255)
                        {
                            octalStr = octalStr.slice(0, -1);
                            octal = parseInt(octalStr, 8);
                        }
                        this.pos += octalStr.length - 1;
                        ch = this.input.charCodeAt(this.pos);
                        if ((octalStr !== "0" || ch === 56 || ch === 57) && (this.strict || inTemplate))
                        {
                            this.invalidStringToken(this.pos - 1 - octalStr.length, inTemplate ? "Octal literal in template string" : "Octal literal in strict mode");
                        }
                        return String.fromCharCode(octal);
                    }
                    if (isNewLine(ch))
                    {
                        return "";
                    }
                    return String.fromCharCode(ch);
            }
        };
        pp.readHexChar =         function(len)
        {
            var codePos = this.pos;
            var n = this.readInt(16, len);
            if (n === null)
            {
                this.invalidStringToken(codePos, "Bad character escape sequence");
            }
            return n;
        };
        pp.readWord1 =         function()
        {
            this.containsEsc = false;
            var word = "",
                first = true,
                chunkStart = this.pos;
            var astral = this.options.ecmaVersion >= 6;
            while (this.pos < this.input.length)
            {
                var ch = this.fullCharCodeAtPos();
                if (isIdentifierChar(ch, astral))
                {
                    this.pos += ch <= 0xffff ? 1 : 2;
                }
                else if (ch === 92)
                {
                    this.containsEsc = true;
                    word += this.input.slice(chunkStart, this.pos);
                    var escStart = this.pos;
                    if (this.input.charCodeAt(++this.pos) !== 117)
                    {
                        this.invalidStringToken(this.pos, "Expecting Unicode escape sequence \\uXXXX");
                    }
                    ++this.pos;
                    var esc = this.readCodePoint();
                    if (!(first ? isIdentifierStart : isIdentifierChar)(esc, astral))
                    {
                        this.invalidStringToken(escStart, "Invalid Unicode escape");
                    }
                    word += codePointToString(esc);
                    chunkStart = this.pos;
                }
                else
                {
                    break;
                }
                first = false;
            }
            return word + this.input.slice(chunkStart, this.pos);
        };
        pp.readWord =         function(preReadWord, onlyTransformMacroArguments)
        {
            var word = preReadWord || this.readWord1();
            var type = types$1.name;
            if (this.options.preprocess)
            {
                var readMacroWordReturn = this.readMacroWord(word, this.next, onlyTransformMacroArguments);
                if (readMacroWordReturn === true)
                {
                    return true;
                }
            }
            if (this.keywords.test(word))
            {
                type = keywords[word];
            }
            else if (this.options.objj && Object.prototype.hasOwnProperty.call(objjKeywords, word))
            {
                type = objjKeywords[word];
            }
            return this.finishToken(type, word);
        };
        var version = "8.8.0";
        Parser.acorn = {Parser: Parser, version: version, defaultOptions: defaultOptions, Position: Position, SourceLocation: SourceLocation, getLineInfo: getLineInfo, Node: Node, TokenType: TokenType, tokTypes: types$1, keywordTypes: keywords, TokContext: TokContext, tokContexts: types, isIdentifierChar: isIdentifierChar, isIdentifierStart: isIdentifierStart, Token: Token, isNewLine: isNewLine, lineBreak: lineBreak, lineBreakG: lineBreakG, nonASCIIwhitespace: nonASCIIwhitespace};
        function parse(input, options)
        {
            return Parser.parse(input, options);
        }
        function parseExpressionAt(input, pos, options)
        {
            return Parser.parseExpressionAt(input, pos, options);
        }
        function tokenizer(input, options)
        {
            return Parser.tokenizer(input, options);
        }
        exports.Node = Node;
        exports.Parser = Parser;
        exports.Position = Position;
        exports.SourceLocation = SourceLocation;
        exports.TokContext = TokContext;
        exports.Token = Token;
        exports.TokenType = TokenType;
        exports.defaultOptions = defaultOptions;
        exports.getLineInfo = getLineInfo;
        exports.isIdentifierChar = isIdentifierChar;
        exports.isIdentifierStart = isIdentifierStart;
        exports.isNewLine = isNewLine;
        exports.keywordTypes = keywords;
        exports.lineBreak = lineBreak;
        exports.lineBreakG = lineBreakG;
        exports.nonASCIIwhitespace = nonASCIIwhitespace;
        exports.parse = parse;
        exports.parseExpressionAt = parseExpressionAt;
        exports.tokContexts = types;
        exports.tokTypes = types$1;
        exports.tokenizer = tokenizer;
        exports.version = version;
        Object.defineProperty(exports, '__esModule', {value: true});
    });
    (    function(global, factory)
    {
        typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('objj-parser'), require('source-map'), require('acorn-walk')) : typeof define === 'function' && define.amd ? define(['exports', 'objj-parser', 'source-map', 'acorn-walk'], factory) : (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.ObjJCompiler = {}, global.objjParser, global.ObjectiveJ.sourceMap, global.acorn.walk));
    })(this,     function(exports, objjParser, sourceMap, walk)
    {
        'use strict';
        function _interopDefaultLegacy(e)
        {
            return e && typeof e === 'object' && 'default' in e ? e : {'default': e};
        }
        function _interopNamespace(e)
        {
            if (e && e.__esModule)
                return e;
            var n = Object.create(null);
            if (e)
            {
                Object.keys(e).forEach(                function(k)
                {
                    if (k !== 'default')
                    {
                        var d = Object.getOwnPropertyDescriptor(e, k);
                        Object.defineProperty(n, k, d.get ? d : {enumerable: true, get:                         function()
                        {
                            return e[k];
                        }});
                    }
                });
            }
            n["default"] = e;
            return Object.freeze(n);
        }
        var objjParser__namespace = _interopNamespace(objjParser);
        var walk__default = _interopDefaultLegacy(walk);
class GlobalVariableMaybeWarning {
             constructor(aMessage, node, code)
            {
                this.message = createMessage(aMessage, node, code);
                this.node = node;
            }
            checkIfWarning =             function(st)
            {
                const identifier = this.node.name;
                return !st.getLvar(identifier) && typeof global[identifier] === 'undefined' && (typeof window === 'undefined' || typeof window[identifier] === 'undefined') && !st.compiler.getClassDef(identifier);
            };
            isEqualTo =             function(aWarning)
            {
                if (this.message.message !== aWarning.message.message)
                    return false;
                if (this.node.start !== aWarning.node.start)
                    return false;
                if (this.node.end !== aWarning.node.end)
                    return false;
                return true;
            };
}
        const warningUnusedButSetVariable = {name: 'unused-but-set-variable'};
        const warningShadowIvar = {name: 'shadow-ivar'};
        const warningCreateGlobalInsideFunctionOrMethod = {name: 'create-global-inside-function-or-method'};
        const warningUnknownClassOrGlobal = {name: 'unknown-class-or-global'};
        const warningUnknownIvarType = {name: 'unknown-ivar-type'};
        const AllWarnings = [warningUnusedButSetVariable, warningShadowIvar, warningCreateGlobalInsideFunctionOrMethod, warningUnknownClassOrGlobal, warningUnknownIvarType];
        function getLineOffsets(code, offset)
        {
            let lineEnd = offset;
            while (lineEnd < code.length)
            {
                if (objjParser__namespace.isNewLine(code.charCodeAt(lineEnd)))
                {
                    break;
                }
                lineEnd++;
            }
            let lineStart = offset;
            while (lineStart > 0)
            {
                if (objjParser__namespace.isNewLine(code.charCodeAt(lineStart)))
                {
                    lineStart++;
                    break;
                }
                lineStart--;
            }
            return {lineStart, lineEnd};
        }
        function createMessage(aMessage, node, code)
        {
            const message = {};
            const {lineStart, lineEnd} = getLineOffsets(code, node.start);
            const {line, column} = objjParser__namespace.getLineInfo(code, node.start);
            message.lineStart = lineStart;
            message.lineEnd = lineEnd;
            message.line = line;
            message.column = column;
            message.message = aMessage;
            message.messageOnLine = message.line;
            message.messageOnColumn = message.column;
            message.messageForNode = node;
            message.messageType = 'WARNING';
            message.messageForLine = code.substring(message.lineStart, message.lineEnd);
            return message;
        }
class Scope {
             constructor(prev, base)
            {
                this.vars = Object.create(null);
                if (base)
                    for (const key in base)
                        this[key] = base[key];
                this.prev = prev;
                if (prev)
                {
                    this.compiler = prev.compiler;
                    this.nodeStack = prev.nodeStack.slice(0);
                    this.nodePriorStack = prev.nodePriorStack.slice(0);
                    this.nodeStackOverrideType = prev.nodeStackOverrideType.slice(0);
                }
                else
                {
                    this.nodeStack = [];
                    this.nodePriorStack = [];
                    this.nodeStackOverrideType = [];
                }
            }
             toString()
            {
                return this.ivars ? 'ivars: ' + JSON.stringify(this.ivars) : '<No ivars>';
            }
             compiler()
            {
                return this.compiler;
            }
             rootScope()
            {
                return this.prev ? this.prev.rootScope() : this;
            }
             isRootScope()
            {
                return !this.prev;
            }
             currentClassName()
            {
                return this.classDef ? this.classDef.name : this.prev ? this.prev.currentClassName() : null;
            }
             currentProtocolName()
            {
                return this.protocolDef ? this.protocolDef.name : this.prev ? this.prev.currentProtocolName() : null;
            }
             getIvarForCurrentClass(ivarName)
            {
                if (this.ivars)
                {
                    const ivar = this.ivars[ivarName];
                    if (ivar)
                    {
                        return ivar;
                    }
                }
                const prev = this.prev;
                if (prev && !this.classDef)
                {
                    return prev.getIvarForCurrentClass(ivarName);
                }
                return null;
            }
             getLvarScope(lvarName, stopAtMethod)
            {
                if (this.vars)
                {
                    const lvar = this.vars[lvarName];
                    if (lvar)
                    {
                        return this;
                    }
                }
                const prev = this.prev;
                if (prev && (!stopAtMethod || !this.methodType))
                {
                    return prev.getLvarScope(lvarName, stopAtMethod);
                }
                return this;
            }
             getLvar(lvarName, stopAtMethod)
            {
                if (this.vars)
                {
                    const lvar = this.vars[lvarName];
                    if (lvar)
                    {
                        return lvar;
                    }
                }
                const prev = this.prev;
                if (prev && (!stopAtMethod || !this.methodType))
                {
                    return prev.getLvar(lvarName, stopAtMethod);
                }
                return null;
            }
             getVarScope()
            {
                const prev = this.prev;
                return prev ? prev.getVarScope() : this;
            }
             currentMethodType()
            {
                return this.methodType ? this.methodType : this.prev ? this.prev.currentMethodType() : null;
            }
             copyAddedSelfToIvarsToParent()
            {
                if (this.prev && this.addedSelfToIvars)
                {
                    for (const key in this.addedSelfToIvars)
                    {
                        const addedSelfToIvar = this.addedSelfToIvars[key];
                        const scopeAddedSelfToIvar = (this.prev.addedSelfToIvars || (this.prev.addedSelfToIvars = Object.create(null)))[key] || (this.prev.addedSelfToIvars[key] = []);
                        scopeAddedSelfToIvar.push.apply(scopeAddedSelfToIvar, addedSelfToIvar);
                    }
                }
            }
             addMaybeWarning(warning)
            {
                const rootScope = this.rootScope();
                let maybeWarnings = rootScope._maybeWarnings;
                if (!maybeWarnings)
                {
                    rootScope._maybeWarnings = maybeWarnings = [warning];
                }
                else
                {
                    const lastWarning = maybeWarnings[maybeWarnings.length - 1];
                    if (!lastWarning.isEqualTo(warning))
                    {
                        maybeWarnings.push(warning);
                    }
                }
            }
             variablesNotReadWarnings()
            {
                const compiler = this.compiler;
                if (compiler.options.warnings.includes(warningUnusedButSetVariable) && this.prev && this.vars)
                {
                    for (const key in this.vars)
                    {
                        const lvar = this.vars[key];
                        if (!lvar.isRead && (lvar.type === 'var' || lvar.type === 'let' || lvar.type === 'const'))
                        {
                            compiler.addWarning(createMessage("Variable '" + key + "' is never read", lvar.node, compiler.source));
                        }
                    }
                }
            }
             maybeWarnings()
            {
                return this.rootScope()._maybeWarnings;
            }
             pushNode(node, overrideType)
            {
                const nodePriorStack = this.nodePriorStack;
                const length = nodePriorStack.length;
                const lastPriorList = length ? nodePriorStack[length - 1] : null;
                const lastNode = length ? this.nodeStack[length - 1] : null;
                if (lastPriorList)
                {
                    if (lastNode !== node)
                    {
                        lastPriorList.push(node);
                    }
                }
                nodePriorStack.push(lastNode === node ? lastPriorList : []);
                this.nodeStack.push(node);
                this.nodeStackOverrideType.push(overrideType);
            }
             popNode()
            {
                this.nodeStackOverrideType.pop();
                this.nodePriorStack.pop();
                return this.nodeStack.pop();
            }
             currentNode()
            {
                const nodeStack = this.nodeStack;
                return nodeStack[nodeStack.length - 1];
            }
             currentOverrideType()
            {
                const nodeStackOverrideType = this.nodeStackOverrideType;
                return nodeStackOverrideType[nodeStackOverrideType.length - 1];
            }
             priorNode()
            {
                const nodePriorStack = this.nodePriorStack;
                const length = nodePriorStack.length;
                if (length > 1)
                {
                    const parent = nodePriorStack[length - 2];
                    const l = parent.length;
                    return parent[l - 2] || null;
                }
                return null;
            }
             formatDescription(index, formatDescription, useOverrideForNode)
            {
                const nodeStack = this.nodeStack;
                const length = nodeStack.length;
                index = index || 0;
                if (index >= length)
                {
                    return null;
                }
                const i = length - index - 1;
                const currentNode = nodeStack[i];
                const currentFormatDescription = formatDescription || this.compiler.formatDescription;
                const parentFormatDescriptions = formatDescription ? formatDescription.parent : currentFormatDescription;
                let nextFormatDescription;
                if (parentFormatDescriptions)
                {
                    const nodeType = useOverrideForNode === currentNode ? this.nodeStackOverrideType[i] : currentNode.type;
                    nextFormatDescription = parentFormatDescriptions[nodeType];
                    if (useOverrideForNode === currentNode && !nextFormatDescription)
                    {
                        return null;
                    }
                }
                if (nextFormatDescription)
                {
                    return this.formatDescription(index + 1, nextFormatDescription);
                }
                else
                {
                    nextFormatDescription = this.formatDescription(index + 1, formatDescription, currentNode);
                    if (nextFormatDescription)
                    {
                        return nextFormatDescription;
                    }
                    else
                    {
                        const priorFormatDescriptions = currentFormatDescription.prior;
                        if (priorFormatDescriptions)
                        {
                            const priorNode = this.priorNode();
                            const priorFormatDescription = priorFormatDescriptions[priorNode ? priorNode.type : 'None'];
                            if (priorFormatDescription)
                            {
                                return priorFormatDescription;
                            }
                        }
                        return currentFormatDescription;
                    }
                }
            }
}
class BlockScope extends Scope {
             variablesNotReadWarnings()
            {
                Scope.prototype.variablesNotReadWarnings.call(this);
                const prev = this.prev;
                if (prev && this.possibleHoistedVariables)
                {
                    for (const key in this.possibleHoistedVariables)
                    {
                        const possibleHoistedVariable = this.possibleHoistedVariables[key];
                        if (possibleHoistedVariable)
                        {
                            const varInPrevScope = prev.vars && prev.vars[key];
                            if (varInPrevScope != null)
                            {
                                const prevPossibleHoistedVariable = (prev.possibleHoistedVariables || (prev.possibleHoistedVariables = Object.create(null)))[key];
                                if (prevPossibleHoistedVariable == null)
                                {
                                    prev.possibleHoistedVariables[key] = possibleHoistedVariable;
                                }
                                else
                                {
                                    throw new Error("Internal inconsistency, previous scope should not have this possible hoisted variable '" + key + "'");
                                }
                            }
                        }
                    }
                }
            }
}
class FunctionScope extends BlockScope {
             getVarScope()
            {
                return this;
            }
}
class StringBuffer {
             constructor(useSourceNode, file, sourceContent)
            {
                if (useSourceNode)
                {
                    this.rootNode = new sourceMap.SourceNode();
                    this.concat = this.concatSourceNode;
                    this.toString = this.toStringSourceNode;
                    this.isEmpty = this.isEmptySourceNode;
                    this.appendStringBuffer = this.appendStringBufferSourceNode;
                    this.length = this.lengthSourceNode;
                    this.removeAtIndex = this.removeAtIndexSourceNode;
                    if (file)
                    {
                        const fileString = file.toString();
                        const filename = fileString.substr(fileString.lastIndexOf('/') + 1);
                        const sourceRoot = fileString.substr(0, fileString.lastIndexOf('/') + 1);
                        this.filename = filename;
                        if (sourceRoot.length > 0)
                        {
                            this.sourceRoot = sourceRoot;
                        }
                        if (sourceContent != null)
                        {
                            this.rootNode.setSourceContent(filename, sourceContent);
                        }
                    }
                    if (sourceContent != null)
                    {
                        this.sourceContent = sourceContent;
                    }
                }
                else
                {
                    this.atoms = [];
                    this.concat = this.concatString;
                    this.toString = this.toStringString;
                    this.isEmpty = this.isEmptyString;
                    this.appendStringBuffer = this.appendStringBufferString;
                    this.length = this.lengthString;
                    this.removeAtIndex = this.removeAtIndexString;
                }
            }
             toStringString()
            {
                return this.atoms.join('');
            }
             toStringSourceNode()
            {
                return this.rootNode.toStringWithSourceMap({file: this.filename + 's', sourceRoot: this.sourceRoot});
            }
             concatString(aString)
            {
                this.atoms.push(aString);
            }
             concatSourceNode(aString, node, originalName)
            {
                if (node)
                {
                    this.rootNode.add(new sourceMap.SourceNode(node.loc.start.line, node.loc.start.column, node.loc.source, aString, originalName));
                }
                else
                {
                    this.rootNode.add(aString);
                }
                if (!this.notEmpty)
                {
                    this.notEmpty = true;
                }
            }
             concatFormat(aString)
            {
                if (!aString)
                    return;
                const lines = aString.split('\n');
                const size = lines.length;
                if (size > 1)
                {
                    this.concat(lines[0]);
                    for (let i = 1; i < size; i++)
                    {
                        let line = lines[i];
                        this.concat('\n');
                        if (line.slice(0, 1) === '\\')
                        {
                            let numberLength = 1;
                            let indent = line.slice(1, 1 + numberLength);
                            if (indent === '-')
                            {
                                numberLength = 2;
                                indent = line.slice(1, 1 + numberLength);
                            }
                            const indentationNumber = parseInt(indent);
                            if (indentationNumber)
                            {
                                this.concat(indentationNumber > 0 ? indentation + Array(indentationNumber * indentationSpaces + 1).join(indentType) : indentation.substring(indentationSize * -indentationNumber));
                            }
                            line = line.slice(1 + numberLength);
                        }
                        else if (line || i === size - 1)
                        {
                            this.concat(this.indentation);
                        }
                        if (line)
                            this.concat(line);
                    }
                }
                else
                {
                    this.concat(aString);
                }
            }
             isEmptyString()
            {
                return this.atoms.length !== 0;
            }
             isEmptySourceNode()
            {
                return this.notEmpty;
            }
             appendStringBufferString(stringBuffer)
            {
                const thisAtoms = this.atoms;
                const thisLength = thisAtoms.length;
                const stringBufferAtoms = stringBuffer.atoms;
                const stringBufferLength = stringBufferAtoms.length;
                thisAtoms.length = thisLength + stringBufferLength;
                for (let i = 0; i < stringBufferLength; i++)
                {
                    thisAtoms[thisLength + i] = stringBufferAtoms[i];
                }
            }
             appendStringBufferSourceNode(stringBuffer)
            {
                this.rootNode.add(stringBuffer.rootNode);
            }
             lengthString()
            {
                return this.atoms.length;
            }
             lengthSourceNode()
            {
                return this.rootNode.children.length;
            }
             removeAtIndexString(index)
            {
                this.atoms[index] = '';
            }
             removeAtIndexSourceNode(index)
            {
                this.rootNode.children[index] = '';
            }
}
        const defaultOptions = {acornOptions:         function()
        {
            return Object.create(null);
        }, sourceMap: false, sourceMapIncludeSource: false, pass: 2, classDefs:         function()
        {
            return Object.create(null);
        }, protocolDefs:         function()
        {
            return Object.create(null);
        }, typeDefs:         function()
        {
            return Object.create(null);
        }, generate: true, generateObjJ: false, indentationSpaces: 4, indentationType: ' ', transformNamedFunctionDeclarationToAssignment: false, includeMethodFunctionNames: true, includeMethodArgumentTypeSignatures: true, includeIvarTypeSignatures: true, inlineMsgSendFunctions: true, warnings: [warningUnusedButSetVariable, warningShadowIvar, warningCreateGlobalInsideFunctionOrMethod, warningUnknownClassOrGlobal, warningUnknownIvarType], macros: null};
        function setupOptions(opts)
        {
            const options = Object.create(null);
            for (const opt in defaultOptions)
            {
                if (opts && Object.prototype.hasOwnProperty.call(opts, opt))
                {
                    const incomingOpt = opts[opt];
                    options[opt] = typeof incomingOpt === 'function' ? incomingOpt() : incomingOpt;
                }
                else if (Object.prototype.hasOwnProperty.call(defaultOptions, opt))
                {
                    const defaultOpt = defaultOptions[opt];
                    options[opt] = typeof defaultOpt === 'function' ? defaultOpt() : defaultOpt;
                }
            }
            return options;
        }
class TypeDef {
             constructor(name)
            {
                this.name = name;
            }
}
class MethodDef {
             constructor(name, types)
            {
                this.name = name;
                this.types = types;
            }
}
class ClassDef {
             constructor(isImplementationDeclaration, name, superClass, ivars, instanceMethods, classMethods, protocols)
            {
                this.name = name;
                if (superClass)
                {
                    this.superClass = superClass;
                }
                if (ivars)
                {
                    this.ivars = ivars;
                }
                if (isImplementationDeclaration)
                {
                    this.instanceMethods = instanceMethods || Object.create(null);
                    this.classMethods = classMethods || Object.create(null);
                }
                if (protocols)
                {
                    this.protocols = protocols;
                }
            }
             addInstanceMethod(methodDef)
            {
                this.instanceMethods[methodDef.name] = methodDef;
            }
             addClassMethod(methodDef)
            {
                this.classMethods[methodDef.name] = methodDef;
            }
             listOfNotImplementedMethodsForProtocols(protocolDefs)
            {
                let resultList = [];
                const instanceMethods = this.getInstanceMethods();
                const classMethods = this.getClassMethods();
                for (let i = 0, size = protocolDefs.length; i < size; i++)
                {
                    const protocolDef = protocolDefs[i];
                    const protocolInstanceMethods = protocolDef.requiredInstanceMethods;
                    const protocolClassMethods = protocolDef.requiredClassMethods;
                    const inheritFromProtocols = protocolDef.protocols;
                    if (protocolInstanceMethods)
                    {
                        for (const methodName in protocolInstanceMethods)
                        {
                            const methodDef = protocolInstanceMethods[methodName];
                            if (!instanceMethods[methodName])
                                resultList.push({methodDef, protocolDef});
                        }
                    }
                    if (protocolClassMethods)
                    {
                        for (const methodName in protocolClassMethods)
                        {
                            const methodDef = protocolClassMethods[methodName];
                            if (!classMethods[methodName])
                                resultList.push({methodDef, protocolDef});
                        }
                    }
                    if (inheritFromProtocols)
                    {
                        resultList = resultList.concat(this.listOfNotImplementedMethodsForProtocols(inheritFromProtocols));
                    }
                }
                return resultList;
            }
             getInstanceMethod(name)
            {
                const instanceMethods = this.instanceMethods;
                if (instanceMethods)
                {
                    const method = instanceMethods[name];
                    if (method)
                    {
                        return method;
                    }
                }
                const superClass = this.superClass;
                if (superClass)
                {
                    return superClass.getInstanceMethod(name);
                }
                return null;
            }
             getClassMethod(name)
            {
                const classMethods = this.classMethods;
                if (classMethods)
                {
                    const method = classMethods[name];
                    if (method)
                    {
                        return method;
                    }
                }
                const superClass = this.superClass;
                if (superClass)
                {
                    return superClass.getClassMethod(name);
                }
                return null;
            }
             getInstanceMethods()
            {
                const instanceMethods = this.instanceMethods;
                if (instanceMethods)
                {
                    const superClass = this.superClass;
                    const returnObject = Object.create(null);
                    if (superClass)
                    {
                        const superClassMethods = superClass.getInstanceMethods();
                        for (const methodName in superClassMethods)
                        {
                            returnObject[methodName] = superClassMethods[methodName];
                        }
                    }
                    for (const methodName in instanceMethods)
                    {
                        returnObject[methodName] = instanceMethods[methodName];
                    }
                    return returnObject;
                }
                return [];
            }
             getClassMethods()
            {
                const classMethods = this.classMethods;
                if (classMethods)
                {
                    const superClass = this.superClass;
                    const returnObject = Object.create(null);
                    if (superClass)
                    {
                        const superClassMethods = superClass.getClassMethods();
                        for (const methodName in superClassMethods)
                        {
                            returnObject[methodName] = superClassMethods[methodName];
                        }
                    }
                    for (const methodName in classMethods)
                    {
                        returnObject[methodName] = classMethods[methodName];
                    }
                    return returnObject;
                }
                return [];
            }
}
class ProtocolDef {
             constructor(name, protocols, requiredInstanceMethodDefs, requiredClassMethodDefs)
            {
                this.name = name;
                this.protocols = protocols;
                if (requiredInstanceMethodDefs)
                {
                    this.requiredInstanceMethods = requiredInstanceMethodDefs;
                }
                if (requiredClassMethodDefs)
                {
                    this.requiredClassMethods = requiredClassMethodDefs;
                }
            }
            addInstanceMethod =             function(methodDef)
            {
                (this.requiredInstanceMethods || (this.requiredInstanceMethods = Object.create(null)))[methodDef.name] = methodDef;
            };
            addClassMethod =             function(methodDef)
            {
                (this.requiredClassMethods || (this.requiredClassMethods = Object.create(null)))[methodDef.name] = methodDef;
            };
            getInstanceMethod =             function(name)
            {
                const instanceMethods = this.requiredInstanceMethods;
                if (instanceMethods)
                {
                    const method = instanceMethods[name];
                    if (method)
                    {
                        return method;
                    }
                }
                const protocols = this.protocols;
                for (let i = 0, size = protocols.length; i < size; i++)
                {
                    const protocol = protocols[i];
                    const method = protocol.getInstanceMethod(name);
                    if (method)
                    {
                        return method;
                    }
                }
                return null;
            };
            getClassMethod =             function(name)
            {
                const classMethods = this.requiredClassMethods;
                if (classMethods)
                {
                    const method = classMethods[name];
                    if (method)
                    {
                        return method;
                    }
                }
                const protocols = this.protocols;
                for (let i = 0, size = protocols.length; i < size; i++)
                {
                    const protocol = protocols[i];
                    const method = protocol.getClassMethod(name);
                    if (method)
                    {
                        return method;
                    }
                }
                return null;
            };
}
        function wordsRegexp(words)
        {
            return new RegExp('^(?:' + words.replace(/ /g, '|') + ')$');
        }
        function isIdempotentExpression(node)
        {
            switch(node.type) {
                case 'Literal':
                case 'Identifier':
                    return true;
                case 'ArrayExpression':
                    for (let i = 0; i < node.elements.length; ++i)
                    {
                        if (!isIdempotentExpression(node.elements[i]))
                        {
                            return false;
                        }
                    }
                    return true;
                case 'DictionaryLiteral':
                    for (let i = 0; i < node.keys.length; ++i)
                    {
                        if (!isIdempotentExpression(node.keys[i]))
                        {
                            return false;
                        }
                        if (!isIdempotentExpression(node.values[i]))
                        {
                            return false;
                        }
                    }
                    return true;
                case 'ObjectExpression':
                    for (let i = 0; i < node.properties.length; ++i)
                    {
                        if (!isIdempotentExpression(node.properties[i].value))
                        {
                            return false;
                        }
                    }
                    return true;
                case 'FunctionExpression':
                    for (let i = 0; i < node.params.length; ++i)
                    {
                        if (!isIdempotentExpression(node.params[i]))
                        {
                            return false;
                        }
                    }
                    return true;
                case 'SequenceExpression':
                    for (let i = 0; i < node.expressions.length; ++i)
                    {
                        if (!isIdempotentExpression(node.expressions[i]))
                        {
                            return false;
                        }
                    }
                    return true;
                case 'UnaryExpression':
                    return isIdempotentExpression(node.argument);
                case 'BinaryExpression':
                    return isIdempotentExpression(node.left) && isIdempotentExpression(node.right);
                case 'ConditionalExpression':
                    return isIdempotentExpression(node.test) && isIdempotentExpression(node.consequent) && isIdempotentExpression(node.alternate);
                case 'MemberExpression':
                    return isIdempotentExpression(node.object) && (!node.computed || isIdempotentExpression(node.property));
                case 'Dereference':
                    return isIdempotentExpression(node.expr);
                case 'Reference':
                    return isIdempotentExpression(node.element);
default:
                    return false;
            }
        }
        function checkCanDereference(st, node)
        {
            if (!isIdempotentExpression(node))
            {
                throw st.compiler.error_message('Dereference of expression with side effects', node);
            }
        }
        function surroundExpression(c)
        {
            return             function(node, st, override)
            {
                st.compiler.jsBuffer.concat('(');
                c(node, st, override);
                st.compiler.jsBuffer.concat(')');
            };
        }
        const operatorPrecedence = {'*': 3, '/': 3, '%': 3, '+': 4, '-': 4, '<<': 5, '>>': 5, '>>>': 5, '<': 6, '<=': 6, '>': 6, '>=': 6, in: 6, instanceof: 6, '==': 7, '!=': 7, '===': 7, '!==': 7, '&': 8, '^': 9, '|': 10, '&&': 11, '||': 12, '??': 13};
        const expressionTypePrecedence = {MemberExpression: 1, CallExpression: 1, NewExpression: 1, ChainExpression: 2, FunctionExpression: 3, ArrowFunctionExpression: 3, ImportExpression: 3, UnaryExpression: 4, UpdateExpression: 4, BinaryExpression: 5, LogicalExpression: 6, ConditionalExpression: 7, AssignmentExpression: 8};
        function ignore(_node, _st, _c)
        {
        }
        const pass1 = walk__default["default"].make({ImportStatement:         function(node, st, c)
        {
            const urlString = node.filename.value;
            st.compiler.dependencies.push({url: urlString, isLocal: node.localfilepath});
        }, TypeDefStatement: ignore, ClassStatement: ignore, ClassDeclarationStatement: ignore, MessageSendExpression: ignore, GlobalStatement: ignore, ProtocolDeclarationStatement: ignore, ArrayLiteral: ignore, Reference: ignore, DictionaryLiteral: ignore, Dereference: ignore, SelectorLiteralExpression: ignore});
        function nodePrecedence(node, subNode, right)
        {
            const nodeType = node.type;
            const nodePrecedence = expressionTypePrecedence[nodeType] || -1;
            const subNodePrecedence = expressionTypePrecedence[subNode.type] || -1;
            let nodeOperatorPrecedence;
            let subNodeOperatorPrecedence;
            return nodePrecedence < subNodePrecedence || nodePrecedence === subNodePrecedence && isLogicalBinary.test(nodeType) && ((nodeOperatorPrecedence = operatorPrecedence[node.operator]) < (subNodeOperatorPrecedence = operatorPrecedence[subNode.operator]) || right && nodeOperatorPrecedence === subNodeOperatorPrecedence);
        }
        function mustHaveParentheses(paramList)
        {
for(const param of paramList)
            {
                if (param.type !== 'Identifier')
                {
                    return true;
                }
            }
            return paramList.length > 1 || paramList.length === 0;
        }
        const reservedIdentifiers = wordsRegexp('self _cmd __filename undefined localStorage arguments');
        const wordPrefixOperators = wordsRegexp('delete in instanceof new typeof void');
        const isLogicalBinary = wordsRegexp('LogicalExpression BinaryExpression');
        const pass2 = walk__default["default"].make({Program:         function(node, st, c)
        {
            for (let i = 0; i < node.body.length; ++i)
            {
                c(node.body[i], st, 'Statement');
            }
            const maybeWarnings = st.maybeWarnings();
            if (maybeWarnings)
            {
                for (let i = 0; i < maybeWarnings.length; i++)
                {
                    const maybeWarning = maybeWarnings[i];
                    if (maybeWarning.checkIfWarning(st))
                    {
                        st.compiler.addWarning(maybeWarning.message);
                    }
                }
            }
        }, BlockStatement:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            const isDecl = st.isDecl;
            if (isDecl != null)
            {
                delete st.isDecl;
            }
            const endOfScopeBody = st.endOfScopeBody;
            if (endOfScopeBody)
            {
                delete st.endOfScopeBody;
            }
            const skipIndentation = st.skipIndentation;
            if (skipIndentation)
            {
                delete st.skipIndentation;
            }
            else
            {
                buffer.concat(compiler.indentation.substring(compiler.indentationSize));
            }
            buffer.concat('{\n', node);
            const inner = endOfScopeBody ? st : new BlockScope(st);
            for (let i = 0; i < node.body.length; ++i)
            {
                if (node.body[i].type === 'BlockStatement')
                {
                    compiler.indentation += compiler.indentStep;
                    c(node.body[i], inner, 'Statement');
                    compiler.indentation = compiler.indentation.substring(compiler.indentationSize);
                }
                else
                {
                    c(node.body[i], inner, 'Statement');
                }
            }
            !endOfScopeBody && inner.variablesNotReadWarnings();
            const maxReceiverLevel = st.maxReceiverLevel;
            if (endOfScopeBody && maxReceiverLevel)
            {
                buffer.concat(compiler.indentation);
                buffer.concat('var ');
                for (let i = 0; i < maxReceiverLevel; i++)
                {
                    if (i)
                        buffer.concat(', ');
                    buffer.concat('___r');
                    buffer.concat(i + 1 + '');
                }
                buffer.concat(';\n');
            }
            buffer.concat(compiler.indentation.substring(compiler.indentationSize));
            buffer.concat('}', node);
            if (st.isDefaultExport)
                buffer.concat(';');
            if (!skipIndentation && isDecl !== false)
            {
                buffer.concat('\n');
            }
            st.indentBlockLevel--;
        }, ExpressionStatement:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat(st.compiler.indentation);
            if (node.expression.type === 'Reference')
                throw compiler.error_message("Can't have reference of expression as a statement", node.expression);
            if (node.expression.type === 'AssignmentExpression' && node.expression.left.type === 'ObjectPattern' || node.expression.type === 'FunctionExpression' || node.expression.type === 'ObjectExpression' || node.expression.type === 'BinaryExpression' && node.expression.left.type === 'FunctionExpression' || node.expression.type === 'Literal' && node.expression.value === 'use strict' && !node.directive)
            {
                surroundExpression(c)(node.expression, st, 'Expression');
            }
            else
            {
                c(node.expression, st, 'Expression');
            }
            buffer.concat(';\n', node);
        }, IfStatement:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            if (!st.superNodeIsElse)
            {
                buffer.concat(st.compiler.indentation);
            }
            else
            {
                delete st.superNodeIsElse;
            }
            buffer.concat('if (', node);
            c(node.test, st, 'Expression');
            buffer.concat(')');
            if (node.consequent.type !== 'EmptyStatement')
                buffer.concat('\n');
            st.compiler.indentation += st.compiler.indentStep;
            c(node.consequent, st, 'Statement');
            st.compiler.indentation = st.compiler.indentation.substring(st.compiler.indentationSize);
            const alternate = node.alternate;
            if (alternate)
            {
                const alternateNotIf = alternate.type !== 'IfStatement';
                const emptyStatement = alternate.type === 'EmptyStatement';
                buffer.concat(st.compiler.indentation);
                buffer.concat(alternateNotIf ? emptyStatement ? 'else' : 'else\n' : 'else ', node);
                if (alternateNotIf)
                {
                    st.compiler.indentation += st.compiler.indentStep;
                }
                else
                {
                    st.superNodeIsElse = true;
                }
                c(alternate, st, 'Statement');
                if (alternateNotIf)
                    st.compiler.indentation = st.compiler.indentation.substring(st.compiler.indentationSize);
            }
        }, LabeledStatement:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            c(node.label, st, 'VariablePattern');
            buffer.concat(': ', node);
            c(node.body, st, 'Statement');
        }, BreakStatement:         function(node, st, c)
        {
            const compiler = st.compiler;
            const label = node.label;
            const buffer = compiler.jsBuffer;
            buffer.concat(st.compiler.indentation);
            if (label)
            {
                buffer.concat('break ', node);
                c(label, st, 'VariablePattern');
                buffer.concat(';\n');
            }
            else
            {
                buffer.concat('break;\n', node);
            }
        }, ContinueStatement:         function(node, st, c)
        {
            const compiler = st.compiler;
            const label = node.label;
            const buffer = compiler.jsBuffer;
            buffer.concat(st.compiler.indentation);
            if (label)
            {
                buffer.concat('continue ', node);
                c(label, st, 'VariablePattern');
                buffer.concat(';\n');
            }
            else
            {
                buffer.concat('continue;\n', node);
            }
        }, WithStatement:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat(st.compiler.indentation);
            buffer.concat('with(', node);
            c(node.object, st, 'Expression');
            buffer.concat(')\n', node);
            st.compiler.indentation += st.compiler.indentStep;
            c(node.body, st, 'Statement');
            st.compiler.indentation = st.compiler.indentation.substring(st.compiler.indentationSize);
        }, SwitchStatement:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat(st.compiler.indentation);
            buffer.concat('switch(', node);
            c(node.discriminant, st, 'Expression');
            buffer.concat(') {\n');
            st.compiler.indentation += st.compiler.indentStep;
            for (let i = 0; i < node.cases.length; ++i)
            {
                const cs = node.cases[i];
                if (cs.test)
                {
                    buffer.concat(st.compiler.indentation);
                    buffer.concat('case ');
                    c(cs.test, st, 'Expression');
                    buffer.concat(':\n');
                }
                else
                {
                    buffer.concat('default:\n');
                }
                st.compiler.indentation += st.compiler.indentStep;
                for (let j = 0; j < cs.consequent.length; ++j)
                {
                    c(cs.consequent[j], st, 'Statement');
                }
                st.compiler.indentation = st.compiler.indentation.substring(st.compiler.indentationSize);
            }
            st.compiler.indentation = st.compiler.indentation.substring(st.compiler.indentationSize);
            buffer.concat(st.compiler.indentation);
            buffer.concat('}\n');
        }, ReturnStatement:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat(st.compiler.indentation);
            buffer.concat('return', node);
            if (node.argument)
            {
                buffer.concat(' ');
                c(node.argument, st, 'Expression');
            }
            buffer.concat(';\n');
        }, ThrowStatement:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat(st.compiler.indentation);
            buffer.concat('throw', node);
            buffer.concat(' ');
            c(node.argument, st, 'Expression');
            buffer.concat(';\n');
        }, TryStatement:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat(st.compiler.indentation);
            buffer.concat('try', node);
            buffer.concat(' ');
            st.compiler.indentation += st.compiler.indentStep;
            st.skipIndentation = true;
            c(node.block, st, 'Statement');
            st.compiler.indentation = st.compiler.indentation.substring(st.compiler.indentationSize);
            if (node.handler)
            {
                const handler = node.handler;
                const inner = new Scope(st);
                const param = handler.param;
                const name = param?.name;
                if (name)
                    inner.vars[name] = {type: 'catch clause', node: param};
                buffer.concat('\n');
                buffer.concat(st.compiler.indentation);
                buffer.concat('catch');
                if (param)
                {
                    buffer.concat('(');
                    c(param, st, 'Pattern');
                    buffer.concat(') ');
                }
                st.compiler.indentation += st.compiler.indentStep;
                inner.skipIndentation = true;
                inner.endOfScopeBody = true;
                c(handler.body, inner, 'BlockStatement');
                inner.variablesNotReadWarnings();
                st.compiler.indentation = st.compiler.indentation.substring(st.compiler.indentationSize);
                inner.copyAddedSelfToIvarsToParent();
            }
            if (node.finalizer)
            {
                buffer.concat('\n');
                buffer.concat(st.compiler.indentation);
                buffer.concat('finally ');
                st.compiler.indentation += st.compiler.indentStep;
                st.skipIndentation = true;
                c(node.finalizer, st, 'Statement');
                st.compiler.indentation = st.compiler.indentation.substring(st.compiler.indentationSize);
            }
            buffer.concat('\n');
        }, WhileStatement:         function(node, st, c)
        {
            const compiler = st.compiler;
            const body = node.body;
            const buffer = compiler.jsBuffer;
            buffer.concat(st.compiler.indentation);
            buffer.concat('while (', node);
            c(node.test, st, 'Expression');
            buffer.concat(')');
            if (node.body.type !== 'EmptyStatement')
                buffer.concat('\n');
            st.compiler.indentation += st.compiler.indentStep;
            c(body, st, 'Statement');
            st.compiler.indentation = st.compiler.indentation.substring(st.compiler.indentationSize);
        }, DoWhileStatement:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat(st.compiler.indentation);
            buffer.concat('do\n', node);
            st.compiler.indentation += st.compiler.indentStep;
            c(node.body, st, 'Statement');
            st.compiler.indentation = st.compiler.indentation.substring(st.compiler.indentationSize);
            buffer.concat(st.compiler.indentation);
            buffer.concat('while (');
            c(node.test, st, 'Expression');
            buffer.concat(');\n');
        }, ForStatement:         function(node, st, c)
        {
            const compiler = st.compiler;
            const body = node.body;
            const buffer = compiler.jsBuffer;
            buffer.concat(st.compiler.indentation);
            buffer.concat('for (', node);
            if (node.init)
                c(node.init, st, 'ForInit');
            buffer.concat('; ');
            if (node.test)
                c(node.test, st, 'Expression');
            buffer.concat('; ');
            if (node.update)
                c(node.update, st, 'Expression');
            buffer.concat(')');
            if (node.body.type !== 'EmptyStatement')
                buffer.concat('\n');
            st.compiler.indentation += st.compiler.indentStep;
            c(body, st, 'Statement');
            st.compiler.indentation = st.compiler.indentation.substring(st.compiler.indentationSize);
        }, ForInStatement:         function(node, st, c)
        {
            const compiler = st.compiler;
            const body = node.body;
            const buffer = compiler.jsBuffer;
            buffer.concat(st.compiler.indentation);
            buffer.concat('for (', node);
            c(node.left, st, 'ForInit');
            buffer.concat(' in ');
            c(node.right, st, 'Expression');
            buffer.concat(body.type === 'EmptyStatement' ? ')\n' : ')\n');
            st.compiler.indentation += st.compiler.indentStep;
            c(body, st, 'Statement');
            st.compiler.indentation = st.compiler.indentation.substring(st.compiler.indentationSize);
        }, ForOfStatement:         function(node, st, c)
        {
            const compiler = st.compiler;
            const body = node.body;
            const buffer = compiler.jsBuffer;
            buffer.concat('for', node);
            if (node.await)
                buffer.concat(' await ');
            buffer.concat('(');
            c(node.left, st, 'ForInit');
            buffer.concat(' of ');
            c(node.right, st, 'Expression');
            buffer.concat(body.type === 'EmptyStatement' ? ')\n' : ')\n');
            st.compiler.indentation += st.compiler.indentStep;
            c(body, st, 'Statement');
            st.compiler.indentation = st.compiler.indentation.substring(st.compiler.indentationSize);
        }, ForInit:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            if (node.type === 'VariableDeclaration')
            {
                st.isFor = true;
                c(node, st);
                delete st.isFor;
            }
            else if (node.type === 'BinaryExpression' && node.operator === 'in')
            {
                buffer.concat('(');
                c(node, st, 'Expression');
                buffer.concat(')');
            }
            else
            {
                c(node, st, 'Expression');
            }
        }, DebuggerStatement:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat(st.compiler.indentation);
            buffer.concat('debugger;\n', node);
        }, Function:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            const inner = new FunctionScope(st);
            const decl = node.type === 'FunctionDeclaration';
            const id = node.id;
            inner.isDecl = decl;
            for (let i = 0; i < node.params.length; ++i)
            {
                inner.vars[node.params[i].name] = {type: 'argument', node: node.params[i]};
            }
            buffer.concat(st.compiler.indentation);
            if (id)
            {
                const name = id.name;
                (decl ? st : inner).vars[name] = {type: decl ? 'function' : 'function name', node: id};
                if (compiler.transformNamedFunctionDeclarationToAssignment)
                {
                    buffer.concat(name);
                    buffer.concat(' = ');
                }
            }
            if (st.isDefaultExport && !decl)
                buffer.concat('(');
            const prefix = [];
            if (st.methodPrefix?.length)
            {
                prefix.push(...st.methodPrefix);
            }
            if (node.async)
                prefix.push('async');
            if (!st.skipFunctionKeyword)
            {
                prefix.push('function');
            }
            if (node.generator)
                prefix.push('*');
            buffer.concat(prefix.join(' '));
            if (!compiler.transformNamedFunctionDeclarationToAssignment && id)
            {
                buffer.concat(' ');
                if (st.isComputed)
                    buffer.concat('[');
                c(id, st);
                if (st.isComputed)
                    buffer.concat(']');
            }
            buffer.concat('(');
            for (let i = 0; i < node.params.length; ++i)
            {
                if (i)
                {
                    buffer.concat(', ');
                }
                if (node.params[i].type === 'RestElement')
                {
                    c(node.params[i], st, 'RestElement');
                }
                else
                {
                    c(node.params[i], st, 'Pattern');
                }
            }
            buffer.concat(')\n');
            st.compiler.indentation += st.compiler.indentStep;
            inner.endOfScopeBody = true;
            c(node.body, inner, 'Statement');
            if (st.isDefaultExport && !decl)
                buffer.concat(')');
            inner.variablesNotReadWarnings();
            st.compiler.indentation = st.compiler.indentation.substring(st.compiler.indentationSize);
            inner.copyAddedSelfToIvarsToParent();
        }, ObjectPattern:         function(node, st, c)
        {
            c(node, st, 'ObjectExpression');
        }, RestElement:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat('...');
            c(node.argument, st);
        }, EmptyStatement:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat(';\n');
        }, VariableDeclaration:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            const isVar = node.kind === 'var';
            const varScope = isVar ? st.getVarScope() : st;
            if (!st.isFor)
                buffer.concat(compiler.indentation);
            buffer.concat(node.kind + ' ', node);
            let isFirst = true;
for(const decl of node.declarations)
            {
                const identifier = decl.id.name;
                const possibleHoistedVariable = isVar && varScope.possibleHoistedVariables?.[identifier];
                const variableDeclaration = {type: node.kind, node: decl.id, isRead: possibleHoistedVariable ? possibleHoistedVariable.isRead : 0};
                if (possibleHoistedVariable)
                {
                    if (possibleHoistedVariable.variable)
                    {
                        possibleHoistedVariable.variable.isRead -= possibleHoistedVariable.isRead;
                    }
                    varScope.possibleHoistedVariables[identifier] = null;
                }
                varScope.vars[identifier] = variableDeclaration;
                if (!isFirst)
                {
                    if (st.isFor)
                    {
                        buffer.concat(', ');
                    }
                    else
                    {
                        buffer.concat(',\n');
                        buffer.concat(compiler.indentation);
                        buffer.concat('    ');
                    }
                }
                c(decl.id, st, 'Pattern');
                if (decl.init)
                {
                    buffer.concat(' = ');
                    c(decl.init, st, 'Expression');
                }
                if (st.addedSelfToIvars)
                {
                    const addedSelfToIvar = st.addedSelfToIvars[identifier];
                    if (addedSelfToIvar)
                    {
                        const size = addedSelfToIvar.length;
                        for (let i = 0; i < size; i++)
                        {
                            const dict = addedSelfToIvar[i];
                            buffer.removeAtIndex(dict.index);
                            if (compiler.options.warnings.includes(warningShadowIvar))
                                compiler.addWarning(createMessage("Local declaration of '" + identifier + "' hides instance variable", dict.node, compiler.source));
                        }
                        variableDeclaration.isRead += size;
                        st.addedSelfToIvars[identifier] = [];
                    }
                }
                if (isFirst)
                    isFirst = false;
            }
            if (!st.isFor)
                buffer.concat(';\n', node);
        }, ThisExpression:         function(node, st, c)
        {
            const compiler = st.compiler;
            compiler.jsBuffer.concat('this', node);
        }, ArrayExpression:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat('[', node);
            for (let i = 0; i < node.elements.length; ++i)
            {
                const elt = node.elements[i];
                if (i !== 0)
                {
                    buffer.concat(', ');
                }
                if (elt)
                    c(elt, st, 'Expression');
            }
            buffer.concat(']');
        }, ObjectExpression:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat('{', node);
            let isFirst = true;
for(const prop of node.properties)
            {
                if (!isFirst)
                {
                    buffer.concat(', ');
                }
                else
                {
                    isFirst = false;
                }
                c(prop, st);
            }
            buffer.concat('}');
        }, Property:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            if (node.value?.type === 'AssignmentPattern' && node.shorthand)
            {
                c(node.value, st, 'AssignmentPattern');
            }
            else if (node.kind === 'get' || node.kind === 'set' || node.method)
            {
                buffer.concat((node.method ? '' : node.kind) + ' ');
                node.value.id = node.key;
                st.isComputed = node.computed;
                st.skipFunctionKeyword = true;
                c(node.value, st, 'Expression');
                delete st.skipFunctionKeyword;
                delete st.isComputed;
            }
            else
            {
                if (node.computed)
                    buffer.concat('[');
                st.isPropertyKey = true;
                c(node.key, st, 'Expression');
                delete st.isPropertyKey;
                if (node.computed)
                    buffer.concat(']');
                if (!node.shorthand)
                {
                    buffer.concat(': ');
                }
                if (!node.shorthand)
                    c(node.value, st, 'Expression');
            }
        }, StaticBlock:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat(st.compiler.indentation);
            buffer.concat('static');
            buffer.concat('{');
            for (let i = 0; i < node.body.length; ++i)
            {
                c(node.body[i], st, 'Statement');
            }
            buffer.concat('}');
        }, SpreadElement:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat('...');
            c(node.argument, st);
        }, SequenceExpression:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat('(', node);
            for (let i = 0; i < node.expressions.length; ++i)
            {
                if (i !== 0)
                {
                    buffer.concat(', ');
                }
                c(node.expressions[i], st, 'Expression');
            }
            buffer.concat(')');
        }, UnaryExpression:         function(node, st, c)
        {
            const compiler = st.compiler;
            const argument = node.argument;
            const buffer = compiler.jsBuffer;
            if (node.prefix)
            {
                buffer.concat(node.operator, node);
                if (wordPrefixOperators.test(node.operator))
                {
                    buffer.concat(' ');
                }
                (nodePrecedence(node, argument) ? surroundExpression(c) : c)(argument, st, 'Expression');
            }
            else
            {
                (nodePrecedence(node, argument) ? surroundExpression(c) : c)(argument, st, 'Expression');
                buffer.concat(node.operator);
            }
        }, UpdateExpression:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            if (node.argument.type === 'Dereference')
            {
                checkCanDereference(st, node.argument);
                buffer.concat((node.prefix ? '' : '(') + '(');
                c(node.argument.expr, st, 'Expression');
                buffer.concat(')(');
                c(node.argument, st, 'Expression');
                buffer.concat(' ' + node.operator.substring(0, 1) + ' 1)' + (node.prefix ? '' : node.operator === '++' ? ' - 1)' : ' + 1)'));
                return;
            }
            if (node.prefix)
            {
                buffer.concat(node.operator, node);
                if (wordPrefixOperators.test(node.operator))
                {
                    buffer.concat(' ');
                }
                (nodePrecedence(node, node.argument) ? surroundExpression(c) : c)(node.argument, st, 'Expression');
            }
            else
            {
                (nodePrecedence(node, node.argument) ? surroundExpression(c) : c)(node.argument, st, 'Expression');
                buffer.concat(node.operator);
            }
        }, BinaryExpression:         function(node, st, c)
        {
            const compiler = st.compiler;
            if (node.operator === '**' || node.left.type === 'ArrowFunctionExpression')
            {
                surroundExpression(c)(node.left, st, 'Expression');
            }
            else
            {
                (nodePrecedence(node, node.left) ? surroundExpression(c) : c)(node.left, st, 'Expression');
            }
            const buffer = compiler.jsBuffer;
            buffer.concat(' ');
            buffer.concat(node.operator, node);
            buffer.concat(' ');
            (nodePrecedence(node, node.right, true) ? surroundExpression(c) : c)(node.right, st, 'Expression');
        }, LogicalExpression:         function(node, st, c)
        {
            const compiler = st.compiler;
            if (node.operator === '??')
            {
                surroundExpression(c)(node.left, st, 'Expression');
            }
            else
            {
                (nodePrecedence(node, node.left) ? surroundExpression(c) : c)(node.left, st, 'Expression');
            }
            const buffer = compiler.jsBuffer;
            buffer.concat(' ');
            buffer.concat(node.operator);
            buffer.concat(' ');
            if (node.operator === '??')
            {
                surroundExpression(c)(node.right, st, 'Expression');
            }
            else
            {
                (nodePrecedence(node, node.right, true) ? surroundExpression(c) : c)(node.right, st, 'Expression');
            }
        }, ParenthesizedExpression:         function(node, st, c)
        {
            const buffer = st.compiler.jsBuffer;
            buffer.concat('(');
            c(node.expression, st, 'Expression');
            buffer.concat(')');
        }, AssignmentExpression:         function(node, st, c)
        {
            const compiler = st.compiler;
            let saveAssignment = st.assignment;
            const buffer = compiler.jsBuffer;
            if (node.left.type === 'Dereference')
            {
                checkCanDereference(st, node.left);
                buffer.concat('(', node);
                c(node.left.expr, st, 'Expression');
                buffer.concat(')(');
                if (node.operator !== '=')
                {
                    c(node.left, st, 'Expression');
                    buffer.concat(' ' + node.operator.substring(0, 1) + ' ');
                }
                c(node.right, st, 'Expression');
                buffer.concat(')');
                return;
            }
            saveAssignment = st.assignment;
            const nodeLeft = node.left;
            st.assignment = true;
            if (nodeLeft.type === 'Identifier' && nodeLeft.name === 'self')
            {
                const lVar = st.getLvar('self', true);
                if (lVar)
                {
                    const lvarScope = lVar.scope;
                    if (lvarScope)
                    {
                        lvarScope.assignmentToSelf = true;
                    }
                }
            }
            (nodePrecedence(node, nodeLeft) ? surroundExpression(c) : c)(nodeLeft, st, 'Expression');
            buffer.concat(' ');
            buffer.concat(node.operator);
            buffer.concat(' ');
            st.assignment = saveAssignment;
            (nodePrecedence(node, node.right, true) ? surroundExpression(c) : c)(node.right, st, 'Expression');
            const varScope = st.getVarScope();
            if (varScope.isRootScope() && nodeLeft.type === 'Identifier' && !varScope.getLvar(nodeLeft.name))
            {
                varScope.vars[nodeLeft.name] = {type: 'global', node: nodeLeft};
            }
        }, AssignmentPattern:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            c(node.left, st, 'Pattern');
            buffer.concat(' = ');
            c(node.right, st, 'Expression');
        }, ArrayPattern:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat('[');
            let isFirst = true;
for(const element of node.elements)
            {
                if (!isFirst || element == null)
                {
                    buffer.concat(', ');
                }
                else
                {
                    isFirst = false;
                }
                if (element != null)
                    c(element, st);
            }
            buffer.concat(']');
        }, TemplateLiteral:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat('`');
            let i;
            for (i = 0; i < node.expressions.length; i++)
            {
                buffer.concat(node.quasis[i].value.raw);
                buffer.concat('${');
                c(node.expressions[i], st);
                buffer.concat('}');
            }
            buffer.concat(node.quasis[i].value.raw);
            buffer.concat('`');
        }, TaggedTemplateExpression:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            if (node.tag.type === 'ChainExpression')
                buffer.concat('(');
            c(node.tag, st, 'Expression');
            if (node.tag.type === 'ChainExpression')
                buffer.concat(')');
            c(node.quasi, st, 'Expression');
        }, ConditionalExpression:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            (nodePrecedence(node, node.test) ? surroundExpression(c) : c)(node.test, st, 'Expression');
            buffer.concat(' ? ');
            c(node.consequent, st, 'Expression');
            buffer.concat(' : ');
            c(node.alternate, st, 'Expression');
        }, NewExpression:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            const nodeArguments = node.arguments;
            buffer.concat('new ', node);
            (nodePrecedence(node, node.callee) ? surroundExpression(c) : c)(node.callee, st, 'Expression');
            buffer.concat('(');
            if (nodeArguments)
            {
                for (let i = 0, size = nodeArguments.length; i < size; ++i)
                {
                    if (i)
                    {
                        buffer.concat(', ');
                    }
                    c(nodeArguments[i], st, 'Expression');
                }
            }
            buffer.concat(')');
        }, CallExpression:         function(node, st, c)
        {
            const compiler = st.compiler;
            const nodeArguments = node.arguments;
            const callee = node.callee;
            const buffer = compiler.jsBuffer;
            if (callee.type === 'Identifier' && callee.name === 'eval')
            {
                const selfLvar = st.getLvar('self', true);
                if (selfLvar)
                {
                    const selfScope = selfLvar.scope;
                    if (selfScope)
                    {
                        selfScope.assignmentToSelf = true;
                    }
                }
            }
            (nodePrecedence(node, callee) ? surroundExpression(c) : c)(callee, st, 'Expression');
            if (node.optional)
                buffer.concat('?.');
            buffer.concat('(');
            if (nodeArguments)
            {
                for (let i = 0, size = nodeArguments.length; i < size; ++i)
                {
                    if (i)
                    {
                        buffer.concat(', ');
                    }
                    c(nodeArguments[i], st, 'Expression');
                }
            }
            buffer.concat(')');
        }, MemberExpression:         function(node, st, c)
        {
            const compiler = st.compiler;
            const computed = node.computed;
            (nodePrecedence(node, node.object) ? surroundExpression(c) : c)(node.object, st, 'Expression');
            let s = '';
            if (node.optional && node.computed)
            {
                s = '?.[';
            }
            else if (node.optional)
            {
                s = '?.';
            }
            else if (node.computed)
            {
                s = '[';
            }
            else
            {
                s = '.';
            }
            compiler.jsBuffer.concat(s);
            st.secondMemberExpression = !computed;
            (!computed && nodePrecedence(node, node.property) ? surroundExpression(c) : c)(node.property, st, 'Expression');
            st.secondMemberExpression = false;
            if (computed)
            {
                compiler.jsBuffer.concat(']');
            }
        }, ChainExpression:         function(node, st, c)
        {
            c(node.expression, st);
        }, AwaitExpression:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat('await', node);
            if (node.argument)
            {
                buffer.concat(' ');
                buffer.concat('(');
                c(node.argument, st, 'Expression');
                buffer.concat(')');
            }
        }, ArrowFunctionExpression:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            const inner = new FunctionScope(st);
            inner.isDecl = false;
            for (let i = 0; i < node.params.length; ++i)
            {
                inner.vars[node.params[i].name] = {type: 'argument', node: node.params[i]};
            }
            if (node.async)
                buffer.concat('async ');
            const needParentheses = mustHaveParentheses(node.params);
            if (needParentheses)
                buffer.concat('(');
            let isFirst = true;
for(const param of node.params)
            {
                if (isFirst)
                {
                    isFirst = false;
                }
                else
                {
                    buffer.concat(', ');
                }
                c(param, st, 'Pattern');
            }
            if (needParentheses)
                buffer.concat(')');
            buffer.concat(' => ');
            if (node.expression)
            {
                if (node.body.type === 'AssignmentExpression' && node.body.left.type === 'ObjectPattern' || node.body.type === 'FunctionExpression' || node.body.type === 'ObjectExpression')
                {
                    surroundExpression(c)(node.body, inner, 'Expression');
                }
                else
                {
                    c(node.body, inner, 'Expression');
                }
            }
            else
            {
                inner.skipIndentation = true;
                inner.endOfScopeBody = true;
                st.compiler.indentation += st.compiler.indentStep;
                c(node.body, inner, 'BlockStatement');
                st.compiler.indentation = st.compiler.indentation.substring(st.compiler.indentationSize);
            }
            inner.variablesNotReadWarnings();
            inner.copyAddedSelfToIvarsToParent();
        }, Identifier:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            const identifier = node.name;
            if (st.isPropertyKey)
            {
                buffer.concat(identifier, node, identifier === 'self' ? 'self' : null);
                return;
            }
            let lvarScope = st.getLvarScope(identifier, true);
            let lvar = lvarScope.vars?.[identifier];
            if (!st.secondMemberExpression && st.currentMethodType() === '-')
            {
                const ivar = compiler.getIvarForClass(identifier, st);
                if (ivar)
                {
                    if (lvar)
                    {
                        if (compiler.options.warnings.includes(warningShadowIvar))
                            compiler.addWarning(createMessage("Local declaration of '" + identifier + "' hides instance variable", node, compiler.source));
                    }
                    else
                    {
                        ((st.addedSelfToIvars || (st.addedSelfToIvars = Object.create(null)))[identifier] || (st.addedSelfToIvars[identifier] = [])).push({node, index: buffer.length()});
                        buffer.concat('self.', node);
                    }
                }
                else if (!reservedIdentifiers.test(identifier))
                {
                    let message;
                    const classOrGlobal = typeof global[identifier] !== 'undefined' || typeof window !== 'undefined' && typeof window[identifier] !== 'undefined' || compiler.getClassDef(identifier);
                    const globalVar = st.getLvar(identifier);
                    if (classOrGlobal && (!globalVar || globalVar.type !== 'class'));
                    else if (!globalVar)
                    {
                        if (st.assignment && compiler.options.warnings.includes(warningCreateGlobalInsideFunctionOrMethod))
                        {
                            message = new GlobalVariableMaybeWarning("Creating global variable inside function or method '" + identifier + "'", node, compiler.source);
                            st.vars[identifier] = {type: 'remove global warning', node};
                        }
                        else if (compiler.options.warnings.includes(warningUnknownClassOrGlobal))
                        {
                            message = new GlobalVariableMaybeWarning("Using unknown class or uninitialized global variable '" + identifier + "'", node, compiler.source);
                        }
                    }
                    if (message)
                    {
                        st.addMaybeWarning(message);
                    }
                }
            }
            if (!(st.assignment && st.secondMemberExpression))
            {
                if (lvar)
                {
                    lvar.isRead++;
                }
                else
                {
                    lvarScope = lvarScope.getLvarScope(identifier);
                    lvar = lvarScope.vars && lvarScope.vars[identifier];
                    if (lvar)
                    {
                        lvar.isRead++;
                    }
                    let possibleHoistedVariable = (lvarScope.possibleHoistedVariables || (lvarScope.possibleHoistedVariables = Object.create(null)))[identifier];
                    if (possibleHoistedVariable == null)
                    {
                        possibleHoistedVariable = {isRead: 1};
                        lvarScope.possibleHoistedVariables[identifier] = possibleHoistedVariable;
                    }
                    else
                    {
                        possibleHoistedVariable.isRead++;
                    }
                    if (lvar)
                    {
                        if (possibleHoistedVariable.variable && possibleHoistedVariable.variable !== lvar || possibleHoistedVariable.varScope && possibleHoistedVariable.varScope !== lvarScope)
                        {
                            throw new Error('Internal inconsistency, var or scope is not the same');
                        }
                        possibleHoistedVariable.variable = lvar;
                        possibleHoistedVariable.varScope = lvarScope;
                    }
                }
            }
            buffer.concat(identifier, node, identifier === 'self' ? 'self' : null);
        }, YieldExpression:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat('yield', node);
            if (node.delegate)
                buffer.concat('*');
            if (node.argument)
            {
                buffer.concat(' ');
                c(node.argument, st, 'Expression');
            }
        }, VariablePattern:         function(node, st, c)
        {
            const compiler = st.compiler;
            compiler.jsBuffer.concat(node.name, node);
        }, Literal:         function(node, st, c)
        {
            const compiler = st.compiler;
            if (node.raw)
            {
                if (node.raw.charAt(0) === '@')
                {
                    compiler.jsBuffer.concat(node.raw.substring(1), node);
                }
                else
                {
                    compiler.jsBuffer.concat(node.raw, node);
                }
            }
            else
            {
                const value = node.value;
                const doubleQuote = value.indexOf('"') !== -1;
                compiler.jsBuffer.concat(doubleQuote ? "'" : '"', node);
                compiler.jsBuffer.concat(value);
                compiler.jsBuffer.concat(doubleQuote ? "'" : '"');
            }
        }, ClassDeclaration:         function(node, st, c)
        {
            const buffer = st.compiler.jsBuffer;
            if (node.type === 'ClassExpression')
                buffer.concat('(');
            buffer.concat('class ');
            if (node.id)
                c(node.id, st);
            if (node.superClass)
            {
                buffer.concat(' extends ');
                c(node.superClass, st);
            }
            st.compiler.indentation += st.compiler.indentStep;
            c(node.body, st, 'ClassBody');
            st.compiler.indentation = st.compiler.indentation.substring(st.compiler.indentationSize);
            if (node.type === 'ClassExpression')
                buffer.concat(')');
        }, ClassExpression:         function(node, st, c)
        {
            c(node, st, 'ClassDeclaration');
        }, ClassBody:         function(node, st, c)
        {
            const compiler = st.compiler;
            compiler.jsBuffer.concat(' {\n');
for(const element of node.body)
            {
                c(element, st);
                compiler.jsBuffer.concat('\n');
            }
            compiler.jsBuffer.concat('}\n');
        }, PropertyDefinition:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat(st.compiler.indentation);
            if (node.static)
                buffer.concat('static ');
            if (node.computed)
                buffer.concat('[');
            c(node.key, st);
            if (node.computed)
                buffer.concat(']');
            if (node.value)
            {
                buffer.concat(' = ');
                c(node.value, st);
            }
            buffer.concat(';');
        }, MethodDefinition:         function(node, st, c)
        {
            const prefix = [];
            if (node.static)
                prefix.push('static');
            if (node.kind === 'get')
                prefix.push('get');
            if (node.kind === 'set')
                prefix.push('set');
            node.value.id = node.key;
            st.skipFunctionKeyword = true;
            st.methodPrefix = prefix;
            if (node.computed)
                st.isComputed = true;
            c(node.value, st);
            delete st.methodPrefix;
            st.isComputed = false;
            st.skipFunctionKeyword = false;
        }, PrivateIdentifier:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat('#');
            buffer.concat(node.name);
        }, MetaProperty:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            if (node.meta.name === 'import')
            {
                buffer.concat('import.meta');
            }
            else
            {
                buffer.concat('new.target');
            }
        }, Super:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat('super');
        }, ExportNamedDeclaration:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat('export ');
            if (node.declaration)
            {
                c(node.declaration, st);
            }
            else
            {
                buffer.concat('{');
                let isFirst = true;
for(const specifier of node.specifiers)
                {
                    if (!isFirst)
                    {
                        buffer.concat(', ');
                    }
                    else
                    {
                        isFirst = false;
                    }
                    c(specifier, st);
                }
                buffer.concat('}');
                if (node.source)
                {
                    buffer.concat(' from ');
                    c(node.source, st);
                }
            }
            buffer.concat('\n');
        }, ExportSpecifier:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            c(node.local, st);
            if (node.local !== node.exported)
            {
                buffer.concat(' as ');
                c(node.exported, st);
            }
        }, ExportDefaultDeclaration:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            st.isDefaultExport = true;
            buffer.concat('export default ');
            c(node.declaration, st);
            delete st.isDefaultExport;
        }, ExportAllDeclaration:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat('export * ');
            if (node.exported)
            {
                buffer.concat('as ');
                c(node.exported, st);
            }
            if (node.source)
            {
                buffer.concat(' from ');
                c(node.source, st);
            }
            buffer.concat('\n');
        }, ImportDeclaration:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat('import ');
            let startedCurly = false;
            let isFirst = true;
for(const specifier of node.specifiers)
            {
                if (!isFirst)
                    buffer.concat(', ');
                else
                    isFirst = false;
                switch(specifier.type) {
                    case 'ImportSpecifier':
                        if (!startedCurly)
                            buffer.concat('{');
                        startedCurly = true;
                        c(specifier.imported, st);
                        if (specifier.local !== specifier.imported)
                        {
                            buffer.concat(' as ');
                            c(specifier.local, st);
                        }
                        break;
                    case 'ImportDefaultSpecifier':
                        c(specifier.local, st);
                        break;
                    case 'ImportNamespaceSpecifier':
                        buffer.concat('* as ');
                        c(specifier.local, st);
                        break;
                }
            }
            if (startedCurly)
                buffer.concat('}');
            if (node.specifiers.length > 0)
                buffer.concat(' from ');
            c(node.source, st);
            buffer.concat('\n');
        }, ImportExpression:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat('import');
            buffer.concat('(');
            c(node.source, st);
            buffer.concat(')');
        }, ArrayLiteral:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            const elementLength = node.elements.length;
            const varScope = st.getVarScope();
            if (!varScope.receiverLevel)
                varScope.receiverLevel = 0;
            if (!elementLength)
            {
                if (compiler.options.inlineMsgSendFunctions)
                {
                    buffer.concat('(___r', node);
                    buffer.concat(++varScope.receiverLevel + '');
                    buffer.concat(' = (CPArray.isa.method_msgSend["alloc"] || _objj_forward)(CPArray, "alloc"), ___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat(' == null ? ___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat(' : (___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat('.isa.method_msgSend["init"] || _objj_forward)(___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat(', "init"))');
                }
                else
                {
                    buffer.concat('(___r');
                    buffer.concat(++varScope.receiverLevel + '');
                    buffer.concat(' = CPArray.isa.objj_msgSend0(CPArray, "alloc"), ___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat(' == null ? ___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat(' : ___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat('.isa.objj_msgSend0(___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat(', "init"))');
                }
                if (!(varScope.maxReceiverLevel >= varScope.receiverLevel))
                {
                    varScope.maxReceiverLevel = varScope.receiverLevel;
                }
            }
            else
            {
                if (compiler.options.inlineMsgSendFunctions)
                {
                    buffer.concat('(___r', node);
                    buffer.concat(++varScope.receiverLevel + '');
                    buffer.concat(' = (CPArray.isa.method_msgSend["alloc"] || _objj_forward)(CPArray, "alloc"), ___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat(' == null ? ___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat(' : (___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat('.isa.method_msgSend["initWithObjects:count:"] || _objj_forward)(___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat(', "initWithObjects:count:", [');
                }
                else
                {
                    buffer.concat('(___r', node);
                    buffer.concat(++varScope.receiverLevel + '');
                    buffer.concat(' = CPArray.isa.objj_msgSend0(CPArray, "alloc"), ___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat(' == null ? ___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat(' : ___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat('.isa.objj_msgSend2(___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat(', "initWithObjects:count:", [');
                }
                if (!(varScope.maxReceiverLevel >= varScope.receiverLevel))
                {
                    varScope.maxReceiverLevel = varScope.receiverLevel;
                }
            }
            if (elementLength)
            {
                for (let i = 0; i < elementLength; i++)
                {
                    const elt = node.elements[i];
                    if (i)
                    {
                        buffer.concat(', ');
                    }
                    c(elt, st, 'Expression');
                }
                buffer.concat('], ' + elementLength + '))');
            }
            varScope.receiverLevel--;
        }, DictionaryLiteral:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            const keyLength = node.keys.length;
            const varScope = st.getVarScope();
            if (!varScope.receiverLevel)
                varScope.receiverLevel = 0;
            if (!keyLength)
            {
                if (compiler.options.inlineMsgSendFunctions)
                {
                    buffer.concat('(___r', node);
                    buffer.concat(++varScope.receiverLevel + '');
                    buffer.concat(' = (CPDictionary.isa.method_msgSend["alloc"] || _objj_forward)(CPDictionary, "alloc"), ___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat(' == null ? ___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat(' : (___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat('.isa.method_msgSend["init"] || _objj_forward)(___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat(', "init"))');
                }
                else
                {
                    buffer.concat('(___r');
                    buffer.concat(++varScope.receiverLevel + '');
                    buffer.concat(' = CPDictionary.isa.objj_msgSend0(CPDictionary, "alloc"), ___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat(' == null ? ___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat(' : ___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat('.isa.objj_msgSend0(___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat(', "init"))');
                }
                if (!(varScope.maxReceiverLevel >= varScope.receiverLevel))
                {
                    varScope.maxReceiverLevel = varScope.receiverLevel;
                }
            }
            else
            {
                if (compiler.options.inlineMsgSendFunctions)
                {
                    buffer.concat('(___r', node);
                    buffer.concat(++varScope.receiverLevel + '');
                    buffer.concat(' = (CPDictionary.isa.method_msgSend["alloc"] || _objj_forward)(CPDictionary, "alloc"), ___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat(' == null ? ___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat(' : (___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat('.isa.method_msgSend["initWithObjects:forKeys:"] || _objj_forward)(___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat(', "initWithObjects:forKeys:", [');
                }
                else
                {
                    buffer.concat('(___r', node);
                    buffer.concat(++varScope.receiverLevel + '');
                    buffer.concat(' = CPDictionary.isa.objj_msgSend0(CPDictionary, "alloc"), ___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat(' == null ? ___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat(' : ___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat('.isa.objj_msgSend2(___r');
                    buffer.concat(varScope.receiverLevel + '');
                    buffer.concat(', "initWithObjects:forKeys:", [');
                }
                if (!(varScope.maxReceiverLevel >= varScope.receiverLevel))
                {
                    varScope.maxReceiverLevel = varScope.receiverLevel;
                }
                for (let i = 0; i < keyLength; i++)
                {
                    const value = node.values[i];
                    if (i)
                        buffer.concat(', ');
                    c(value, st, 'Expression');
                }
                buffer.concat('], [');
                for (let i = 0; i < keyLength; i++)
                {
                    const key = node.keys[i];
                    if (i)
                        buffer.concat(', ');
                    c(key, st, 'Expression');
                }
                buffer.concat(']))');
            }
            varScope.receiverLevel--;
        }, ImportStatement:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            const localfilepath = node.localfilepath;
            buffer.concat('objj_executeFile("', node);
            buffer.concat(node.filename.value);
            buffer.concat(localfilepath ? '", YES);' : '", NO);');
        }, ClassDeclarationStatement:         function(node, st, c)
        {
            const compiler = st.compiler;
            const saveJSBuffer = compiler.jsBuffer;
            const className = node.classname.name;
            let classDef = compiler.getClassDef(className);
            const classScope = new Scope(st);
            const isInterfaceDeclaration = node.type === 'InterfaceDeclarationStatement';
            const protocols = node.protocols;
            const options = compiler.options;
            compiler.imBuffer = new StringBuffer(compiler.createSourceMap, compiler.URL, options.sourceMap && options.sourceMapIncludeSource ? compiler.source : null);
            compiler.cmBuffer = new StringBuffer(compiler.createSourceMap, compiler.URL);
            compiler.classBodyBuffer = new StringBuffer(compiler.createSourceMap, compiler.URL);
            if (compiler.getTypeDef(className))
            {
                throw compiler.error_message(className + ' is already declared as a type', node.classname);
            }
            if (node.superclassname)
            {
                if (classDef && classDef.ivars)
                {
                    throw compiler.error_message('Duplicate class ' + className, node.classname);
                }
                if (isInterfaceDeclaration && classDef && classDef.instanceMethods && classDef.classMethods)
                {
                    throw compiler.error_message('Duplicate interface definition for class ' + className, node.classname);
                }
                const superClassDef = compiler.getClassDef(node.superclassname.name);
                if (!superClassDef)
                {
                    let errorMessage = "Can't find superclass " + node.superclassname.name;
                    const stack = compiler.constructor.importStack;
                    if (stack)
                    {
                        for (let i = compiler.constructor.importStack.length; --i >= 0; )
                        {
                            errorMessage += '\n' + Array((stack.length - i) * 2 + 1).join(' ') + 'Imported by: ' + stack[i];
                        }
                    }
                    throw compiler.error_message(errorMessage, node.superclassname);
                }
                classDef = new ClassDef(!isInterfaceDeclaration, className, superClassDef, Object.create(null));
                saveJSBuffer.concat('\n{var the_class = objj_allocateClassPair(' + node.superclassname.name + ', "' + className + '"),\nmeta_class = the_class.isa;', node);
            }
            else if (node.categoryname)
            {
                classDef = compiler.getClassDef(className);
                if (!classDef)
                {
                    throw compiler.error_message('Class ' + className + ' not found ', node.classname);
                }
                saveJSBuffer.concat('{\nvar the_class = objj_getClass("' + className + '")\n', node);
                saveJSBuffer.concat('if(!the_class) throw new SyntaxError("*** Could not find definition for class \\"' + className + '\\"");\n');
                saveJSBuffer.concat('var meta_class = the_class.isa;');
            }
            else
            {
                classDef = new ClassDef(!isInterfaceDeclaration, className, null, Object.create(null));
                saveJSBuffer.concat('{var the_class = objj_allocateClassPair(Nil, "' + className + '"),\nmeta_class = the_class.isa;', node);
            }
            if (protocols)
            {
                for (let i = 0, size = protocols.length; i < size; i++)
                {
                    saveJSBuffer.concat('\nvar aProtocol = objj_getProtocol("' + protocols[i].name + '");', protocols[i]);
                    saveJSBuffer.concat('\nif (!aProtocol) throw new SyntaxError("*** Could not find definition for protocol \\"' + protocols[i].name + '\\"");');
                    saveJSBuffer.concat('\nclass_addProtocol(the_class, aProtocol);');
                }
            }
            classScope.classDef = classDef;
            compiler.currentSuperClass = 'objj_getClass("' + className + '").super_class';
            compiler.currentSuperMetaClass = 'objj_getMetaClass("' + className + '").super_class';
            let firstIvarDeclaration = true;
            const ivars = classDef.ivars;
            const classDefIvars = [];
            let hasAccessors = false;
            if (node.ivardeclarations)
            {
                for (let i = 0; i < node.ivardeclarations.length; ++i)
                {
                    const ivarDecl = node.ivardeclarations[i];
                    const ivarType = ivarDecl.ivartype ? ivarDecl.ivartype.name : null;
                    const ivarTypeIsClass = ivarDecl.ivartype ? ivarDecl.ivartype.typeisclass : false;
                    const ivarIdentifier = ivarDecl.id;
                    const ivarName = ivarIdentifier.name;
                    const ivar = {type: ivarType, name: ivarName};
                    const accessors = ivarDecl.accessors;
                    const checkIfIvarIsAlreadyDeclaredAndInSuperClass =                     function(aClassDef, recursiveFunction)
                    {
                        if (aClassDef.ivars[ivarName])
                        {
                            throw compiler.error_message("Instance variable '" + ivarName + "' is already declared for class " + className + (aClassDef.name !== className ? ' in superclass ' + aClassDef.name : ''), ivarDecl.id);
                        }
                        if (aClassDef.superClass)
                        {
                            recursiveFunction(aClassDef.superClass, recursiveFunction);
                        }
                    };
                    checkIfIvarIsAlreadyDeclaredAndInSuperClass(classDef, checkIfIvarIsAlreadyDeclaredAndInSuperClass);
                    const isTypeDefined = !ivarTypeIsClass || typeof global[ivarType] !== 'undefined' || typeof window !== 'undefined' && typeof window[ivarType] !== 'undefined' || compiler.getClassDef(ivarType) || compiler.getTypeDef(ivarType) || ivarType === classDef.name;
                    if (!isTypeDefined && compiler.options.warnings.includes(warningUnknownIvarType))
                    {
                        compiler.addWarning(createMessage("Unknown type '" + ivarType + "' for ivar '" + ivarName + "'", ivarDecl.ivartype, compiler.source));
                    }
                    if (firstIvarDeclaration)
                    {
                        firstIvarDeclaration = false;
                        saveJSBuffer.concat('class_addIvars(the_class, [');
                    }
                    else
                    {
                        saveJSBuffer.concat(', ');
                    }
                    if (options.includeIvarTypeSignatures)
                    {
                        saveJSBuffer.concat('new objj_ivar("' + ivarName + '", "' + ivarType + '")', node);
                    }
                    else
                    {
                        saveJSBuffer.concat('new objj_ivar("' + ivarName + '")', node);
                    }
                    if (ivarDecl.outlet)
                    {
                        ivar.outlet = true;
                    }
                    classDefIvars.push(ivar);
                    if (!classScope.ivars)
                    {
                        classScope.ivars = Object.create(null);
                    }
                    classScope.ivars[ivarName] = {type: 'ivar', name: ivarName, node: ivarIdentifier, ivar};
                    if (accessors)
                    {
                        const property = accessors.property && accessors.property.name || ivarName;
                        const getterName = accessors.getter && accessors.getter.name || property;
                        classDef.addInstanceMethod(new MethodDef(getterName, [ivarType]));
                        if (!accessors.readonly)
                        {
                            let setterName = accessors.setter ? accessors.setter.name : null;
                            if (!setterName)
                            {
                                const start = property.charAt(0) === '_' ? 1 : 0;
                                setterName = (start ? '_' : '') + 'set' + property.substr(start, 1).toUpperCase() + property.substring(start + 1) + ':';
                            }
                            classDef.addInstanceMethod(new MethodDef(setterName, ['void', ivarType]));
                        }
                        hasAccessors = true;
                    }
                }
            }
            if (!firstIvarDeclaration)
            {
                saveJSBuffer.concat(']);');
            }
            if (!isInterfaceDeclaration && hasAccessors)
            {
                const getterSetterBuffer = new StringBuffer(false);
                getterSetterBuffer.concat(compiler.source.substring(node.start, node.endOfIvars).replace(/<.*>/g, ''));
                getterSetterBuffer.concat('\n');
                for (let i = 0; i < node.ivardeclarations.length; ++i)
                {
                    const ivarDecl = node.ivardeclarations[i];
                    const ivarType = ivarDecl.ivartype ? ivarDecl.ivartype.name : null;
                    const ivarName = ivarDecl.id.name;
                    const accessors = ivarDecl.accessors;
                    if (!accessors)
                    {
                        continue;
                    }
                    const property = accessors.property && accessors.property.name || ivarName;
                    const getterName = accessors.getter && accessors.getter.name || property;
                    const getterCode = '- (' + (ivarType || 'id') + ')' + getterName + '\n{\n    return ' + ivarName + ';\n}\n';
                    getterSetterBuffer.concat(getterCode);
                    if (accessors.readonly)
                    {
                        continue;
                    }
                    let setterName = accessors.setter ? accessors.setter.name : null;
                    if (!setterName)
                    {
                        const start = property.charAt(0) === '_' ? 1 : 0;
                        setterName = (start ? '_' : '') + 'set' + property.substr(start, 1).toUpperCase() + property.substring(start + 1) + ':';
                    }
                    let setterCode = '- (void)' + setterName + '(' + (ivarType || 'id') + ')newValue\n{\n    ';
                    if (accessors.copy)
                    {
                        setterCode += 'if (' + ivarName + ' !== newValue)\n        ' + ivarName + ' = [newValue copy];\n}\n';
                    }
                    else
                    {
                        setterCode += ivarName + ' = newValue;\n}\n';
                    }
                    getterSetterBuffer.concat(setterCode);
                }
                getterSetterBuffer.concat('\n@end');
                const b = getterSetterBuffer.toString().replace(/@accessors(\(.*\))?/g, '');
                const compilerOptions = setupOptions(options);
                compilerOptions.sourceMapIncludeSource = true;
                const url = compiler.url;
                const filename = url && compiler.URL.substr(compiler.URL.lastIndexOf('/') + 1);
                const dotIndex = filename && filename.lastIndexOf('.');
                const filenameNoExt = filename && filename.substr(0, dotIndex === -1 ? filename.length : dotIndex);
                const filenameExt = filename && filename.substr(dotIndex === -1 ? filename.length : dotIndex);
                const categoryname = node.categoryname && node.categoryname.id;
                const imBuffer = exports.compileToIMBuffer(b, filenameNoExt + '_' + className + (categoryname ? '_' + categoryname : '') + '_Accessors' + (filenameExt || ''), compilerOptions);
                const generatedCode = imBuffer.toString();
                if (compiler.createSourceMap)
                {
                    compiler.imBuffer.concat(sourceMap.SourceNode.fromStringWithSourceMap(generatedCode.code, sourceMap.SourceMapConsumer(generatedCode.map.toString())));
                }
                else
                {
                    compiler.imBuffer.concat(generatedCode);
                }
            }
            for (let ivarSize = classDefIvars.length, i = 0; i < ivarSize; i++)
            {
                const ivar = classDefIvars[i];
                const ivarName = ivar.name;
                ivars[ivarName] = ivar;
            }
            compiler.classDefs[className] = classDef;
            const bodies = node.body;
            const bodyLength = bodies.length;
            if (bodyLength > 0)
            {
                for (let i = 0; i < bodyLength; ++i)
                {
                    const body = bodies[i];
                    c(body, classScope, 'Statement');
                }
            }
            if (!isInterfaceDeclaration && !node.categoryname)
            {
                saveJSBuffer.concat('objj_registerClassPair(the_class);\n');
            }
            if (compiler.imBuffer.isEmpty())
            {
                saveJSBuffer.concat('class_addMethods(the_class, [');
                saveJSBuffer.appendStringBuffer(compiler.imBuffer);
                saveJSBuffer.concat(']);\n');
            }
            if (compiler.cmBuffer.isEmpty())
            {
                saveJSBuffer.concat('class_addMethods(meta_class, [');
                saveJSBuffer.appendStringBuffer(compiler.cmBuffer);
                saveJSBuffer.concat(']);\n');
            }
            saveJSBuffer.concat('}\n');
            compiler.jsBuffer = saveJSBuffer;
            if (protocols)
            {
                const protocolDefs = [];
                for (let i = 0, size = protocols.length; i < size; i++)
                {
                    const protocol = protocols[i];
                    const protocolDef = compiler.getProtocolDef(protocol.name);
                    if (!protocolDef)
                    {
                        throw compiler.error_message("Cannot find protocol declaration for '" + protocol.name + "'", protocol);
                    }
                    protocolDefs.push(protocolDef);
                }
                const unimplementedMethods = classDef.listOfNotImplementedMethodsForProtocols(protocolDefs);
                if (unimplementedMethods && unimplementedMethods.length > 0)
                {
                    for (let j = 0, unimpSize = unimplementedMethods.length; j < unimpSize; j++)
                    {
                        const unimplementedMethod = unimplementedMethods[j];
                        const methodDef = unimplementedMethod.methodDef;
                        const protocolDef = unimplementedMethod.protocolDef;
                        compiler.addWarning(createMessage("Method '" + methodDef.name + "' in protocol '" + protocolDef.name + "' is not implemented", node.classname, compiler.source));
                    }
                }
            }
        }, ProtocolDeclarationStatement:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            const protocolName = node.protocolname.name;
            let protocolDef = compiler.getProtocolDef(protocolName);
            const protocols = node.protocols;
            const protocolScope = new Scope(st);
            const inheritFromProtocols = [];
            if (protocolDef)
            {
                throw compiler.error_message('Duplicate protocol ' + protocolName, node.protocolname);
            }
            compiler.imBuffer = new StringBuffer(compiler.createSourceMap, compiler.URL);
            compiler.cmBuffer = new StringBuffer(compiler.createSourceMap, compiler.URL);
            buffer.concat('{var the_protocol = objj_allocateProtocol("' + protocolName + '");', node);
            if (protocols)
            {
                for (let i = 0, size = protocols.length; i < size; i++)
                {
                    const protocol = protocols[i];
                    const inheritFromProtocolName = protocol.name;
                    const inheritProtocolDef = compiler.getProtocolDef(inheritFromProtocolName);
                    if (!inheritProtocolDef)
                    {
                        throw compiler.error_message("Can't find protocol " + inheritFromProtocolName, protocol);
                    }
                    buffer.concat('\nvar aProtocol = objj_getProtocol("' + inheritFromProtocolName + '");', node);
                    buffer.concat('\nif (!aProtocol) throw new SyntaxError("*** Could not find definition for protocol \\"' + protocolName + '\\"");', node);
                    buffer.concat('\nprotocol_addProtocol(the_protocol, aProtocol);', node);
                    inheritFromProtocols.push(inheritProtocolDef);
                }
            }
            protocolDef = new ProtocolDef(protocolName, inheritFromProtocols);
            compiler.protocolDefs[protocolName] = protocolDef;
            protocolScope.protocolDef = protocolDef;
            const someRequired = node.required;
            if (someRequired)
            {
                const requiredLength = someRequired.length;
                if (requiredLength > 0)
                {
                    for (let i = 0; i < requiredLength; ++i)
                    {
                        const required = someRequired[i];
                        c(required, protocolScope, 'Statement');
                    }
                }
            }
            buffer.concat('\nobjj_registerProtocol(the_protocol);\n');
            if (compiler.imBuffer.isEmpty())
            {
                buffer.concat('protocol_addMethodDescriptions(the_protocol, [');
                buffer.appendStringBuffer(compiler.imBuffer);
                buffer.concat('], true, true);\n');
            }
            if (compiler.cmBuffer.isEmpty())
            {
                buffer.concat('protocol_addMethodDescriptions(the_protocol, [');
                buffer.appendStringBuffer(compiler.cmBuffer);
                buffer.concat('], true, false);\n');
            }
            buffer.concat('}');
            compiler.jsBuffer = buffer;
        }, IvarDeclaration:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            if (node.outlet)
            {
                buffer.concat('@outlet ');
            }
            c(node.ivartype, st, 'VariablePattern');
            buffer.concat(' ');
            c(node.id, st, 'VariablePattern');
            if (node.accessors)
            {
                buffer.concat(' @accessors');
            }
        }, MethodDeclarationStatement:         function(node, st, c)
        {
            const compiler = st.compiler;
            const saveJSBuffer = compiler.jsBuffer;
            const methodScope = new FunctionScope(st);
            const isInstanceMethodType = node.methodtype === '-';
            const selectors = node.selectors;
            const nodeArguments = node.arguments;
            const returnType = node.returntype;
            const types = [returnType ? returnType.name : node.action ? 'void' : 'id'];
            const returnTypeProtocols = returnType ? returnType.protocols : null;
            let selector = selectors[0].name;
            if (returnTypeProtocols)
            {
                for (let i = 0, size = returnTypeProtocols.length; i < size; i++)
                {
                    const returnTypeProtocol = returnTypeProtocols[i];
                    if (!compiler.getProtocolDef(returnTypeProtocol.name))
                    {
                        compiler.addWarning(createMessage("Cannot find protocol declaration for '" + returnTypeProtocol.name + "'", returnTypeProtocol, compiler.source));
                    }
                }
            }
            compiler.jsBuffer = isInstanceMethodType ? compiler.imBuffer : compiler.cmBuffer;
            if (nodeArguments.length > 0)
            {
                for (let i = 0; i < nodeArguments.length; i++)
                {
                    const argument = nodeArguments[i];
                    const argumentType = argument.type;
                    const argumentTypeName = argumentType ? argumentType.name : 'id';
                    const argumentProtocols = argumentType ? argumentType.protocols : null;
                    types.push(argumentTypeName);
                    if (i === 0)
                    {
                        selector += ':';
                    }
                    else
                    {
                        selector += (selectors[i] ? selectors[i].name : '') + ':';
                    }
                    if (argumentProtocols)
                    {
                        for (let j = 0; j < argumentProtocols.length; j++)
                        {
                            const argumentProtocol = argumentProtocols[j];
                            if (!compiler.getProtocolDef(argumentProtocol.name))
                            {
                                compiler.addWarning(createMessage("Cannot find protocol declaration for '" + argumentProtocol.name + "'", argumentProtocol, compiler.source));
                            }
                        }
                    }
                }
            }
            if (compiler.jsBuffer.isEmpty())
            {
                compiler.jsBuffer.concat(', ');
            }
            compiler.jsBuffer.concat('new objj_method(sel_getUid("', node);
            compiler.jsBuffer.concat(selector);
            compiler.jsBuffer.concat('"), ');
            if (node.body)
            {
                if (node.returntype && node.returntype.async)
                {
                    compiler.jsBuffer.concat('async ');
                }
                compiler.jsBuffer.concat('function');
                if (compiler.options.includeMethodFunctionNames)
                {
                    compiler.jsBuffer.concat(' $' + st.currentClassName() + '__' + selector.replace(/:/g, '_'));
                }
                compiler.jsBuffer.concat('(self, _cmd');
                methodScope.methodType = node.methodtype;
                methodScope.vars.self = {type: 'method base', scope: methodScope};
                methodScope.vars._cmd = {type: 'method base', scope: methodScope};
                if (nodeArguments)
                {
                    for (let i = 0; i < nodeArguments.length; i++)
                    {
                        const argument = nodeArguments[i];
                        const argumentName = argument.identifier.name;
                        compiler.jsBuffer.concat(', ');
                        compiler.jsBuffer.concat(argumentName, argument.identifier);
                        methodScope.vars[argumentName] = {type: 'method argument', node: argument};
                    }
                }
                compiler.jsBuffer.concat(')\n');
                st.compiler.indentation += st.compiler.indentStep;
                methodScope.endOfScopeBody = true;
                c(node.body, methodScope, 'Statement');
                methodScope.variablesNotReadWarnings();
                st.compiler.indentation = st.compiler.indentation.substring(st.compiler.indentationSize);
                compiler.jsBuffer.concat('\n');
            }
            else
            {
                compiler.jsBuffer.concat('Nil\n');
            }
            if (compiler.options.includeMethodArgumentTypeSignatures)
            {
                compiler.jsBuffer.concat(',' + JSON.stringify(types));
            }
            compiler.jsBuffer.concat(')');
            compiler.jsBuffer = saveJSBuffer;
            let def = st.classDef;
            let alreadyDeclared;
            if (def)
            {
                alreadyDeclared = isInstanceMethodType ? def.getInstanceMethod(selector) : def.getClassMethod(selector);
            }
            else
            {
                def = st.protocolDef;
            }
            if (!def)
            {
                throw new Error('InternalError: MethodDeclaration without ClassDeclaration or ProtocolDeclaration at line: ' + objjParser.getLineInfo(compiler.source, node.start).line);
            }
            if (!alreadyDeclared)
            {
                const protocols = def.protocols;
                if (protocols)
                {
                    for (let i = 0; i < protocols.length; i++)
                    {
                        const protocol = protocols[i];
                        alreadyDeclared = isInstanceMethodType ? protocol.getInstanceMethod(selector) : protocol.getClassMethod(selector);
                        if (alreadyDeclared)
                        {
                            break;
                        }
                    }
                }
            }
            if (alreadyDeclared)
            {
                const declaredTypes = alreadyDeclared.types;
                if (declaredTypes)
                {
                    const typeSize = declaredTypes.length;
                    if (typeSize > 0)
                    {
                        const declaredReturnType = declaredTypes[0];
                        if (declaredReturnType !== types[0] && !(declaredReturnType === 'id' && returnType && returnType.typeisclass))
                        {
                            compiler.addWarning(createMessage("Conflicting return type in implementation of '" + selector + "': '" + declaredReturnType + "' vs '" + types[0] + "'", returnType || node.action || selectors[0], compiler.source));
                        }
                        for (let i = 1; i < typeSize; i++)
                        {
                            const parameterType = declaredTypes[i];
                            if (parameterType !== types[i] && !(parameterType === 'id' && nodeArguments[i - 1].type.typeisclass))
                            {
                                compiler.addWarning(createMessage("Conflicting parameter types in implementation of '" + selector + "': '" + parameterType + "' vs '" + types[i] + "'", nodeArguments[i - 1].type || nodeArguments[i - 1].identifier, compiler.source));
                            }
                        }
                    }
                }
            }
            const methodDef = new MethodDef(selector, types);
            if (isInstanceMethodType)
            {
                def.addInstanceMethod(methodDef);
            }
            else
            {
                def.addClassMethod(methodDef);
            }
        }, MessageSendExpression:         function(node, st, c)
        {
            const compiler = st.compiler;
            const inlineMsgSend = compiler.options.inlineMsgSendFunctions;
            const buffer = compiler.jsBuffer;
            const nodeObject = node.object;
            const selectors = node.selectors;
            const nodeArguments = node.arguments;
            const argumentsLength = nodeArguments.length;
            const firstSelector = selectors[0];
            let selector = firstSelector ? firstSelector.name : '';
            const parameters = node.parameters;
            const options = compiler.options;
            const varScope = st.getVarScope();
            for (let i = 0; i < argumentsLength; i++)
            {
                if (i !== 0)
                {
                    const nextSelector = selectors[i];
                    if (nextSelector)
                    {
                        selector += nextSelector.name;
                    }
                }
                selector += ':';
            }
            let totalNoOfParameters;
            if (!inlineMsgSend)
            {
                totalNoOfParameters = argumentsLength;
                if (parameters)
                {
                    totalNoOfParameters += parameters.length;
                }
            }
            let receiverIsIdentifier;
            let receiverIsNotSelf;
            let selfLvar;
            if (node.superObject)
            {
                if (inlineMsgSend)
                {
                    buffer.concat('(', node);
                    buffer.concat(st.currentMethodType() === '+' ? compiler.currentSuperMetaClass : compiler.currentSuperClass);
                    buffer.concat('.method_dtable["', node);
                    buffer.concat(selector);
                    buffer.concat('"] || _objj_forward)(self', node);
                }
                else
                {
                    buffer.concat('objj_msgSendSuper', node);
                    if (totalNoOfParameters < 4)
                    {
                        buffer.concat('' + totalNoOfParameters);
                    }
                    buffer.concat('({ receiver:self, super_class:' + (st.currentMethodType() === '+' ? compiler.currentSuperMetaClass : compiler.currentSuperClass) + ' }', node);
                }
            }
            else
            {
                receiverIsIdentifier = nodeObject.type === 'Identifier' && !(st.currentMethodType() === '-' && compiler.getIvarForClass(nodeObject.name, st) && !st.getLvar(nodeObject.name, true));
                if (receiverIsIdentifier)
                {
                    const name = nodeObject.name;
                    selfLvar = st.getLvar(name);
                    if (name === 'self')
                    {
                        receiverIsNotSelf = !selfLvar || !selfLvar.scope || selfLvar.scope.assignmentToSelf;
                    }
                    else
                    {
                        receiverIsNotSelf = !!selfLvar || !compiler.getClassDef(name);
                    }
                    if (receiverIsNotSelf)
                    {
                        buffer.concat('(', node);
                        c(nodeObject, st, 'Expression');
                        buffer.concat(' == null ? ', node);
                        c(nodeObject, st, 'Expression');
                        buffer.concat(' : ', node);
                    }
                    if (inlineMsgSend)
                    {
                        buffer.concat('(', node);
                    }
                    c(nodeObject, st, 'Expression');
                }
                else
                {
                    receiverIsNotSelf = true;
                    if (!varScope.receiverLevel)
                        varScope.receiverLevel = 0;
                    buffer.concat('((___r' + ++varScope.receiverLevel, node);
                    buffer.concat(' = ', node);
                    c(nodeObject, st, 'Expression');
                    buffer.concat(')', node);
                    buffer.concat(', ___r' + varScope.receiverLevel, node);
                    buffer.concat(' == null ? ', node);
                    buffer.concat('___r' + varScope.receiverLevel, node);
                    buffer.concat(' : ', node);
                    if (inlineMsgSend)
                    {
                        buffer.concat('(', node);
                    }
                    buffer.concat('___r' + varScope.receiverLevel, node);
                    if (!(varScope.maxReceiverLevel >= varScope.receiverLevel))
                    {
                        varScope.maxReceiverLevel = varScope.receiverLevel;
                    }
                }
                if (inlineMsgSend)
                {
                    buffer.concat('.isa.method_msgSend["', node);
                    buffer.concat(selector, node);
                    buffer.concat('"] || _objj_forward)', node);
                }
                else
                {
                    buffer.concat('.isa.objj_msgSend', node);
                }
            }
            let selectorJSPath;
            if (!node.superObject)
            {
                if (!inlineMsgSend)
                {
                    if (totalNoOfParameters < 4)
                    {
                        buffer.concat('' + totalNoOfParameters, node);
                    }
                }
                if (receiverIsIdentifier)
                {
                    buffer.concat('(', node);
                    c(nodeObject, st, 'Expression');
                }
                else
                {
                    buffer.concat('(___r' + varScope.receiverLevel, node);
                }
                if (options.sourceMap && nodeObject.type === 'Identifier')
                {
                    compiler.jsBuffer = new StringBuffer();
                    c(nodeObject, st, 'Expression');
                    const aTarget = compiler.jsBuffer.toString();
                    selectorJSPath = aTarget + '.isa.method_dtable["' + selector + '"]';
                    compiler.jsBuffer = buffer;
                }
            }
            buffer.concat(', ', node);
            if (selectorJSPath)
            {
                buffer.concat('(', node);
                for (let i = 0; i < selectors.length; i++)
                {
                    const nextSelector = selectors[i];
                    if (nextSelector)
                    {
                        buffer.concat(selectorJSPath, nextSelector);
                        buffer.concat(', ', node);
                    }
                }
            }
            buffer.concat('"', node);
            buffer.concat(selector, node);
            buffer.concat(selectorJSPath ? '")' : '"', node);
            if (nodeArguments)
            {
                for (let i = 0; i < nodeArguments.length; i++)
                {
                    const argument = nodeArguments[i];
                    buffer.concat(', ', node);
                    c(argument, st, 'Expression');
                }
            }
            if (parameters)
            {
                for (let i = 0; i < parameters.length; ++i)
                {
                    const parameter = parameters[i];
                    buffer.concat(', ', node);
                    c(parameter, st, 'Expression');
                }
            }
            if (!node.superObject)
            {
                if (receiverIsNotSelf)
                {
                    buffer.concat(')', node);
                }
                if (!receiverIsIdentifier)
                {
                    varScope.receiverLevel--;
                }
            }
            buffer.concat(')', node);
        }, SelectorLiteralExpression:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat('sel_getUid("', node);
            buffer.concat(node.selector);
            buffer.concat('")');
        }, ProtocolLiteralExpression:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat('objj_getProtocol("', node);
            c(node.id, st, 'VariablePattern');
            buffer.concat('")');
        }, Reference:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            buffer.concat('function(__input) { if (arguments.length) return ', node);
            c(node.element, st, 'Expression');
            buffer.concat(' = __input; return ');
            c(node.element, st, 'Expression');
            buffer.concat('; }');
        }, Dereference:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            checkCanDereference(st, node.expr);
            c(node.expr, st, 'Expression');
            buffer.concat('()');
        }, ClassStatement:         function(node, st, c)
        {
            const compiler = st.compiler;
            const className = node.id.name;
            if (compiler.getTypeDef(className))
            {
                throw compiler.error_message(className + ' is already declared as a type', node.id);
            }
            if (!compiler.getClassDef(className))
            {
                compiler.classDefs[className] = new ClassDef(false, className);
            }
            st.vars[node.id.name] = {type: 'class', node: node.id};
        }, GlobalStatement:         function(node, st, c)
        {
            st.rootScope().vars[node.id.name] = {type: 'global', node: node.id};
        }, PreprocessStatement: ignore, TypeDefStatement:         function(node, st, c)
        {
            const compiler = st.compiler;
            const buffer = compiler.jsBuffer;
            const typeDefName = node.typedefname.name;
            let typeDef = compiler.getTypeDef(typeDefName);
            const typeDefScope = new Scope(st);
            if (typeDef)
            {
                throw compiler.error_message('Duplicate type definition ' + typeDefName, node.typedefname);
            }
            if (compiler.getClassDef(typeDefName))
            {
                throw compiler.error_message(typeDefName + ' is already declared as class', node.typedefname);
            }
            buffer.concat('{var the_typedef = objj_allocateTypeDef("' + typeDefName + '");', node);
            typeDef = new TypeDef(typeDefName);
            compiler.typeDefs[typeDefName] = typeDef;
            typeDefScope.typeDef = typeDef;
            buffer.concat('\nobjj_registerTypeDef(the_typedef);\n');
            buffer.concat('}');
        }});
class ObjJAcornCompiler {
             constructor(aString, aURL, options)
            {
                this.source = aString;
                this.URL = aURL && aURL.toString();
                options = setupOptions(options);
                this.options = options;
                this.pass = options.pass;
                this.classDefs = options.classDefs;
                this.protocolDefs = options.protocolDefs;
                this.typeDefs = options.typeDefs;
                this.generate = options.generate;
                this.createSourceMap = options.sourceMap;
                this.formatDescription = options.formatDescription;
                this.includeComments = options.includeComments;
                this.transformNamedFunctionDeclarationToAssignment = options.transformNamedFunctionDeclarationToAssignment;
                this.jsBuffer = new StringBuffer(this.createSourceMap, aURL, options.sourceMap && options.sourceMapIncludeSource ? this.source : null);
                this.imBuffer = null;
                this.cmBuffer = null;
                this.dependencies = [];
                this.warningsAndErrors = [];
                this.lastPos = 0;
                this.indentType = ' ';
                this.indentationSpaces = 4;
                this.indentationSize = this.indentationSpaces * this.indentType.length;
                this.indentStep = Array(this.indentationSpaces + 1).join(this.indentType);
                this.indentation = '';
                let acornOptions = options.acornOptions;
                if (acornOptions)
                {
                    if (this.URL)
                    {
                        acornOptions.sourceFile = this.URL.substr(this.URL.lastIndexOf('/') + 1);
                    }
                    if (options.sourceMap && !acornOptions.locations)
                    {
                        acornOptions.locations = true;
                    }
                }
                else
                {
                    acornOptions = options.acornOptions = this.URL && {sourceFile: this.URL.substr(this.URL.lastIndexOf('/') + 1)};
                    if (options.sourceMap)
                    {
                        acornOptions.locations = true;
                    }
                }
                if (options.macros)
                {
                    if (acornOptions.macros)
                    {
                        acornOptions.macros.concat(options.macros);
                    }
                    else
                    {
                        acornOptions.macros = options.macros;
                    }
                }
                try {
                    this.tokens = objjParser__namespace.parse(aString, options.acornOptions);
                    this.compile(this.tokens, new Scope(null, {compiler: this}), this.pass === 2 ? pass2 : pass1);
                }
                catch(e) {
                    if (e.lineStart != null)
                    {
                        e.messageForLine = aString.substring(e.lineStart, e.lineEnd);
                    }
                    this.addWarning(e);
                    return;
                }
                this.setCompiledCode(this.jsBuffer);
            }
             setCompiledCode(stringBuffer)
            {
                if (this.createSourceMap)
                {
                    const s = stringBuffer.toString();
                    this.compiledCode = s.code;
                    this.sourceMap = s.map;
                }
                else
                {
                    this.compiledCode = stringBuffer.toString();
                }
            }
             compilePass2()
            {
                const options = this.options;
                exports.currentCompileFile = this.URL;
                this.pass = options.pass = 2;
                this.jsBuffer = new StringBuffer(this.createSourceMap, this.URL, options.sourceMap && options.sourceMapIncludeSource ? this.source : null);
                if (this.createSourceMap)
                {
                    this.jsBuffer.concat('\n\n');
                }
                this.warningsAndErrors = [];
                try {
                    this.compile(this.tokens, new Scope(null, {compiler: this}), pass2);
                }
                catch(e) {
                    this.addWarning(e);
                    return null;
                }
                this.setCompiledCode(this.jsBuffer);
                return this.compiledCode;
            }
             addWarning(aWarning)
            {
                if (aWarning.path == null)
                {
                    aWarning.path = this.URL;
                }
                this.warningsAndErrors.push(aWarning);
            }
             getIvarForClass(ivarName, scope)
            {
                const ivar = scope.getIvarForCurrentClass(ivarName);
                if (ivar)
                {
                    return ivar;
                }
                let c = this.getClassDef(scope.currentClassName());
                while (c)
                {
                    const ivars = c.ivars;
                    if (ivars)
                    {
                        const ivarDef = ivars[ivarName];
                        if (ivarDef)
                        {
                            return ivarDef;
                        }
                    }
                    c = c.superClass;
                }
            }
             getClassDef(aClassName)
            {
                if (!aClassName)
                    return null;
                let c = this.classDefs[aClassName];
                if (c)
                    return c;
                if (typeof objj_getClass === 'function')
                {
                    const aClass = objj_getClass(aClassName);
                    if (aClass)
                    {
                        const ivars = class_copyIvarList(aClass);
                        const ivarSize = ivars.length;
                        const myIvars = Object.create(null);
                        const protocols = class_copyProtocolList(aClass);
                        const protocolSize = protocols.length;
                        const myProtocols = Object.create(null);
                        const instanceMethodDefs = ObjJAcornCompiler.methodDefsFromMethodList(class_copyMethodList(aClass));
                        const classMethodDefs = ObjJAcornCompiler.methodDefsFromMethodList(class_copyMethodList(aClass.isa));
                        const superClass = class_getSuperclass(aClass);
                        for (let i = 0; i < ivarSize; i++)
                        {
                            const ivar = ivars[i];
                            myIvars[ivar.name] = {type: ivar.type, name: ivar.name};
                        }
                        for (let i = 0; i < protocolSize; i++)
                        {
                            const protocol = protocols[i];
                            const protocolName = protocol_getName(protocol);
                            const protocolDef = this.getProtocolDef(protocolName);
                            myProtocols[protocolName] = protocolDef;
                        }
                        c = new ClassDef(true, aClassName, superClass ? this.getClassDef(superClass.name) : null, myIvars, instanceMethodDefs, classMethodDefs, myProtocols);
                        this.classDefs[aClassName] = c;
                        return c;
                    }
                }
                return null;
            }
             getProtocolDef(aProtocolName)
            {
                if (!aProtocolName)
                    return null;
                let p = this.protocolDefs[aProtocolName];
                if (p)
                    return p;
                if (typeof objj_getProtocol === 'function')
                {
                    const aProtocol = objj_getProtocol(aProtocolName);
                    if (aProtocol)
                    {
                        const protocolName = protocol_getName(aProtocol);
                        const requiredInstanceMethods = protocol_copyMethodDescriptionList(aProtocol, true, true);
                        const requiredInstanceMethodDefs = ObjJAcornCompiler.methodDefsFromMethodList(requiredInstanceMethods);
                        const requiredClassMethods = protocol_copyMethodDescriptionList(aProtocol, true, false);
                        const requiredClassMethodDefs = ObjJAcornCompiler.methodDefsFromMethodList(requiredClassMethods);
                        const protocols = aProtocol.protocols;
                        const inheritFromProtocols = [];
                        if (protocols)
                        {
                            for (let i = 0, size = protocols.length; i < size; i++)
                            {
                                inheritFromProtocols.push(this.getProtocolDef(protocols[i].name));
                            }
                        }
                        p = new ProtocolDef(protocolName, inheritFromProtocols, requiredInstanceMethodDefs, requiredClassMethodDefs);
                        this.protocolDefs[aProtocolName] = p;
                        return p;
                    }
                }
                return null;
            }
             getTypeDef(aTypeDefName)
            {
                if (!aTypeDefName)
                {
                    return null;
                }
                let t = this.typeDefs[aTypeDefName];
                if (t)
                {
                    return t;
                }
                if (typeof objj_getTypeDef === 'function')
                {
                    const aTypeDef = objj_getTypeDef(aTypeDefName);
                    if (aTypeDef)
                    {
                        const typeDefName = typeDef_getName(aTypeDef);
                        t = new TypeDef(typeDefName);
                        this.typeDefs[typeDefName] = t;
                        return t;
                    }
                }
                return null;
            }
             executable()
            {
                if (!this._executable)
                {
                    this._executable = new Executable(this.jsBuffer ? this.jsBuffer.toString() : null, this.dependencies, this.URL, null, this);
                }
                return this._executable;
            }
             IMBuffer()
            {
                return this.imBuffer;
            }
             code()
            {
                return this.compiledCode;
            }
             ast()
            {
                return JSON.stringify(this.tokens, null, this.indentationSpaces);
            }
             map()
            {
                return JSON.stringify(this.sourceMap);
            }
             prettifyMessage(aMessage)
            {
                const line = aMessage.messageForLine;
                let message = '\n' + (line || '');
                if (!message.endsWith('\n'))
                    message += '\n';
                if (line)
                {
                    message += new Array((aMessage.messageOnColumn || 0) + 1).join(' ');
                    message += new Array(Math.min(1, line.length || 1) + 1).join('^') + '\n';
                }
                message += (aMessage.messageType || 'ERROR') + ' line ' + (aMessage.messageOnLine || aMessage.line) + ' in ' + this.URL + ':' + aMessage.messageOnLine + ': ' + aMessage.message;
                return message;
            }
             error_message(errorMessage, node)
            {
                const pos = objjParser__namespace.getLineInfo(this.source, node.start);
                const syntaxError = new SyntaxError(errorMessage);
                syntaxError.messageOnLine = pos.line;
                syntaxError.messageOnColumn = pos.column;
                syntaxError.path = this.URL;
                syntaxError.messageForNode = node;
                syntaxError.messageType = 'ERROR';
                syntaxError.messageForLine = this.source.substring(pos.lineStart, pos.lineEnd);
                return syntaxError;
            }
             pushImport(url)
            {
                if (!ObjJAcornCompiler.importStack)
                    ObjJAcornCompiler.importStack = [];
                ObjJAcornCompiler.importStack.push(url);
            }
             popImport()
            {
                ObjJAcornCompiler.importStack.pop();
            }
             compile(node, state, visitor)
            {
                function c(node, st, override)
                {
                    if (typeof visitor[override || node.type] !== 'function')
                    {
                        console.log(node.type);
                        console.log(override);
                        console.log(Object.keys(visitor));
                    }
                    visitor[override || node.type](node, st, c);
                }
                c(node, state);
            }
             compileWithFormat(node, state, visitor)
            {
                let lastNode,
                    lastComment;
                function c(node, st, override)
                {
                    const compiler = st.compiler;
                    const includeComments = compiler.includeComments;
                    const localLastNode = lastNode;
                    const sameNode = localLastNode === node;
                    lastNode = node;
                    if (includeComments && !sameNode && node.commentsBefore && node.commentsBefore !== lastComment)
                    {
                        for (let i = 0; i < node.commentsBefore.length; i++)
                        {
                            compiler.jsBuffer.concat(node.commentsBefore[i]);
                        }
                    }
                    st.pushNode(node, override);
                    const formatDescription = st.formatDescription();
                    if (!sameNode && formatDescription && formatDescription.before)
                    {
                        compiler.jsBuffer.concatFormat(formatDescription.before);
                    }
                    visitor[override || node.type](node, st, c, formatDescription);
                    if (!sameNode && formatDescription && formatDescription.after)
                    {
                        compiler.jsBuffer.concatFormat(formatDescription.after);
                    }
                    st.popNode();
                    if (includeComments && !sameNode && node.commentsAfter)
                    {
                        for (let i = 0; i < node.commentsAfter.length; i++)
                        {
                            compiler.jsBuffer.concat(node.commentsAfter[i]);
                        }
                        lastComment = node.commentsAfter;
                    }
                    else
                    {
                        lastComment = null;
                    }
                }
                c(node, state);
            }
}
        ObjJAcornCompiler.methodDefsFromMethodList =         function(methodList)
        {
            const methodSize = methodList.length;
            const myMethods = Object.create(null);
            for (let i = 0; i < methodSize; i++)
            {
                const method = methodList[i];
                const methodName = method_getName(method);
                myMethods[methodName] = new MethodDef(methodName, method.types);
            }
            return myMethods;
        };
        function compileToExecutable(aString, aURL, options)
        {
            exports.currentCompileFile = aURL;
            return new ObjJAcornCompiler(aString, aURL, options).executable();
        }
        function compileToIMBuffer(aString, aURL, options)
        {
            return new ObjJAcornCompiler(aString, aURL, options).IMBuffer();
        }
        function compile(aString, aURL, options)
        {
            return new ObjJAcornCompiler(aString, aURL, options);
        }
        function compileFileDependencies(aString, aURL, options)
        {
            exports.currentCompileFile = aURL;
            (options || (options = {})).pass = 1;
            return new ObjJAcornCompiler(aString, aURL, options);
        }
        function numberOfLinesAtTopOfFunction()
        {
            const f = new Function('x', 'return x;');
            const fString = f.toString();
            const index = fString.indexOf('return x;');
            const firstPart = fString.substring(0, index);
            const numberOfLines = (firstPart.match(/\n/g) || []).length;
            ObjJAcornCompiler.numberOfLinesAtTopOfFunction =             function()
            {
                return numberOfLines;
            };
            return numberOfLines;
        }
        function parseGccCompilerFlags(compilerFlags)
        {
            const args = (compilerFlags || '').split(' ');
            const count = args.length;
            const objjcFlags = {};
            for (let index = 0; index < count; ++index)
            {
                const argument = args[index];
                if (argument.indexOf('-g') === 0)
                {
                    objjcFlags.includeMethodFunctionNames = true;
                }
                else if (argument.indexOf('-O') === 0)
                {
                    objjcFlags.compress = true;
                    if (argument.length > 2)
                        objjcFlags.inlineMsgSendFunctions = true;
                }
                else if (argument.indexOf('-T') === 0)
                {
                    objjcFlags.includeIvarTypeSignatures = false;
                    objjcFlags.includeMethodArgumentTypeSignatures = false;
                }
                else if (argument.indexOf('-S') === 0)
                {
                    objjcFlags.sourceMap = true;
                    objjcFlags.sourceMapIncludeSource = true;
                }
                else if (argument.indexOf('--include') === 0)
                {
                    let includeUrl = args[++index];
                    const firstChar = includeUrl && includeUrl.charCodeAt(0);
                    if (firstChar === 34 || firstChar === 39)
                    {
                        includeUrl = includeUrl.substring(1, includeUrl.length - 1);
                    }
                    (objjcFlags.includeFiles || (objjcFlags.includeFiles = [])).push(includeUrl);
                }
                else if (argument.indexOf('--inline-msg-send') === 0)
                {
                    objjcFlags.inlineMsgSendFunctions = true;
                }
                else if (argument.indexOf('-D') === 0)
                {
                    const macroDefinition = argument.substring(2);
                    (objjcFlags.macros || (objjcFlags.macros = [])).push(macroDefinition);
                }
                else if (argument.indexOf('-W') === 0)
                {
                    const isNo = argument.indexOf('no-', 2) === 2;
                    const warningName = argument.substring(isNo ? 5 : 2);
                    const indexOfWarning = (objjcFlags.warnings || (objjcFlags.warnings = defaultOptions.warnings.slice())).findIndex(                    function(element)
                    {
                        return element.name === warningName;
                    });
                    if (isNo)
                    {
                        if (indexOfWarning !== -1)
                        {
                            objjcFlags.warnings.splice(indexOfWarning, 1);
                        }
                    }
                    else
                    {
                        if (indexOfWarning === -1)
                        {
                            const theWarning = AllWarnings.find(                            function(element)
                            {
                                return element.name === warningName;
                            });
                            if (theWarning)
                                objjcFlags.warnings.push(theWarning);
                        }
                    }
                }
            }
            return objjcFlags;
        }
        exports.compile = compile;
        exports.compileFileDependencies = compileFileDependencies;
        exports.compileToExecutable = compileToExecutable;
        exports.compileToIMBuffer = compileToIMBuffer;
        exports.numberOfLinesAtTopOfFunction = numberOfLinesAtTopOfFunction;
        exports.parseGccCompilerFlags = parseGccCompilerFlags;
        Object.defineProperty(exports, '__esModule', {value: true});
    });
    function FileDependency(aURL, isLocal)
    {
        this._URL = aURL;
        this._isLocal = isLocal;
    }
    exports.FileDependency = FileDependency;
    FileDependency.prototype.URL =     function()
    {
        return this._URL;
    };
    FileDependency.prototype.isLocal =     function()
    {
        return this._isLocal;
    };
    FileDependency.prototype.toMarkedString =     function()
    {
        var URLString = this.URL().absoluteString();
        return (this.isLocal() ? MARKER_IMPORT_LOCAL : MARKER_IMPORT_STD) + ";" + URLString.length + ";" + URLString;
    };
    FileDependency.prototype.toString =     function()
    {
        return (this.isLocal() ? "LOCAL: " : "STD: ") + this.URL();
    };
    var ExecutableUnloadedFileDependencies = 0,
        ExecutableLoadingFileDependencies = 1,
        ExecutableLoadedFileDependencies = 2,
        ExecutableCantStartLoadYetFileDependencies = 3,
        AnonymousExecutableCount = 0;
    function Executable(aCode, fileDependencies, aURL, aFunction, aCompiler, aFilenameTranslateDictionary, sourceMap)
    {
        if (arguments.length === 0)
            return this;
        this._code = aCode;
        this._function = aFunction || null;
        this._URL = makeAbsoluteURL(aURL || new CFURL("(Anonymous" + AnonymousExecutableCount++ + ")"));
        this._compiler = aCompiler || null;
        this._fileDependencies = fileDependencies;
        this._filenameTranslateDictionary = aFilenameTranslateDictionary;
        if (sourceMap)
            this._base64EncodedSourceMap = sourceMap;
        if (!fileDependencies)
        {
            this._fileDependencyStatus = ExecutableCantStartLoadYetFileDependencies;
            this._fileDependencyCallbacks = [];
        }
        else if (fileDependencies.length)
        {
            this._fileDependencyStatus = ExecutableUnloadedFileDependencies;
            this._fileDependencyCallbacks = [];
        }
        else
        {
            this._fileDependencyStatus = ExecutableLoadedFileDependencies;
        }
        if (this._function)
            return;
        if (!aCompiler)
            this.setCode(aCode);
    }
    exports.Executable = Executable;
    Executable.prototype.path =     function()
    {
        return this.URL().path();
    };
    Executable.prototype.URL =     function()
    {
        return this._URL;
    };
    Executable.prototype.URL.displayName = "Executable . prototype . URL";
    Executable.prototype.functionParameters =     function()
    {
        var functionParameters = ["global", "objj_executeFile", "objj_importFile"];
        return functionParameters;
    };
    Executable.prototype.functionParameters.displayName = "Executable . prototype . functionParameters";
    Executable.prototype.functionArguments =     function()
    {
        var functionArguments = [global, this.fileExecuter(), this.fileImporter()];
        return functionArguments;
    };
    Executable.prototype.functionArguments.displayName = "Executable . prototype . functionArguments";
    Executable.prototype.execute =     function()
    {
        if (this._compiler)
        {
            var fileDependencies = this.fileDependencies(),
                index = 0,
                count = fileDependencies.length;
            this._compiler.pushImport(this.URL().lastPathComponent());
            for (; index < count; ++index)
            {
                var fileDependency = fileDependencies[index],
                    isQuoted = fileDependency.isLocal(),
                    URL = fileDependency.URL();
                this.fileExecuter()(URL, isQuoted);
            }
            this._compiler.popImport();
            this.setCode(this._compiler.compilePass2(), this._compiler.map());
            if (FileExecutable.printWarningsAndErrors(this._compiler, exports.messageOutputFormatInXML))
                throw "Compilation error";
            this._compiler = null;
        }
        var oldContextBundle = CONTEXT_BUNDLE;
        CONTEXT_BUNDLE = CFBundle.bundleContainingURL(this.URL());
        var result = this._function.apply(global, this.functionArguments());
        CONTEXT_BUNDLE = oldContextBundle;
        return result;
    };
    Executable.prototype.execute.displayName = "Executable . prototype . execute";
    Executable.prototype.code =     function()
    {
        return this._code;
    };
    Executable.prototype.code.displayName = "Executable . prototype . code";
    Executable.prototype.setCode =     function(code, sourceMap)
    {
        this._code = code;
        var parameters = this.functionParameters().join(",");
        var sourceMapBase64;
        sourceMapBase64 = this._base64EncodedSourceMap;
        var absoluteString = this.URL().absoluteString();
        code += "/**/\n//# sourceURL=" + absoluteString + "s";
        if (sourceMap)
        {
            if (typeof btoa === 'function')
                sourceMapBase64 = btoa(UTF16ToUTF8(sourceMap));
            else if (typeof Buffer === 'function')
                sourceMapBase64 = new Buffer(sourceMap).toString("base64");
        }
        if (sourceMapBase64)
        {
            code = code.substring((exports.ObjJCompiler || ObjJCompiler).numberOfLinesAtTopOfFunction());
            this._base64EncodedSourceMap = sourceMapBase64;
            code += "\n//# sourceMappingURL=data:application/json;charset=utf-8;base64," + sourceMapBase64;
        }
        this._function = new Function(parameters, code);
        this._function.displayName = absoluteString;
    };
    Executable.prototype.setCode.displayName = "Executable . prototype . setCode";
    Executable.prototype.fileDependencies =     function()
    {
        return this._fileDependencies;
    };
    Executable.prototype.fileDependencies.displayName = "Executable . prototype . fileDependencies";
    Executable.prototype.setFileDependencies =     function(newValue)
    {
        this._fileDependencies = newValue;
    };
    Executable.prototype.setFileDependencies.displayName = "Executable . prototype . setFileDependencies";
    Executable.prototype.hasLoadedFileDependencies =     function()
    {
        return this._fileDependencyStatus === ExecutableLoadedFileDependencies;
    };
    Executable.prototype.hasLoadedFileDependencies.displayName = "Executable . prototype . hasLoadedFileDependencies";
    var fileDependencyLoadCount = 0,
        fileDependencyExecutables = [],
        fileDependencyMarkers = {};
    Executable.prototype.loadFileDependencies =     function(aCallback)
    {
        var status = this._fileDependencyStatus;
        if (aCallback)
        {
            if (status === ExecutableLoadedFileDependencies)
                return aCallback();
            this._fileDependencyCallbacks.push(aCallback);
        }
        if (status === ExecutableUnloadedFileDependencies)
        {
            if (fileDependencyLoadCount)
                throw "Can't load";
            loadFileDependenciesForExecutable(this);
        }
    };
    Executable.prototype.loadFileDependencies.displayName = "Executable . prototype . loadFileDependencies";
    Executable.prototype.setExecutableUnloadedFileDependencies =     function()
    {
        if (this._fileDependencyStatus === ExecutableCantStartLoadYetFileDependencies)
            this._fileDependencyStatus = ExecutableUnloadedFileDependencies;
    };
    Executable.prototype.setExecutableUnloadedFileDependencies.displayName = "Executable . prototype . setExecutableUnloadedFileDependencies";
    Executable.prototype.isExecutableCantStartLoadYetFileDependencies =     function()
    {
        return this._fileDependencyStatus === ExecutableCantStartLoadYetFileDependencies;
    };
    Executable.prototype.setExecutableUnloadedFileDependencies.displayName = "Executable . prototype . setExecutableUnloadedFileDependencies";
    function loadFileDependenciesForExecutable(anExecutable)
    {
        fileDependencyExecutables.push(anExecutable);
        anExecutable._fileDependencyStatus = ExecutableLoadingFileDependencies;
        var fileDependencies = anExecutable.fileDependencies(),
            index = 0,
            count = fileDependencies.length,
            referenceURL = anExecutable.referenceURL(),
            referenceURLString = referenceURL.absoluteString(),
            fileExecutableSearcher = anExecutable.fileExecutableSearcher();
        fileDependencyLoadCount += count;
        for (; index < count; ++index)
        {
            var fileDependency = fileDependencies[index],
                isQuoted = fileDependency.isLocal(),
                URL = fileDependency.URL(),
                marker = (isQuoted && referenceURLString + " " || "") + URL;
            if (fileDependencyMarkers[marker])
            {
                if (--fileDependencyLoadCount === 0)
                    fileExecutableDependencyLoadFinished();
                continue;
            }
            fileDependencyMarkers[marker] = YES;
            fileExecutableSearcher(URL, isQuoted, fileExecutableSearchFinished);
        }
    }
    function fileExecutableSearchFinished(aFileExecutable)
    {
        --fileDependencyLoadCount;
        if (aFileExecutable._fileDependencyStatus === ExecutableUnloadedFileDependencies)
            loadFileDependenciesForExecutable(aFileExecutable);
        else if (fileDependencyLoadCount === 0)
            fileExecutableDependencyLoadFinished();
    }
    function fileExecutableDependencyLoadFinished()
    {
        var executables = fileDependencyExecutables,
            index = 0,
            count = executables.length;
        fileDependencyExecutables = [];
        for (; index < count; ++index)
            executables[index]._fileDependencyStatus = ExecutableLoadedFileDependencies;
        for (index = 0; index < count; ++index)
        {
            var executable = executables[index],
                callbacks = executable._fileDependencyCallbacks,
                callbackIndex = 0,
                callbackCount = callbacks.length;
            for (; callbackIndex < callbackCount; ++callbackIndex)
                callbacks[callbackIndex]();
            executable._fileDependencyCallbacks = [];
        }
    }
    Executable.prototype.referenceURL =     function()
    {
        if (this._referenceURL === undefined)
            this._referenceURL = new CFURL(".", this.URL());
        return this._referenceURL;
    };
    Executable.prototype.referenceURL.displayName = "Executable . prototype . referenceURL";
    Executable.prototype.fileImporter =     function()
    {
        return Executable.fileImporterForURL(this.referenceURL());
    };
    Executable.prototype.fileImporter.displayName = "Executable . prototype . fileImporter";
    Executable.prototype.fileExecuter =     function()
    {
        return Executable.fileExecuterForURL(this.referenceURL());
    };
    Executable.prototype.fileExecuter.displayName = "Executable . prototype . fileExecuter";
    Executable.prototype.fileExecutableSearcher =     function()
    {
        return Executable.fileExecutableSearcherForURL(this.referenceURL());
    };
    Executable.prototype.fileExecutableSearcher.displayName = "Executable . prototype . fileExecutableSearcher";
    var cachedFileExecuters = {};
    Executable.fileExecuterForURL =     function(aURL)
    {
        var referenceURL = makeAbsoluteURL(aURL),
            referenceURLString = referenceURL.absoluteString(),
            cachedFileExecuter = cachedFileExecuters[referenceURLString];
        if (!cachedFileExecuter)
        {
            cachedFileExecuter =             function(aURL, isQuoted, shouldForce)
            {
                Executable.fileExecutableSearcherForURL(referenceURL)(aURL, isQuoted,                 function(aFileExecutable)
                {
                    if (!aFileExecutable.hasLoadedFileDependencies())
                        throw "No executable loaded for file at URL " + aURL;
                    aFileExecutable.execute(shouldForce);
                });
            };
            cachedFileExecuters[referenceURLString] = cachedFileExecuter;
        }
        return cachedFileExecuter;
    };
    Executable.fileExecuterForURL.displayName = "Executable . fileExecuterForURL";
    var cachedFileImporters = {};
    Executable.fileImporterForURL =     function(aURL)
    {
        var referenceURL = makeAbsoluteURL(aURL),
            referenceURLString = referenceURL.absoluteString(),
            cachedFileImporter = cachedFileImporters[referenceURLString];
        if (!cachedFileImporter)
        {
            cachedFileImporter =             function(aURL, isQuoted, aCallback)
            {
                enableCFURLCaching();
                Executable.fileExecutableSearcherForURL(referenceURL)(aURL, isQuoted,                 function(aFileExecutable)
                {
                    aFileExecutable.loadFileDependencies(                    function()
                    {
                        aFileExecutable.execute();
                        disableCFURLCaching();
                        if (aCallback)
                            aCallback();
                    });
                });
            };
            cachedFileImporters[referenceURLString] = cachedFileImporter;
        }
        return cachedFileImporter;
    };
    Executable.fileImporterForURL.displayName = "Executable . fileImporterForURL";
    var cachedFileExecutableSearchers = {},
        cachedFileExecutableSearchResults = {};
    function countProp(x)
    {
        var count = 0;
        for (var k in x)
        {
            if (x.hasOwnProperty(k))
            {
                ++count;
            }
        }
        return count;
    }
    Executable.resetCachedFileExecutableSearchers =     function()
    {
        cachedFileExecutableSearchers = {};
        cachedFileExecutableSearchResults = {};
        cachedFileImporters = {};
        cachedFileExecuters = {};
        fileDependencyMarkers = {};
    };
    Executable.fileExecutableSearcherForURL =     function(referenceURL)
    {
        var referenceURLString = referenceURL.absoluteString(),
            cachedFileExecutableSearcher = cachedFileExecutableSearchers[referenceURLString];
        if (!cachedFileExecutableSearcher)
        {
            var aFilenameTranslateDictionary = Executable.filenameTranslateDictionary ? Executable.filenameTranslateDictionary() : null;
            cachedFileExecutableSearcher =             function(aURL, isQuoted, success)
            {
                var cacheUID = (isQuoted && referenceURL || "") + aURL,
                    cachedResult = cachedFileExecutableSearchResults[cacheUID];
                if (cachedResult)
                    return completed(cachedResult);
                var isAbsoluteURL = aURL instanceof CFURL && aURL.scheme();
                if (isQuoted || isAbsoluteURL)
                {
                    if (!isAbsoluteURL)
                        aURL = new CFURL(aURL, referenceURL);
                    StaticResource.resolveResourceAtURL(aURL, NO, completed, aFilenameTranslateDictionary);
                }
                else
                    StaticResource.resolveResourceAtURLSearchingIncludeURLs(aURL, completed);
                function completed(aStaticResource)
                {
                    if (!aStaticResource)
                    {
                        var compilingFileUrl = exports.ObjJCompiler || ObjJCompiler ? (exports.ObjJCompiler || ObjJCompiler).currentCompileFile : null;
                        throw new Error("Could not load file at " + aURL + (compilingFileUrl ? " when compiling " + compilingFileUrl : "") + "\nwith includeURLs: " + StaticResource.includeURLs());
                    }
                    cachedFileExecutableSearchResults[cacheUID] = aStaticResource;
                    success(new FileExecutable(aStaticResource.URL(), aFilenameTranslateDictionary));
                }
            };
            cachedFileExecutableSearchers[referenceURLString] = cachedFileExecutableSearcher;
        }
        return cachedFileExecutableSearcher;
    };
    Executable.fileExecutableSearcherForURL.displayName = "Executable . fileExecutableSearcherForURL";
    var SURROGATE_HIGH_START = 0xD800;
    var SURROGATE_HIGH_END = 0xDBFF;
    var SURROGATE_LOW_START = 0xDC00;
    var SURROGATE_LOW_END = 0xDFFF;
    var REPLACEMENT_CHAR = 0xFFFD;
    var FIRSTBYTEMARK = [0x00, 0xC0, 0xE0, 0xF0, 0xF8, 0xFC];
    function UTF16ToUTF8(source)
    {
        var target = "";
        var currentPos = 0;
        for (var i = 0; i < source.length; i++)
        {
            var c = source.charCodeAt(i);
            if (c < 0x80)
                continue;
            if (i > currentPos)
                target += source.substring(currentPos, i);
            if (c >= SURROGATE_HIGH_START && c <= SURROGATE_HIGH_END)
            {
                i++;
                if (i < source.length)
                {
                    var c2 = source.charCodeAt(i);
                    if (c2 >= SURROGATE_LOW_START && c2 <= SURROGATE_LOW_END)
                    {
                        c = (c - SURROGATE_HIGH_START << 10) + (c2 - SURROGATE_LOW_START) + 0x10000;
                    }
                    else
                    {
                        return null;
                    }
                }
                else
                {
                    return null;
                }
            }
            else if (c >= SURROGATE_LOW_START && c <= SURROGATE_LOW_END)
            {
                return null;
            }
            currentPos = i + 1;
            enc = [];
            var cc = c;
            if (cc >= 0x110000)
            {
                cc = 0x800;
                c = REPLACEMENT_CHAR;
            }
            if (cc >= 0x10000)
            {
                enc.unshift(String.fromCharCode((c | 0x80) & 0xBF));
                c >>= 6;
            }
            if (cc >= 0x800)
            {
                enc.unshift(String.fromCharCode((c | 0x80) & 0xBF));
                c >>= 6;
            }
            if (cc >= 0x80)
            {
                enc.unshift(String.fromCharCode((c | 0x80) & 0xBF));
                c >>= 6;
            }
            enc.unshift(String.fromCharCode(c | FIRSTBYTEMARK[enc.length]));
            target += enc.join("");
        }
        if (currentPos === 0)
            return source;
        if (i > currentPos)
            target += source.substring(currentPos, i);
        return target;
    }
    UTF16ToUTF8.displayName = "UTF16ToUTF8";
    var FileExecutablesForURLStrings = {};
    var currentCompilerFlags = {};
    var currentGccCompilerFlags = "";
    function FileExecutable(aURL, aFilenameTranslateDictionary)
    {
        aURL = makeAbsoluteURL(aURL);
        var URLString = aURL.absoluteString(),
            existingFileExecutable = FileExecutablesForURLStrings[URLString];
        if (existingFileExecutable)
            return existingFileExecutable;
        FileExecutablesForURLStrings[URLString] = this;
        var fileContents = StaticResource.resourceAtURL(aURL).contents(),
            executable = NULL,
            extension = aURL.pathExtension().toLowerCase();
        this._hasExecuted = NO;
        if (fileContents.match(/^@STATIC;/))
            executable = decompile(fileContents, aURL);
        else if ((extension === "j" || !extension) && !fileContents.match(/^{/))
        {
            var compilerOptions = currentCompilerFlags || {};
            this.cachedIncludeFileSearchResultsContent = {};
            this.cachedIncludeFileSearchResultsURL = {};
            compile(this, fileContents, aURL, compilerOptions, aFilenameTranslateDictionary);
            return;
        }
        else
            executable = new Executable(fileContents, [], aURL);
        Executable.apply(this, [executable.code(), executable.fileDependencies(), aURL, executable._function, executable._compiler, aFilenameTranslateDictionary]);
    }
    exports.FileExecutable = FileExecutable;
    FileExecutable.prototype = new Executable();
    var compile =     function(self, fileContents, aURL, compilerOptions, aFilenameTranslateDictionary)
    {
        var acornOptions = compilerOptions.acornOptions || (compilerOptions.acornOptions = {ecmaVersion: 2022});
        acornOptions.preprocessGetIncludeFile =         function(filePath, isQuoted)
        {
            var referenceURL = new CFURL(".", aURL),
                includeURL = new CFURL(filePath);
            var cacheUID = (isQuoted && referenceURL || "") + includeURL,
                cachedResult = self.cachedIncludeFileSearchResultsContent[cacheUID];
            if (!cachedResult)
            {
                var isAbsoluteURL = includeURL instanceof CFURL && includeURL.scheme(),
                    compileWhenCompleted = NO;
                function completed(aStaticResource)
                {
                    var includeString = aStaticResource && aStaticResource.contents(),
                        lastCharacter = includeString && includeString.charCodeAt(includeString.length - 1);
                    if (includeString == null)
                        throw new Error("Can't load file " + includeURL);
                    if (lastCharacter !== 10 && lastCharacter !== 13 && lastCharacter !== 8232 && lastCharacter !== 8233)
                    {
                        includeString += '\n';
                    }
                    self.cachedIncludeFileSearchResultsContent[cacheUID] = includeString;
                    self.cachedIncludeFileSearchResultsURL[cacheUID] = aStaticResource.URL();
                    if (compileWhenCompleted)
                        compile(self, fileContents, aURL, compilerOptions, aFilenameTranslateDictionary);
                }
                if (isQuoted || isAbsoluteURL)
                {
                    if (!isAbsoluteURL)
                        includeURL = new CFURL(includeURL, new CFURL(aFilenameTranslateDictionary[aURL.lastPathComponent()] || ".", referenceURL));
                    StaticResource.resolveResourceAtURL(includeURL, NO, completed);
                }
                else
                    StaticResource.resolveResourceAtURLSearchingIncludeURLs(includeURL, completed);
                cachedResult = self.cachedIncludeFileSearchResultsContent[cacheUID];
            }
            if (cachedResult)
            {
                return {include: cachedResult, sourceFile: self.cachedIncludeFileSearchResultsURL[cacheUID]};
            }
            else
            {
                compileWhenCompleted = YES;
                return null;
            }
        };
        var includeFiles = currentCompilerFlags && currentCompilerFlags.includeFiles,
            allPreIncludesResolved = true;
        acornOptions.preIncludeFiles = [];
        if (includeFiles)
            for (var i = 0, size = includeFiles.length; i < size; i++)
            {
                var includeFileUrl = makeAbsoluteURL(includeFiles[i]);
                try {
                    var aResource = StaticResource.resourceAtURL(makeAbsoluteURL(includeFileUrl));
                }
                catch(e) {
                    StaticResource.resolveResourcesAtURLs(includeFiles.map(                    function(u)
                    {
                        return makeAbsoluteURL(u);
                    }),                     function()
                    {
                        compile(self, fileContents, aURL, compilerOptions, aFilenameTranslateDictionary);
                    });
                    allPreIncludesResolved = false;
                    break;
                }
                if (aResource)
                {
                    if (aResource.isNotFound())
                    {
                        throw new Error("--include file not found " + includeUrl);
                    }
                    var includeString = aResource.contents();
                    var lastCharacter = includeString.charCodeAt(includeString.length - 1);
                    if (lastCharacter !== 10 && lastCharacter !== 13 && lastCharacter !== 8232 && lastCharacter !== 8233)
                        includeString += '\n';
                    acornOptions.preIncludeFiles.push({include: includeString, sourceFile: includeFileUrl.toString()});
                }
            }
        if (allPreIncludesResolved)
        {
            var compiler = (exports.ObjJCompiler || ObjJCompiler).compileFileDependencies(fileContents, aURL, compilerOptions);
            var warningsAndErrors = compiler.warningsAndErrors;
            if (warningsAndErrors && warningsAndErrors.length === 1 && warningsAndErrors[0].message.indexOf("file not found") > -1)
                return;
            if (FileExecutable.printWarningsAndErrors(compiler, exports.messageOutputFormatInXML))
                throw "Compilation error";
            var fileDependencies = compiler.dependencies.map(            function(aFileDep)
            {
                return new FileDependency(new CFURL(aFileDep.url), aFileDep.isLocal);
            });
        }
        if (self.isExecutableCantStartLoadYetFileDependencies())
        {
            self.setFileDependencies(fileDependencies);
            self.setExecutableUnloadedFileDependencies();
            self.loadFileDependencies();
        }
        else if (self._fileDependencyStatus == null)
        {
            executable = new Executable(compiler && compiler.jsBuffer ? compiler.jsBuffer.toString() : null, fileDependencies, aURL, null, compiler);
            Executable.apply(self, [executable.code(), executable.fileDependencies(), aURL, executable._function, executable._compiler, aFilenameTranslateDictionary]);
        }
    };
    compile.displayName = "compile";
    FileExecutable.resetFileExecutables =     function()
    {
        FileExecutablesForURLStrings = {};
        FunctionCache = {};
    };
    FileExecutable.prototype.execute =     function(shouldForce)
    {
        if (this._hasExecuted && !shouldForce)
            return;
        this._hasExecuted = YES;
        Executable.prototype.execute.call(this);
    };
    FileExecutable.prototype.execute.displayName = "FileExecutable . prototype . execute";
    FileExecutable.prototype.hasExecuted =     function()
    {
        return this._hasExecuted;
    };
    FileExecutable.prototype.hasExecuted.displayName = "FileExecutable . prototype . hasExecuted";
    function decompile(aString, aURL)
    {
        var stream = new MarkedStream(aString);
        var marker = NULL,
            code = "",
            dependencies = [],
            sourceMap;
        while (marker = stream.getMarker())
        {
            var text = stream.getString();
            if (marker === MARKER_TEXT)
                code += text;
            else if (marker === MARKER_IMPORT_STD)
                dependencies.push(new FileDependency(new CFURL(text), NO));
            else if (marker === MARKER_IMPORT_LOCAL)
                dependencies.push(new FileDependency(new CFURL(text), YES));
            else if (marker === MARKER_SOURCE_MAP)
                sourceMap = text;
        }
        var fn = FileExecutable._lookupCachedFunction(aURL);
        if (fn)
            return new Executable(code, dependencies, aURL, fn, null, null, sourceMap);
        return new Executable(code, dependencies, aURL, null, null, null, sourceMap);
    }
    var FunctionCache = {};
    FileExecutable._cacheFunction =     function(aURL, fn)
    {
        aURL = typeof aURL === "string" ? aURL : aURL.absoluteString();
        FunctionCache[aURL] = fn;
    };
    FileExecutable._lookupCachedFunction =     function(aURL)
    {
        aURL = typeof aURL === "string" ? aURL : aURL.absoluteString();
        return FunctionCache[aURL];
    };
    FileExecutable.setCurrentGccCompilerFlags =     function(compilerFlags)
    {
        if (currentGccCompilerFlags === compilerFlags)
            return;
        currentGccCompilerFlags = compilerFlags;
        var objjcFlags = (exports.ObjJCompiler || ObjJCompiler).parseGccCompilerFlags(compilerFlags);
        FileExecutable.setCurrentCompilerFlags(objjcFlags);
    };
    FileExecutable.currentGccCompilerFlags =     function(compilerFlags)
    {
        return currentGccCompilerFlags;
    };
    FileExecutable.setCurrentCompilerFlags =     function(compilerFlags)
    {
        currentCompilerFlags = compilerFlags;
        if (currentCompilerFlags.transformNamedFunctionDeclarationToAssignment == null)
            currentCompilerFlags.transformNamedFunctionDeclarationToAssignment = true;
        if (currentCompilerFlags.sourceMap == null)
            currentCompilerFlags.sourceMap = false;
        if (currentCompilerFlags.inlineMsgSendFunctions == null)
            currentCompilerFlags.inlineMsgSendFunctions = false;
    };
    FileExecutable.currentCompilerFlags =     function(compilerFlags)
    {
        return currentCompilerFlags;
    };
    FileExecutable.printWarningsAndErrors =     function(compiler, printXML)
    {
        var warnings = [],
            anyErrors = false;
        for (var i = 0; i < compiler.warningsAndErrors.length; i++)
        {
            var warning = compiler.warningsAndErrors[i],
                message = compiler.prettifyMessage(warning);
            anyErrors = anyErrors || warning.messageType === "ERROR";
            console.log(message);
        }
        return anyErrors;
    };
    FileExecutable.setCurrentCompilerFlags({});
    var CLS_CLASS = 0x1,
        CLS_META = 0x2,
        CLS_INITIALIZED = 0x4,
        CLS_INITIALIZING = 0x8;
    objj_ivar =     function(aName, aType)
    {
        this.name = aName;
        this.type = aType;
    };
    objj_method =     function(aName, anImplementation, types)
    {
        var method = anImplementation ||         function(aReceiver, aSelector)
        {
            CPException.isa.objj_msgSend2(CPException, "raise:reason:", CPInternalInconsistencyException, aReceiver.isa.method_msgSend0(self, "className") + " does not have an implementation for selector '" + aSelector + "'");
        };
        method.method_name = aName;
        method.method_imp = anImplementation;
        method.method_types = types;
        return method;
    };
    objj_class =     function(displayName)
    {
        this.isa = NULL;
        this.version = 0;
        this.super_class = NULL;
        this.name = NULL;
        this.info = 0;
        this.ivar_list = [];
        this.ivar_store =         function()
        {
        };
        this.ivar_dtable = this.ivar_store.prototype;
        this.method_list = [];
        this.method_store =         function()
        {
        };
        this.method_dtable = this.method_store.prototype;
        this.protocol_list = [];
        eval("this.allocator = function " + (displayName ? displayName.replace(/^0|\W/g, "_") : "OBJJ_OBJECT") + "() { }");
        this._UID = -1;
    };
    objj_protocol =     function(aName)
    {
        this.name = aName;
        this.instance_methods = {};
        this.class_methods = {};
    };
    objj_object =     function()
    {
        this.isa = NULL;
        this._UID = -1;
    };
    objj_typeDef =     function(aName)
    {
        this.name = aName;
    };
    class_getName =     function(aClass)
    {
        if (aClass == Nil)
            return "";
        return aClass.name;
    };
    class_isMetaClass =     function(aClass)
    {
        if (!aClass)
            return NO;
        return aClass.info & CLS_META;
    };
    class_getSuperclass =     function(aClass)
    {
        if (aClass == Nil)
            return Nil;
        return aClass.super_class;
    };
    class_setSuperclass =     function(aClass, aSuperClass)
    {
        aClass.super_class = aSuperClass;
        aClass.isa.super_class = aSuperClass.isa;
    };
    class_addIvar =     function(aClass, aName, aType)
    {
        var thePrototype = aClass.allocator.prototype;
        if (typeof thePrototype[aName] != "undefined")
            return NO;
        var ivar = new objj_ivar(aName, aType);
        aClass.ivar_list.push(ivar);
        aClass.ivar_dtable[aName] = ivar;
        thePrototype[aName] = NULL;
        return YES;
    };
    class_addIvars =     function(aClass, ivars)
    {
        var index = 0,
            count = ivars.length,
            thePrototype = aClass.allocator.prototype;
        for (; index < count; ++index)
        {
            var ivar = ivars[index],
                name = ivar.name;
            if (typeof thePrototype[name] === "undefined")
            {
                aClass.ivar_list.push(ivar);
                aClass.ivar_dtable[name] = ivar;
                thePrototype[name] = NULL;
            }
        }
    };
    class_copyIvarList =     function(aClass)
    {
        return aClass.ivar_list.slice(0);
    };
    class_addMethod =     function(aClass, aName, anImplementation, types)
    {
        var method = new objj_method(aName, anImplementation, types);
        aClass.method_list.push(method);
        aClass.method_dtable[aName] = method;
        method.displayName = (aClass.info & CLS_META ? '+' : '-') + " [" + class_getName(aClass) + ' ' + method_getName(method) + ']';
        if (!(aClass.info & CLS_META) && (aClass.info & CLS_META ? aClass : aClass.isa).isa === (aClass.info & CLS_META ? aClass : aClass.isa))
            class_addMethod(aClass.info & CLS_META ? aClass : aClass.isa, aName, anImplementation, types);
        return YES;
    };
    class_addMethods =     function(aClass, methods)
    {
        var index = 0,
            count = methods.length,
            method_list = aClass.method_list,
            method_dtable = aClass.method_dtable;
        for (; index < count; ++index)
        {
            var method = methods[index];
            method_list.push(method);
            method_dtable[method.method_name] = method;
            method.displayName = (aClass.info & CLS_META ? '+' : '-') + " [" + class_getName(aClass) + ' ' + method_getName(method) + ']';
        }
        if (!(aClass.info & CLS_META) && (aClass.info & CLS_META ? aClass : aClass.isa).isa === (aClass.info & CLS_META ? aClass : aClass.isa))
            class_addMethods(aClass.info & CLS_META ? aClass : aClass.isa, methods);
    };
    class_getInstanceMethod =     function(aClass, aSelector)
    {
        if (!aClass || !aSelector)
            return NULL;
        var method = aClass.method_dtable[aSelector];
        return method ? method : NULL;
    };
    class_getInstanceVariable =     function(aClass, aName)
    {
        if (!aClass || !aName)
            return NULL;
        var variable = aClass.ivar_dtable[aName];
        return variable;
    };
    class_getClassMethod =     function(aClass, aSelector)
    {
        if (!aClass || !aSelector)
            return NULL;
        var method = (aClass.info & CLS_META ? aClass : aClass.isa).method_dtable[aSelector];
        return method ? method : NULL;
    };
    class_respondsToSelector =     function(aClass, aSelector)
    {
        return class_getClassMethod(aClass, aSelector) != NULL;
    };
    class_copyMethodList =     function(aClass)
    {
        return aClass.method_list.slice(0);
    };
    class_getVersion =     function(aClass)
    {
        return aClass.version;
    };
    class_setVersion =     function(aClass, aVersion)
    {
        aClass.version = parseInt(aVersion, 10);
    };
    class_replaceMethod =     function(aClass, aSelector, aMethodImplementation)
    {
        if (!aClass || !aSelector)
            return NULL;
        var method = aClass.method_dtable[aSelector],
            method_imp = method.method_imp,
            new_method = new objj_method(method.method_name, aMethodImplementation, method.method_types);
        new_method.displayName = method.displayName;
        aClass.method_dtable[aSelector] = new_method;
        var index = aClass.method_list.indexOf(method);
        if (index !== -1)
        {
            aClass.method_list[index] = new_method;
        }
        else
        {
            aClass.method_list.push(new_method);
        }
        return method_imp;
    };
    class_addProtocol =     function(aClass, aProtocol)
    {
        if (!aProtocol || class_conformsToProtocol(aClass, aProtocol))
        {
            return;
        }
        (aClass.protocol_list || (aClass.protocol_list = [])).push(aProtocol);
        return true;
    };
    class_conformsToProtocol =     function(aClass, aProtocol)
    {
        if (!aProtocol)
            return false;
        while (aClass)
        {
            var protocols = aClass.protocol_list,
                size = protocols ? protocols.length : 0;
            for (var i = 0; i < size; i++)
            {
                var p = protocols[i];
                if (p.name === aProtocol.name)
                {
                    return true;
                }
                if (protocol_conformsToProtocol(p, aProtocol))
                {
                    return true;
                }
            }
            aClass = class_getSuperclass(aClass);
        }
        return false;
    };
    class_copyProtocolList =     function(aClass)
    {
        var protocols = aClass.protocol_list;
        return protocols ? protocols.slice(0) : [];
    };
    protocol_conformsToProtocol =     function(p1, p2)
    {
        if (!p1 || !p2)
            return false;
        if (p1.name === p2.name)
            return true;
        var protocols = p1.protocol_list,
            size = protocols ? protocols.length : 0;
        for (var i = 0; i < size; i++)
        {
            var p = protocols[i];
            if (p.name === p2.name)
            {
                return true;
            }
            if (protocol_conformsToProtocol(p, p2))
            {
                return true;
            }
        }
        return false;
    };
    var REGISTERED_PROTOCOLS = Object.create(null);
    objj_allocateProtocol =     function(aName)
    {
        var protocol = new objj_protocol(aName);
        return protocol;
    };
    objj_registerProtocol =     function(proto)
    {
        REGISTERED_PROTOCOLS[proto.name] = proto;
    };
    protocol_getName =     function(proto)
    {
        return proto.name;
    };
    protocol_addMethodDescription =     function(proto, selector, types, isRequiredMethod, isInstanceMethod)
    {
        if (!proto || !selector)
            return;
        if (isRequiredMethod)
            (isInstanceMethod ? proto.instance_methods : proto.class_methods)[selector] = new objj_method(selector, null, types);
    };
    protocol_addMethodDescriptions =     function(proto, methods, isRequiredMethod, isInstanceMethod)
    {
        if (!isRequiredMethod)
            return;
        var index = 0,
            count = methods.length,
            method_dtable = isInstanceMethod ? proto.instance_methods : proto.class_methods;
        for (; index < count; ++index)
        {
            var method = methods[index];
            method_dtable[method.method_name] = method;
        }
    };
    protocol_copyMethodDescriptionList =     function(proto, isRequiredMethod, isInstanceMethod)
    {
        if (!isRequiredMethod)
            return [];
        var method_dtable = isInstanceMethod ? proto.instance_methods : proto.class_methods,
            methodList = [];
        for (var selector in method_dtable)
            if (method_dtable.hasOwnProperty(selector))
                methodList.push(method_dtable[selector]);
        return methodList;
    };
    protocol_addProtocol =     function(proto, addition)
    {
        if (!proto || !addition)
            return;
        (proto.protocol_list || (proto.protocol_list = [])).push(addition);
    };
    var REGISTERED_TYPEDEFS = Object.create(null);
    objj_allocateTypeDef =     function(aName)
    {
        var typeDef = new objj_typeDef(aName);
        return typeDef;
    };
    objj_registerTypeDef =     function(typeDef)
    {
        REGISTERED_TYPEDEFS[typeDef.name] = typeDef;
    };
    typeDef_getName =     function(typeDef)
    {
        return typeDef.name;
    };
    var _class_initialize =     function(aClass)
    {
        var meta = aClass.info & CLS_META ? aClass : aClass.isa;
        if (aClass.info & CLS_META)
            aClass = objj_getClass(aClass.name);
        if (aClass.super_class && !((aClass.super_class.info & CLS_META ? aClass.super_class : aClass.super_class.isa).info & CLS_INITIALIZED))
            _class_initialize(aClass.super_class);
        if (!(meta.info & CLS_INITIALIZED) && !(meta.info & CLS_INITIALIZING))
        {
            meta.info = (meta.info | CLS_INITIALIZING) & ~0;
            aClass.objj_msgSend = objj_msgSendFast;
            aClass.objj_msgSend0 = objj_msgSendFast0;
            aClass.objj_msgSend1 = objj_msgSendFast1;
            aClass.objj_msgSend2 = objj_msgSendFast2;
            aClass.objj_msgSend3 = objj_msgSendFast3;
            meta.objj_msgSend = objj_msgSendFast;
            meta.objj_msgSend0 = objj_msgSendFast0;
            meta.objj_msgSend1 = objj_msgSendFast1;
            meta.objj_msgSend2 = objj_msgSendFast2;
            meta.objj_msgSend3 = objj_msgSendFast3;
            aClass.method_msgSend = aClass.method_dtable;
            var metaMethodDTable = meta.method_msgSend = meta.method_dtable,
                initializeImp = metaMethodDTable["initialize"];
            if (initializeImp)
                initializeImp(aClass, "initialize");
            meta.info = (meta.info | CLS_INITIALIZED) & ~CLS_INITIALIZING;
        }
    };
    _objj_forward =     function(self, _cmd)
    {
        var isa = self.isa,
            meta = isa.info & CLS_META ? isa : isa.isa;
        if (!(meta.info & CLS_INITIALIZED) && !(meta.info & CLS_INITIALIZING))
        {
            _class_initialize(isa);
        }
        var implementation = isa.method_msgSend[_cmd];
        if (implementation)
        {
            return implementation.apply(isa, arguments);
        }
        implementation = isa.method_dtable[SEL_forwardingTargetForSelector_];
        if (implementation)
        {
            var target = implementation(self, SEL_forwardingTargetForSelector_, _cmd);
            if (target && target !== self)
            {
                arguments[0] = target;
                return target.isa.objj_msgSend.apply(target.isa, arguments);
            }
        }
        implementation = isa.method_dtable[SEL_methodSignatureForSelector_];
        if (implementation)
        {
            var forwardInvocationImplementation = isa.method_dtable[SEL_forwardInvocation_];
            if (forwardInvocationImplementation)
            {
                var signature = implementation(self, SEL_methodSignatureForSelector_, _cmd);
                if (signature)
                {
                    var invocationClass = objj_lookUpClass("CPInvocation");
                    if (invocationClass)
                    {
                        var invocation = invocationClass.isa.objj_msgSend1(invocationClass, SEL_invocationWithMethodSignature_, signature),
                            index = 0,
                            count = arguments.length;
                        if (invocation != null)
                        {
                            var invocationIsa = invocation.isa;
                            for (; index < count; ++index)
                                invocationIsa.objj_msgSend2(invocation, SEL_setArgument_atIndex_, arguments[index], index);
                        }
                        forwardInvocationImplementation(self, SEL_forwardInvocation_, invocation);
                        return invocation == null ? null : invocationIsa.objj_msgSend0(invocation, SEL_returnValue);
                    }
                }
            }
        }
        implementation = isa.method_dtable[SEL_doesNotRecognizeSelector_];
        if (implementation)
            return implementation(self, SEL_doesNotRecognizeSelector_, _cmd);
        throw class_getName(isa) + " does not implement doesNotRecognizeSelector: when sending " + sel_getName(_cmd) + ". Did you forget a superclass for " + class_getName(isa) + "?";
    };
    class_getMethodImplementation =     function(aClass, aSelector)
    {
        if (!((aClass.info & CLS_META ? aClass : aClass.isa).info & CLS_INITIALIZED))
            _class_initialize(aClass);
        var implementation = aClass.method_dtable[aSelector] || _objj_forward;
;
        return implementation;
    };
    var REGISTERED_CLASSES = Object.create(null);
    objj_enumerateClassesUsingBlock =     function(aBlock)
    {
        for (var key in REGISTERED_CLASSES)
        {
            aBlock(REGISTERED_CLASSES[key]);
        }
    };
    objj_allocateClassPair =     function(superclass, aName)
    {
        var classObject = new objj_class(aName),
            metaClassObject = new objj_class(aName),
            rootClassObject = classObject;
        if (superclass)
        {
            rootClassObject = superclass;
            while (rootClassObject.superclass)
                rootClassObject = rootClassObject.superclass;
            classObject.allocator.prototype = new superclass.allocator();
            classObject.ivar_dtable = classObject.ivar_store.prototype = new superclass.ivar_store();
            classObject.method_dtable = classObject.method_store.prototype = new superclass.method_store();
            metaClassObject.method_dtable = metaClassObject.method_store.prototype = new superclass.isa.method_store();
            classObject.super_class = superclass;
            metaClassObject.super_class = superclass.isa;
        }
        else
            classObject.allocator.prototype = new objj_object();
        classObject.isa = metaClassObject;
        classObject.name = aName;
        classObject.info = CLS_CLASS;
        classObject._UID = objj_generateObjectUID();
        classObject.init = true;
        metaClassObject.isa = rootClassObject.isa;
        metaClassObject.name = aName;
        metaClassObject.info = CLS_META;
        metaClassObject._UID = objj_generateObjectUID();
        metaClassObject.init = true;
        return classObject;
    };
    var CONTEXT_BUNDLE = nil;
    objj_registerClassPair =     function(aClass)
    {
        global[aClass.name] = aClass;
        REGISTERED_CLASSES[aClass.name] = aClass;
        addClassToBundle(aClass, CONTEXT_BUNDLE);
    };
    objj_resetRegisterClasses =     function()
    {
        for (var key in REGISTERED_CLASSES)
            delete global[key];
        REGISTERED_CLASSES = Object.create(null);
        REGISTERED_PROTOCOLS = Object.create(null);
        REGISTERED_TYPEDEFS = Object.create(null);
        resetBundle();
    };
    class_createInstance =     function(aClass)
    {
        if (!aClass)
            throw new Error("*** Attempting to create object with Nil class.");
        var object = new aClass.allocator();
        object.isa = aClass;
        object._UID = objj_generateObjectUID();
        return object;
    };
    var prototype_bug =     function()
    {
    };
    prototype_bug.prototype.member = false;
    with(new prototype_bug())
        member = true;
    if (new prototype_bug().member)
    {
        var fast_class_createInstance = class_createInstance;
        class_createInstance =         function(aClass)
        {
            var object = fast_class_createInstance(aClass);
            if (object)
            {
                var theClass = object.isa,
                    actualClass = theClass;
                while (theClass)
                {
                    var ivars = theClass.ivar_list,
                        count = ivars.length;
                    while (count--)
                        object[ivars[count].name] = NULL;
                    theClass = theClass.super_class;
                }
                object.isa = actualClass;
            }
            return object;
        };
    }
    object_getClassName =     function(anObject)
    {
        if (!anObject)
            return "";
        var theClass = anObject.isa;
        return theClass ? class_getName(theClass) : "";
    };
    objj_lookUpClass =     function(aName)
    {
        var theClass = REGISTERED_CLASSES[aName];
        return theClass ? theClass : Nil;
    };
    objj_getClass =     function(aName)
    {
        var theClass = REGISTERED_CLASSES[aName];
        if (!theClass)
        {
        }
        return theClass ? theClass : Nil;
    };
    objj_getClassList =     function(buffer, bufferLen)
    {
        for (var aName in REGISTERED_CLASSES)
        {
            buffer.push(REGISTERED_CLASSES[aName]);
            if (bufferLen && --bufferLen === 0)
                break;
        }
        return buffer.length;
    };
    objj_getMetaClass =     function(aName)
    {
        var theClass = objj_getClass(aName);
        return theClass.info & CLS_META ? theClass : theClass.isa;
    };
    objj_getProtocol =     function(aName)
    {
        return REGISTERED_PROTOCOLS[aName];
    };
    objj_getTypeDef =     function(aName)
    {
        return REGISTERED_TYPEDEFS[aName];
    };
    ivar_getName =     function(anIvar)
    {
        return anIvar.name;
    };
    ivar_getTypeEncoding =     function(anIvar)
    {
        return anIvar.type;
    };
    objj_msgSend =     function(aReceiver, aSelector)
    {
        if (aReceiver == nil)
            return aReceiver;
        var isa = aReceiver.isa;
        if (isa.init)
            _class_initialize(isa);
        var method = isa.method_dtable[aSelector];
        var implementation = method ? method.method_imp : _objj_forward;
        switch(arguments.length) {
            case 2:
                return implementation(aReceiver, aSelector);
            case 3:
                return implementation(aReceiver, aSelector, arguments[2]);
            case 4:
                return implementation(aReceiver, aSelector, arguments[2], arguments[3]);
            case 5:
                return implementation(aReceiver, aSelector, arguments[2], arguments[3], arguments[4]);
            case 6:
                return implementation(aReceiver, aSelector, arguments[2], arguments[3], arguments[4], arguments[5]);
            case 7:
                return implementation(aReceiver, aSelector, arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
        }
        return implementation.apply(aReceiver, arguments);
    };
    objj_msgSendSuper =     function(aSuper, aSelector)
    {
        var super_class = aSuper.super_class;
        arguments[0] = aSuper.receiver;
        if (!((super_class.info & CLS_META ? super_class : super_class.isa).info & CLS_INITIALIZED))
            _class_initialize(super_class);
        var implementation = super_class.method_dtable[aSelector] || _objj_forward;
;
        return implementation.apply(aSuper.receiver, arguments);
    };
    objj_msgSendSuper0 =     function(aSuper, aSelector)
    {
        return (aSuper.super_class.method_dtable[aSelector] || _objj_forward)(aSuper.receiver, aSelector);
    };
    objj_msgSendSuper1 =     function(aSuper, aSelector, arg0)
    {
        return (aSuper.super_class.method_dtable[aSelector] || _objj_forward)(aSuper.receiver, aSelector, arg0);
    };
    objj_msgSendSuper2 =     function(aSuper, aSelector, arg0, arg1)
    {
        return (aSuper.super_class.method_dtable[aSelector] || _objj_forward)(aSuper.receiver, aSelector, arg0, arg1);
    };
    objj_msgSendSuper3 =     function(aSuper, aSelector, arg0, arg1, arg2)
    {
        return (aSuper.super_class.method_dtable[aSelector] || _objj_forward)(aSuper.receiver, aSelector, arg0, arg1, arg2);
    };
    objj_msgSendFast =     function(aReceiver, aSelector)
    {
        return (this.method_dtable[aSelector] || _objj_forward).apply(aReceiver, arguments);
    };
    var objj_msgSendFastInitialize =     function(aReceiver, aSelector)
    {
        _class_initialize(this);
        return this.objj_msgSend.apply(this, arguments);
    };
    objj_msgSendFast0 =     function(aReceiver, aSelector)
    {
        return (this.method_dtable[aSelector] || _objj_forward)(aReceiver, aSelector);
    };
    var objj_msgSendFast0Initialize =     function(aReceiver, aSelector)
    {
        _class_initialize(this);
        return this.objj_msgSend0(aReceiver, aSelector);
    };
    objj_msgSendFast1 =     function(aReceiver, aSelector, arg0)
    {
        return (this.method_dtable[aSelector] || _objj_forward)(aReceiver, aSelector, arg0);
    };
    var objj_msgSendFast1Initialize =     function(aReceiver, aSelector, arg0)
    {
        _class_initialize(this);
        return this.objj_msgSend1(aReceiver, aSelector, arg0);
    };
    objj_msgSendFast2 =     function(aReceiver, aSelector, arg0, arg1)
    {
        return (this.method_dtable[aSelector] || _objj_forward)(aReceiver, aSelector, arg0, arg1);
    };
    var objj_msgSendFast2Initialize =     function(aReceiver, aSelector, arg0, arg1)
    {
        _class_initialize(this);
        return this.objj_msgSend2(aReceiver, aSelector, arg0, arg1);
    };
    objj_msgSendFast3 =     function(aReceiver, aSelector, arg0, arg1, arg2)
    {
        return (this.method_dtable[aSelector] || _objj_forward)(aReceiver, aSelector, arg0, arg1, arg2);
    };
    var objj_msgSendFast3Initialize =     function(aReceiver, aSelector, arg0, arg1, arg2)
    {
        _class_initialize(this);
        return this.objj_msgSend3(aReceiver, aSelector, arg0, arg1, arg2);
    };
    method_getName =     function(aMethod)
    {
        return aMethod.method_name;
    };
    method_copyReturnType =     function(aMethod)
    {
        var types = aMethod.method_types;
        if (types)
        {
            var argType = types[0];
            return argType != NULL ? argType : NULL;
        }
        else
            return NULL;
    };
    method_copyArgumentType =     function(aMethod, index)
    {
        switch(index) {
            case 0:
                return "id";
            case 1:
                return "SEL";
default:
                var types = aMethod.method_types;
                if (types)
                {
                    var argType = types[index - 1];
                    return argType != NULL ? argType : NULL;
                }
                else
                    return NULL;
        }
    };
    method_getNumberOfArguments =     function(aMethod)
    {
        var types = aMethod.method_types;
        return types ? types.length + 1 : (aMethod.method_name.match(/:/g) || []).length + 2;
    };
    method_getImplementation =     function(aMethod)
    {
        return aMethod.method_imp;
    };
    method_setImplementation =     function(aMethod, anImplementation)
    {
        var oldImplementation = aMethod.method_imp;
        aMethod.method_imp = anImplementation;
        return oldImplementation;
    };
    method_exchangeImplementations =     function(lhs, rhs)
    {
        var lhs_imp = method_getImplementation(lhs),
            rhs_imp = method_getImplementation(rhs);
        method_setImplementation(lhs, rhs_imp);
        method_setImplementation(rhs, lhs_imp);
    };
    sel_getName =     function(aSelector)
    {
        return aSelector ? aSelector : "<null selector>";
    };
    sel_getUid =     function(aName)
    {
        return aName;
    };
    sel_isEqual =     function(lhs, rhs)
    {
        return lhs === rhs;
    };
    sel_registerName =     function(aName)
    {
        return aName;
    };
    objj_class.prototype.toString = objj_object.prototype.toString =     function()
    {
        var isa = this.isa;
        if (class_getInstanceMethod(isa, SEL_description))
            return isa.objj_msgSend0(this, SEL_description);
        if (class_isMetaClass(isa))
            return this.name;
        return "[" + isa.name + " Object](-description not implemented)";
    };
    objj_class.prototype.objj_msgSend = objj_msgSendFastInitialize;
    objj_class.prototype.objj_msgSend0 = objj_msgSendFast0Initialize;
    objj_class.prototype.objj_msgSend1 = objj_msgSendFast1Initialize;
    objj_class.prototype.objj_msgSend2 = objj_msgSendFast2Initialize;
    objj_class.prototype.objj_msgSend3 = objj_msgSendFast3Initialize;
    objj_class.prototype.method_msgSend = Object.create(null);
    var SEL_description = sel_getUid("description"),
        SEL_forwardingTargetForSelector_ = sel_getUid("forwardingTargetForSelector:"),
        SEL_methodSignatureForSelector_ = sel_getUid("methodSignatureForSelector:"),
        SEL_forwardInvocation_ = sel_getUid("forwardInvocation:"),
        SEL_doesNotRecognizeSelector_ = sel_getUid("doesNotRecognizeSelector:"),
        SEL_invocationWithMethodSignature_ = sel_getUid("invocationWithMethodSignature:"),
        SEL_setTarget_ = sel_getUid("setTarget:"),
        SEL_setSelector_ = sel_getUid("setSelector:"),
        SEL_setArgument_atIndex_ = sel_getUid("setArgument:atIndex:"),
        SEL_returnValue = sel_getUid("returnValue");
    objj_eval =     function(aString)
    {
        var url = exports.pageURL;
        var asyncLoaderSaved = exports.asyncLoader;
        exports.asyncLoader = NO;
        var executable = exports.preprocess(aString, url, 0);
        if (!executable.hasLoadedFileDependencies())
            executable.loadFileDependencies();
        global._objj_eval_scope = {};
        global._objj_eval_scope.objj_executeFile = Executable.fileExecuterForURL(url);
        global._objj_eval_scope.objj_importFile = Executable.fileImporterForURL(url);
        var code = "with(_objj_eval_scope){" + executable._code + "\n//*/\n}";
        var result;
        result = eval(code);
        exports.asyncLoader = asyncLoaderSaved;
        return result;
    };
    exports.objj_eval = objj_eval;
    CPLogRegister(CPLogDefault);
    function objj_debug_object_format(aReceiver)
    {
        return aReceiver && aReceiver.isa ? exports.sprintf("<%s %#08x>", (aReceiver.info & CLS_META ? aReceiver : aReceiver.isa).name, aReceiver._UID) : String(aReceiver);
    }
    function objj_debug_message_format(aReceiver, aSelector)
    {
        return exports.sprintf("[%s %s]", objj_debug_object_format(aReceiver), aSelector);
    }
    var objj_msgSend_original = objj_msgSend,
        objj_msgSendSuper_original = objj_msgSendSuper,
        objj_msgSendFast_original = objj_msgSendFast,
        objj_msgSendFast0_original = objj_msgSendFast0,
        objj_msgSendFast1_original = objj_msgSendFast1,
        objj_msgSendFast2_original = objj_msgSendFast2,
        objj_msgSendFast3_original = objj_msgSendFast3;
    function objj_msgSend_reset_all_classes()
    {
        objj_enumerateClassesUsingBlock(        function(aClass)
        {
            if (aClass.hasOwnProperty("objj_msgSend"))
            {
                aClass.objj_msgSend = objj_msgSendFast;
                aClass.objj_msgSend0 = objj_msgSendFast0;
                aClass.objj_msgSend1 = objj_msgSendFast1;
                aClass.objj_msgSend2 = objj_msgSendFast2;
                aClass.objj_msgSend3 = objj_msgSendFast3;
            }
        });
    }
    objj_msgSend_reset =     function()
    {
        objj_msgSend = objj_msgSend_original;
        objj_msgSendSuper = objj_msgSendSuper_original;
        objj_msgSendFast = objj_msgSendFast_original;
        objj_msgSendFast0 = objj_msgSendFast0_original;
        objj_msgSendFast1 = objj_msgSendFast1_original;
        objj_msgSendFast2 = objj_msgSendFast2_original;
        objj_msgSendFast3 = objj_msgSendFast3_original;
        objj_msgSend_reset_all_classes();
    };
    objj_msgSend_decorate =     function()
    {
        var index = 0,
            count = arguments.length;
        for (; index < count; ++index)
        {
            objj_msgSend = arguments[index](objj_msgSend);
            objj_msgSendSuper = arguments[index](objj_msgSendSuper);
            objj_msgSendFast = arguments[index](objj_msgSendFast);
            objj_msgSendFast0 = arguments[index](objj_msgSendFast0);
            objj_msgSendFast1 = arguments[index](objj_msgSendFast1);
            objj_msgSendFast2 = arguments[index](objj_msgSendFast2);
            objj_msgSendFast3 = arguments[index](objj_msgSendFast3);
        }
        if (count)
            objj_msgSend_reset_all_classes();
    };
    objj_msgSend_set_decorators =     function()
    {
        objj_msgSend_reset();
        objj_msgSend_decorate.apply(NULL, arguments);
    };
    var objj_backtrace = [];
    objj_backtrace_print =     function(aStream)
    {
        var index = 0,
            count = objj_backtrace.length;
        for (; index < count; ++index)
        {
            var frame = objj_backtrace[index];
            aStream(objj_debug_message_format(frame.receiver, frame.selector));
        }
    };
    objj_backtrace_decorator =     function(msgSend)
    {
        return         function(aReceiverOrSuper, aSelector)
        {
            var aReceiver = aReceiverOrSuper && (aReceiverOrSuper.receiver || aReceiverOrSuper);
            objj_backtrace.push({receiver: aReceiver, selector: aSelector});
            try {
                return msgSend.apply(this, arguments);
            }
            catch(anException) {
                if (objj_backtrace.length)
                {
                    CPLog.warn("Exception " + anException + " in " + objj_debug_message_format(aReceiver, aSelector));
                    objj_backtrace_print(CPLog.warn);
                    objj_backtrace = [];
                }
                throw anException;
            }
            finally {
                objj_backtrace.pop();
            }
        };
    };
    objj_supress_exceptions_decorator =     function(msgSend)
    {
        return         function(aReceiverOrSuper, aSelector)
        {
            var aReceiver = aReceiverOrSuper && (aReceiverOrSuper.receiver || aReceiverOrSuper);
            try {
                return msgSend.apply(this, arguments);
            }
            catch(anException) {
                CPLog.warn("Exception " + anException + " in " + objj_debug_message_format(aReceiver, aSelector));
            }
        };
    };
    var objj_typechecks_reported = {},
        objj_typecheck_prints_backtrace = NO;
    objj_typecheck_decorator =     function(msgSend)
    {
        return         function(aReceiverOrSuper, aSelector)
        {
            var aReceiver = aReceiverOrSuper && (aReceiverOrSuper.receiver || aReceiverOrSuper);
            if (!aReceiver)
                return msgSend.apply(this, arguments);
            var types = aReceiver.isa.method_dtable[aSelector].method_types;
            for (var i = 2; i < arguments.length; i++)
            {
                try {
                    objj_debug_typecheck(types[i - 1], arguments[i]);
                }
                catch(e) {
                    var key = [(aReceiver.info & CLS_META ? aReceiver : aReceiver.isa).name, aSelector, i, e].join(";");
                    if (!objj_typechecks_reported[key])
                    {
                        objj_typechecks_reported[key] = YES;
                        CPLog.warn("Type check failed on argument " + (i - 2) + " of " + objj_debug_message_format(aReceiver, aSelector) + ": " + e);
                        if (objj_typecheck_prints_backtrace)
                            objj_backtrace_print(CPLog.warn);
                    }
                }
            }
            var result = msgSend.apply(NULL, arguments);
            try {
                objj_debug_typecheck(types[0], result);
            }
            catch(e) {
                var key = [(aReceiver.info & CLS_META ? aReceiver : aReceiver.isa).name, aSelector, "ret", e].join(";");
                if (!objj_typechecks_reported[key])
                {
                    objj_typechecks_reported[key] = YES;
                    CPLog.warn("Type check failed on return val of " + objj_debug_message_format(aReceiver, aSelector) + ": " + e);
                    if (objj_typecheck_prints_backtrace)
                        objj_backtrace_print(CPLog.warn);
                }
            }
            return result;
        };
    };
    objj_debug_typecheck =     function(expectedType, object)
    {
        var objjClass;
        if (!expectedType)
        {
            return;
        }
        else if (expectedType === "id")
        {
            if (object !== undefined)
                return;
        }
        else if (expectedType === "void")
        {
            if (object === undefined)
                return;
        }
        else if (objjClass = objj_getClass(expectedType))
        {
            if (object === nil)
            {
                return;
            }
            else if (object !== undefined && object.isa)
            {
                var theClass = object.isa;
                for (; theClass; theClass = theClass.super_class)
                    if (theClass === objjClass)
                        return;
            }
        }
        else
        {
            return;
        }
        var actualType;
        if (object === NULL)
            actualType = "null";
        else if (object === undefined)
            actualType = "void";
        else if (object.isa)
            actualType = (object.info & CLS_META ? object : object.isa).name;
        else
            actualType = typeof object;
        throw "expected=" + expectedType + ", actual=" + actualType;
    };
    enableCFURLCaching();
    var pageURL = new CFURL(window.location.href),
        DOMBaseElements = document.getElementsByTagName("base"),
        DOMBaseElementsCount = DOMBaseElements.length;
    if (DOMBaseElementsCount > 0)
    {
        var DOMBaseElement = DOMBaseElements[DOMBaseElementsCount - 1],
            DOMBaseElementHref = DOMBaseElement && DOMBaseElement.getAttribute("href");
        if (DOMBaseElementHref)
            pageURL = new CFURL(DOMBaseElementHref, pageURL);
    }
    if (typeof OBJJ_COMPILER_FLAGS !== 'undefined')
    {
        var flags = {};
        for (var i = 0; i < OBJJ_COMPILER_FLAGS.length; i++)
        {
            switch(OBJJ_COMPILER_FLAGS[i]) {
                case "IncludeDebugSymbols":
                    flags.includeMethodFunctionNames = true;
                    break;
                case "IncludeTypeSignatures":
                    flags.includeIvarTypeSignatures = true;
                    flags.includeMethodArgumentTypeSignatures = true;
                    break;
                case "InlineMsgSend":
                    flags.inlineMsgSendFunctions = true;
                    break;
                case "SourceMap":
                    flags.sourceMap = true;
                    break;
            }
        }
        FileExecutable.setCurrentCompilerFlags(flags);
    }
    var mainFileURL = new CFURL(window.OBJJ_MAIN_FILE || "main.j"),
        mainBundleURL = new CFURL(".", new CFURL(mainFileURL, pageURL)).absoluteURL(),
        assumedResolvedURL = new CFURL("..", mainBundleURL).absoluteURL();
    if (mainBundleURL === assumedResolvedURL)
        assumedResolvedURL = new CFURL(assumedResolvedURL.schemeAndAuthority());
    StaticResource.resourceAtURL(assumedResolvedURL, YES);
    exports.pageURL = pageURL;
    exports.bootstrap =     function()
    {
        resolveMainBundleURL();
    };
    function resolveMainBundleURL()
    {
        StaticResource.resolveResourceAtURL(mainBundleURL, YES,         function(aResource)
        {
            var includeURLs = StaticResource.includeURLs(),
                index = 0,
                count = includeURLs.length;
            for (; index < count; ++index)
                aResource.resourceAtURL(includeURLs[index], YES);
            Executable.fileImporterForURL(mainBundleURL)(mainFileURL.lastPathComponent(), YES,             function()
            {
                disableCFURLCaching();
                afterDocumentLoad(                function()
                {
                    var hashString = window.location.hash.substring(1),
                        args = [];
                    if (hashString.length)
                    {
                        args = hashString.split("/");
                        for (var i = 0, count = args.length; i < count; i++)
                            args[i] = decodeURIComponent(args[i]);
                    }
                    var namedArgsArray = window.location.search.substring(1).split("&"),
                        namedArgs = new CFMutableDictionary();
                    for (var i = 0, count = namedArgsArray.length; i < count; i++)
                    {
                        var thisArg = namedArgsArray[i].split("=");
                        if (!thisArg[0])
                            continue;
                        if (thisArg[1] == null)
                            thisArg[1] = true;
                        namedArgs.setValueForKey(decodeURIComponent(thisArg[0]), decodeURIComponent(thisArg[1]));
                    }
                    main(args, namedArgs);
                });
            });
        });
    }
    var documentLoaded = NO;
    function afterDocumentLoad(aFunction)
    {
        if (documentLoaded || document.readyState === "complete")
            return aFunction();
        if (window.addEventListener)
            window.addEventListener("load", aFunction, NO);
        else if (window.attachEvent)
            window.attachEvent("onload", aFunction);
    }
    afterDocumentLoad(    function()
    {
        documentLoaded = YES;
    });
    if (typeof OBJJ_AUTO_BOOTSTRAP === "undefined" || OBJJ_AUTO_BOOTSTRAP)
        exports.bootstrap();
    function makeAbsoluteURL(aURL)
    {
        if (aURL instanceof CFURL && aURL.scheme())
            return aURL;
        return new CFURL(aURL, mainBundleURL);
    }
    objj_importFile = Executable.fileImporterForURL(mainBundleURL);
    objj_executeFile = Executable.fileExecuterForURL(mainBundleURL);
    objj_import =     function()
    {
        CPLog.warn("objj_import is deprecated, use objj_importFile instead");
        objj_importFile.apply(this, arguments);
    };
})(window, ObjectiveJ);
