import * as math from 'mathjs';

/**
 * Safely evaluates a math expression without crashing.
 * @param {string} expr 
 * @param {boolean} isDegree 
 * @returns {{ result: string, error: boolean }}
 */
export const evaluateExpression = (expr, isDegree = true) => {
  if (!expr || typeof expr !== 'string') return { result: '', error: false };
  
  try {
    // Sanitize UI specific operators and percentage logic
    let sanitizedExpr = expr
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/−/g, '-');
      
    // Handle edge case of standalone percentage or basic string
    if (/^[\d.]+$/.test(sanitizedExpr)) {
      return { result: sanitizedExpr, error: false };
    }

    const scope = {};
    
    // Fix native log parsing (mathjs natively treats log as ln, but UI users expect log = base10)
    sanitizedExpr = sanitizedExpr.replace(/\blog\(/g, 'log10(');
    sanitizedExpr = sanitizedExpr.replace(/\bln\(/g, 'log(');
    
    // Cube root mapping
    sanitizedExpr = sanitizedExpr.replace(/∛\(/g, 'cbrt(');
    sanitizedExpr = sanitizedExpr.replace(/∛(\d+(\.\d+)?)/g, 'cbrt($1)');

    if (isDegree) {
      sanitizedExpr = sanitizedExpr.replace(/\bsin\(/g, 'sinDeg(');
      sanitizedExpr = sanitizedExpr.replace(/\bcos\(/g, 'cosDeg(');
      sanitizedExpr = sanitizedExpr.replace(/\btan\(/g, 'tanDeg(');
      scope.sinDeg = (x) => math.sin(math.unit(x, 'deg'));
      scope.cosDeg = (x) => math.cos(math.unit(x, 'deg'));
      scope.tanDeg = (x) => math.tan(math.unit(x, 'deg'));
    }

    // Add safe handling for log/ln edge cases (prevent negative logs crashing natively if not caught)
    const res = math.evaluate(sanitizedExpr, scope);

    if (typeof res === 'object' && res.re !== undefined) {
        // Complex number (e.g., sqrt(-1)) - can reject for basic calculator
        return { result: "Error", error: true }; 
    }
    
    if (typeof res === 'function') {
      return { result: "", error: false };
    }

    if (!isFinite(res) || isNaN(res)) {
      // Divide by zero or infinity
      return { result: "Error", error: true };
    }
    
    // Clean float imprecision (e.g. 0.1 + 0.2 = 0.3)
    const cleanRes = Number(math.format(res, { precision: 14 }));
    return { result: String(cleanRes), error: false };

  } catch (err) {
    // If syntax is invalid (e.g., "5+"), return empty string so UI doesn't crash
    // and just waits for more input
    return { result: "", error: false };
  }
};
