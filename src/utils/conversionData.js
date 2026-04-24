export const CATEGORY_DATA = {
  Length: {
    icon: "Ruler",
    units: { mm: 0.001, cm: 0.01, m: 1, km: 1000, inch: 0.0254, foot: 0.3048, yard: 0.9144, mile: 1609.34 }
  },
  Area: {
    icon: "Maximize",
    units: { "sq mm": 0.000001, "sq cm": 0.0001, "sq m": 1, hectare: 10000, acre: 4046.86, "sq km": 1000000, "sq ft": 0.092903 }
  },
  Volume: {
    icon: "Cylinder",
    units: { ml: 0.001, liter: 1, "cubic meter": 1000, gallon: 3.78541, pint: 0.473176 }
  },
  Mass: {
    icon: "Scale",
    units: { mg: 0.000001, g: 0.001, kg: 1, ton: 1000, pound: 0.453592, ounce: 0.0283495 }
  },
  Speed: {
    icon: "Gauge",
    units: { "m/s": 1, "km/h": 0.277778, mph: 0.44704, knot: 0.514444 }
  },
  Time: {
    icon: "Clock",
    units: { ms: 1 / 60000, second: 1 / 60, minute: 1, hour: 60, day: 1440, week: 10080 }
  },
  Temperature: {
    icon: "Thermometer",
    custom: true,
    units: ["Celsius", "Fahrenheit", "Kelvin"]
  },
  Binary: {
    icon: "Binary",
    custom: true,
    units: ["Decimal", "Binary", "Octal", "Hexadecimal"]
  },
  Currency: {
    icon: "Banknote",
    custom: true,
    units: ["USD", "EUR", "GBP", "JPY", "CAD", "AUD", "INR"]
  },
  Storage: {
    icon: "HardDrive",
    units: { bit: 0.125, byte: 1, KB: 1024, MB: 1048576, GB: 1073741824, TB: 1099511627776 }
  },
  Fuel: {
    icon: "Fuel",
    custom: true,
    units: ["l/100km", "km/l", "mpg (US)", "mpg (UK)"]
  },
  Cooking: {
    icon: "Utensils",
    units: { ml: 1, teaspoon: 4.92892, tablespoon: 14.7868, cup: 240, liter: 1000 }
  },
  Prefix: {
    icon: "Superscript",
    units: { micro: 1e-6, milli: 1e-3, centi: 1e-2, deci: 1e-1, none: 1, deca: 1e1, hecto: 1e2, kilo: 1e3, mega: 1e6 }
  },
  "Food Calories": {
    icon: "Flame",
    units: { Joule: 1, calorie: 4.184, "kcal (Calorie)": 4184, kJ: 1000 }
  },
  "Time Zones": {
    icon: "Globe",
    custom: true,
    units: ["UTC", "EST (US)", "PST (US)", "GMT (UK)", "CET (EU)", "IST (IN)", "JST (JP)", "AEST (AU)"]
  },
  "Yarn Density": {
    icon: "Pencil",
    units: { "kg/m": 1, tex: 1e-6, denier: 1.1111e-7 }
  },
  Angle: {
    icon: "Circle",
    units: { degree: 1, radian: 57.2957795, gradian: 0.9, arcminute: 1 / 60, arcsecond: 1 / 3600 }
  },
  Pressure: {
    icon: "Wind",
    units: { pascal: 1, bar: 100000, psi: 6894.76, atm: 101325, torr: 133.322 }
  },
  Force: {
    icon: "Dumbbell",
    units: { newton: 1, dyne: 0.00001, "pound-force": 4.44822, "kilogram-force": 9.80665 }
  },
  Torque: {
    icon: "Wrench",
    units: { "Nm": 1, "lb-ft": 1.35582, "kg-m": 9.80665 }
  },
  Sound: {
    icon: "Volume2",
    units: { decibel: 1, bel: 10, neper: 8.68589 }
  },
  Density: {
    icon: "Droplet",
    units: { "kg/m³": 1, "g/cm³": 1000, "lb/ft³": 16.0185 }
  },
  "Heat Capacity": {
    icon: "Flame",
    units: { "J/K": 1, "kJ/K": 1000, "cal/K": 4.184, "kcal/K": 4184 }
  },
  "Heat Density": {
    icon: "Sun",
    units: { "J/m²": 1, "kJ/m²": 1000, "MJ/m²": 1000000 }
  },
  "Current Density": {
    icon: "Zap",
    units: { "A/m²": 1, "A/cm²": 10000, "mA/cm²": 10 }
  },
  "Angular Velocity": {
    icon: "RefreshCw",
    units: { "rad/s": 1, "rpm": 0.10472, "deg/s": 0.0174533 }
  },
  "Cooling Capacity": {
    icon: "Snowflake",
    units: { "Watt": 1, "BTU/h": 0.293071, "Ton": 3516.85 }
  },
  "Air Flow": {
    icon: "Wind",
    units: { "m³/s": 1, "CFM": 0.000471947, "l/s": 0.001, "ft³/s": 0.0283168, "m³/h": 0.000277778 }
  },
  "Inertia": {
    icon: "RotateCw",
    units: { "kg·m²": 1, "kg·cm²": 0.0001, "g·cm²": 1e-7, "lb·ft²": 0.0421401, "lb·in²": 0.000292639 }
  },
  "Acceleration": {
    icon: "TrendingUp",
    units: { "m/s²": 1, "cm/s²": 0.01, "g": 9.80665, "ft/s²": 0.3048, "in/s²": 0.0254 }
  },
  "Specific Volume": {
    icon: "Maximize",
    units: { "m³/kg": 1, "cm³/g": 0.001, "l/kg": 0.001, "ft³/lb": 0.06242796, "gal/lb": 0.0083454 }
  },
  "Lumber Volume": {
    icon: "Box",
    units: { "board foot": 1, "cubic meter": 423.776, "cubic foot": 12, "cord": 1536, "cubic inch": 0.00694444 }
  },
  "Astronomical Units": {
    icon: "Globe",
    units: { "light-year": 1, "parsec": 3.26156, "AU": 0.0000158125, "light-month": 0.0833333, "light-day": 0.0027379 }
  },
  "Permittivity": {
    icon: "Zap",
    units: { "F/m": 1, "pF/m": 1e-12, "nF/m": 1e-9, "uF/m": 1e-6, "F/cm": 100 }
  },
  "Viscosity": {
    icon: "Droplets",
    units: { "Pa·s": 1, "poise": 0.1, "centipoise": 0.001, "kg/(m·s)": 1, "lb/(ft·s)": 1.48816 }
  },
  "Concentration": {
    icon: "FlaskConical",
    units: { "mol/m³": 1, "mol/L": 1000, "g/L": 1000, "mg/L": 1, "ug/L": 0.001 }
  },
  "Permeability": {
    icon: "Layers",
    units: { "H/m": 1, "uH/m": 1e-6, "nH/m": 1e-9, "Wb/(A·m)": 1, "N/A²": 1 }
  },
  "Surface Tension": {
    icon: "Activity",
    units: { "N/m": 1, "mN/m": 0.001, "dyn/cm": 0.001, "lb/ft": 14.5939, "lb/in": 175.1268 }
  },
  "Water Hardness": {
    icon: "Droplet",
    units: { "mg/L (ppm)": 1, "Clark degree": 14.254, "French degree": 10, "German degree": 17.848, "mmol/L": 100.0869 }
  },
  "Power": {
    icon: "Zap",
    units: { "W": 1, "kW": 1000, "HP": 745.699, "MW": 1e6, "BTU/h": 0.293071 }
  },
  "Current": {
    icon: "Activity",
    units: { "A": 1, "mA": 0.001, "uA": 1e-6, "kA": 1000, "statA": 3.33564e-10 }
  },
  "Energy": {
    icon: "Flame",
    units: { "J": 1, "kJ": 1000, "cal": 4.184, "kcal": 4184, "kWh": 3600000 }
  },
  "Resistance": {
    icon: "Zap",
    units: { "ohm": 1, "kiloohm": 1000, "megaohm": 1e6, "milliohm": 0.001, "microohm": 1e-6 }
  },
  "Capacitance": {
    icon: "Box",
    units: { "F": 1, "mF": 0.001, "uF": 1e-6, "nF": 1e-9, "pF": 1e-12 }
  },
  "Conductance": {
    icon: "Activity",
    units: { "S": 1, "mS": 0.001, "uS": 1e-6, "Mho": 1, "kMho": 1000 }
  },
  "Inductance": {
    icon: "Layers",
    units: { "H": 1, "mH": 0.001, "uH": 1e-6, "nH": 1e-9, "abhenry": 1e-9 }
  },
  "Charge": {
    icon: "Zap",
    units: { "C": 1, "mC": 0.001, "uC": 1e-6, "nC": 1e-9, "Ah": 3600 }
  },
  "Conductivity": {
    icon: "Activity",
    units: { "S/m": 1, "mS/cm": 0.1, "uS/cm": 0.0001, "S/cm": 100, "Mho/m": 1 }
  },
  "Potential": {
    icon: "Zap",
    units: { "V": 1, "mV": 0.001, "kV": 1000, "uV": 1e-6, "MV": 1e6 }
  },
  "Resistivity": {
    icon: "Layers",
    units: { "ohm·m": 1, "ohm·cm": 0.01, "kiloohm·m": 1000, "microohm·cm": 1e-8, "ohm·in": 0.0254 }
  },
  "Field Strength": {
    icon: "Activity",
    units: { "V/m": 1, "V/cm": 100, "kV/m": 1000, "mV/m": 0.001, "uV/m": 1e-6 }
  },
  "Linear Charge": {
    icon: "Activity",
    units: { "C/m": 1, "mC/m": 0.001, "uC/m": 1e-6, "nC/m": 1e-9, "pC/m": 1e-12 }
  },
  "Surface Charge": {
    icon: "Layout",
    units: { "C/m²": 1, "mC/m²": 0.001, "uC/m²": 1e-6, "nC/m²": 1e-9, "pC/m²": 1e-12 }
  },
  "Volume Charge": {
    icon: "Box",
    units: { "C/m³": 1, "mC/m³": 0.001, "uC/m³": 1e-6, "nC/m³": 1e-9, "pC/m³": 1e-12 }
  },
  "Computer Resolution": {
    icon: "Monitor",
    units: { "px/in (PPI)": 1, "px/cm": 2.54, "dots/in (DPI)": 1, "dots/cm": 2.54, "twip": 0.0006944 }
  },
  "Computer Data Rate": {
    icon: "Wifi",
    units: { "bps": 1, "kbps": 1000, "Mbps": 1e6, "Gbps": 1e9, "B/s": 8 }
  },
  "Light Frequency": {
    icon: "Radio",
    units: { "THz": 1, "GHz": 0.001, "MHz": 1e-6, "PHz": 1000, "Hz": 1e-12 }
  },
  "Light Luminance": {
    icon: "Sun",
    units: { "cd/m²": 1, "nit": 1, "stilb": 10000, "lambert": 3183.0988, "foot-lambert": 3.426259 }
  },
  "Light Illumination": {
    icon: "Sun",
    units: { "lux": 1, "phot": 10000, "foot-candle": 10.7639, "lumen/m²": 1, "watt/cm²": 10000 }
  },
  "Light Luminous": {
    icon: "Sun",
    units: { "lumen": 1, "candlepower": 12.56637, "millilumen": 0.001, "microlumen": 1e-6, "kilolumen": 1000 }
  },
  "Magnet": {
    icon: "Magnet",
    units: { "A/m": 1, "Oersted": 79.57747, "kA/m": 1000, "statamp/cm": 299792.458, "gilbert/cm": 79.57747 }
  },
  "Flux Density": {
    icon: "Magnet",
    units: { "Tesla": 1, "Gauss": 0.0001, "Weber/m²": 1, "Maxwell/cm²": 0.0001, "gamma": 1e-9 }
  },
  "Radiation": {
    icon: "Activity",
    units: { "Gy": 1, "rad": 0.01, "rem": 0.01, "Sievert": 1, "mSv": 0.001 }
  },
  "Activity": {
    icon: "Activity",
    units: { "Bq": 1, "Ci": 3.7e10, "mCi": 3.7e7, "uCi": 37000, "Rutherford": 1000000 }
  },
  "Absorption": {
    icon: "Activity",
    units: { "Gy": 1, "rad": 0.01, "mGy": 0.001, "uGy": 1e-6, "cGy": 0.01 }
  },
  "Exposure": {
    icon: "Activity",
    units: { "C/kg": 1, "Roentgen": 0.000258, "mR": 2.58e-7, "uR": 2.58e-10, "statC/kg": 3.33564e-10 }
  }
};

export const formatConversionResult = (res) => {
  if (res === '' || isNaN(res) || !isFinite(res)) return '';
  const fixed = Number(Number(res).toFixed(4));
  return String(fixed);
};

export const performConversion = (category, value, fromUnit, toUnit, currencyRates = null) => {
  if (value === '' || value === null || value === undefined) return '';

  if (category === "Binary") {
    const baseMap = { Decimal: 10, Binary: 2, Octal: 8, Hexadecimal: 16 };
    const decVal = parseInt(String(value), baseMap[fromUnit]);
    if (isNaN(decVal)) return '';
    return decVal.toString(baseMap[toUnit]).toUpperCase();
  }

  const numValue = Number(value);
  if (isNaN(numValue)) return '';

  if (category === "Temperature") {
    let c = 0;
    if (fromUnit === "Celsius") c = numValue;
    else if (fromUnit === "Fahrenheit") c = (numValue - 32) * 5 / 9;
    else if (fromUnit === "Kelvin") c = numValue - 273.15;

    let result = 0;
    if (toUnit === "Celsius") result = c;
    else if (toUnit === "Fahrenheit") result = (c * 9 / 5) + 32;
    else if (toUnit === "Kelvin") result = c + 273.15;
    return result;
  }

  if (category === "Time Zones") {
    // Offset from UTC in hours
    const offsets = {
      "UTC": 0, "GMT (UK)": 0, "CET (EU)": 1, "IST (IN)": 5.5,
      "JST (JP)": 9, "AEST (AU)": 10, "EST (US)": -5, "PST (US)": -8
    };
    // Convert to UTC first, then to target
    // Example: 14:00 (represented as 14.0)
    const inUTC = numValue - offsets[fromUnit];
    let res = inUTC + offsets[toUnit];
    // Keep it within 24h wraps
    while (res >= 24) res -= 24;
    while (res < 0) res += 24;
    return res;
  }

  if (category === "Fuel") {
    // It's heavily nonlinear/inverse. We base it to l/100km
    let lPer100 = 0;
    if (fromUnit === "l/100km") lPer100 = numValue;
    else if (fromUnit === "km/l") lPer100 = (numValue === 0) ? 0 : 100 / numValue;
    else if (fromUnit === "mpg (US)") lPer100 = (numValue === 0) ? 0 : 235.215 / numValue;
    else if (fromUnit === "mpg (UK)") lPer100 = (numValue === 0) ? 0 : 282.481 / numValue;

    if (toUnit === "l/100km") return lPer100;
    if (toUnit === "km/l") return (lPer100 === 0) ? 0 : 100 / lPer100;
    if (toUnit === "mpg (US)") return (lPer100 === 0) ? 0 : 235.215 / lPer100;
    if (toUnit === "mpg (UK)") return (lPer100 === 0) ? 0 : 282.481 / lPer100;
  }

  if (category === "Currency" && currencyRates) {
    const fromRate = currencyRates[fromUnit];
    const toRate = currencyRates[toUnit];
    if (fromRate && toRate) {
      const inUSD = numValue / fromRate;
      return inUSD * toRate;
    }
    return '';
  }

  // Generic Base multiplier logic
  const factors = CATEGORY_DATA[category]?.units;
  if (!factors) return '';

  const valueInBase = numValue * factors[fromUnit];
  return valueInBase / factors[toUnit];
};
