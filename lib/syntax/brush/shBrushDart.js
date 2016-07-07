// Dart Brush is based on the shBrushJava.js
;(function()
{
	// CommonJS
	typeof(require) != 'undefined' ? SyntaxHighlighter = require('shCore').SyntaxHighlighter : null;

	function Brush()
	{
		var keywords =	'abstract assert bool break case catch class const ' +
						'continue default do double else enum extends ' +
						'false final finally float for if implements import ' +
						'instanceof int interface native new null ' +
						'return ' +
						'static super switch this throw true ' +
						'try void while get set';

		this.regexList = [
			{ regex: SyntaxHighlighter.regexLib.singleLineCComments,	css: 'comments' },		// one line comments
			{ regex: /\/\*([^\*][\s\S]*)?\*\//gm,						css: 'comments' },	 	// multiline comments
			{ regex: /\/\*(?!\*\/)\*[\s\S]*?\*\//gm,					css: 'preprocessor' },	// documentation comments
			{ regex: SyntaxHighlighter.regexLib.doubleQuotedString,		css: 'string' },		// strings
			{ regex: SyntaxHighlighter.regexLib.singleQuotedString,		css: 'string' },		// strings
			{ regex: /\b([\d]+(\.[\d]+)?|0x[a-f0-9]+)\b/gi,				css: 'value' },			// numbers
			{ regex: /\@[\$\w]+\b/g,					css: 'color1' },		// annotation @anno
			{ regex: new RegExp(this.getKeywords(keywords), 'gm'),		css: 'keyword' }		// Dart keyword
			];

		this.forHtmlScript({
			left	: /(&lt;|<)%[@!=]?/g,
			right	: /%(&gt;|>)/g
		});
	};

	Brush.prototype	= new SyntaxHighlighter.Highlighter();
	Brush.aliases	= ['dart'];

	SyntaxHighlighter.brushes.Dart = Brush;

	// CommonJS
	typeof(exports) != 'undefined' ? exports.Brush = Brush : null;
})();
