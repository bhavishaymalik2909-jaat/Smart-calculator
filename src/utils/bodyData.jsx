export const BODY_TOOLS = {
    "BMI Calculator": {
        icon: "Activity",
        inputs: [
            { name: "weight", label: "Weight", suffix: "kg" },
            { name: "height", label: "Height", suffix: "cm" }
        ],
        calculate: (v) => {
            const w = Number(v.weight);
            const h = Number(v.height) / 100;
            if (!w || !h) return null;
            const bmi = w / (h * h);
            
            let cat = "Normal weight";
            let color = "text-green-400";
            if (bmi < 18.5) { cat = "Underweight"; color = "text-blue-400"; }
            else if (bmi >= 25 && bmi < 30) { cat = "Overweight"; color = "text-orange-400"; }
            else if (bmi >= 30) { cat = "Obese"; color = "text-red-500"; }
            
            return { bmi, cat, color };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
               <span className="text-sm font-semibold tracking-widest text-[#7C3AED] uppercase">Body Mass Index</span>
               <span className="text-6xl font-bold tracking-tighter text-[#7C3AED]">{res.bmi.toFixed(1)}</span>
               <div className="flex justify-end gap-2 mt-2">
                   <div className={`px-4 py-1.5 rounded-full bg-white dark:bg-[#1A1A1A] font-bold text-sm tracking-wide ${res.color}`}>
                       {res.cat}
                   </div>
               </div>
            </div>
        )
    },
    "BMR Calculator": {
        icon: "Flame",
        inputs: [
            { name: "weight", label: "Weight", suffix: "kg" },
            { name: "height", label: "Height", suffix: "cm" },
            { name: "age", label: "Age", suffix: "years" },
            { name: "gender", label: "Gender (1 = Male, 2 = Female)", placeholder: "1 or 2" }
        ],
        calculate: (v) => {
            const w = Number(v.weight);
            const h = Number(v.height);
            const a = Number(v.age);
            const g = Number(v.gender);
            if (!w || !h || !a || (g !== 1 && g !== 2)) return null;
            
            // Mifflin-St Jeor
            let bmr = (10 * w) + (6.25 * h) - (5 * a);
            if (g === 1) bmr += 5; // Male
            else bmr -= 161; // Female
            
            return { bmr };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
               <span className="text-xs font-semibold tracking-widest text-[#7C3AED] uppercase">Basal Metabolic Rate</span>
               <span className="text-5xl font-bold tracking-tighter text-[#7C3AED]">{res.bmr.toFixed(0)} <span className="text-lg">kcal/day</span></span>
               <p className="text-gray-500 dark:text-gray-400 text-xs mt-2 font-medium">Calories burned at complete rest.</p>
            </div>
        )
    },
    "Body Fat %": {
        icon: "Droplets",
        inputs: [
            { name: "bmi", label: "Current BMI", placeholder: "e.g., 22.5" },
            { name: "age", label: "Age", suffix: "years" },
            { name: "gender", label: "Gender (1 = Male, 2 = Female)" }
        ],
        calculate: (v) => {
            const bmi = Number(v.bmi);
            const a = Number(v.age);
            const g = Number(v.gender);
            if (!bmi || !a || (g !== 1 && g !== 2)) return null;
            
            // Adult body fat formula
            let bf = (1.20 * bmi) + (0.23 * a) - 5.4;
            if (g === 1) bf -= 10.8; 
            
            return { bf };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
               <span className="text-sm font-semibold tracking-widest text-[#7C3AED] uppercase">Estimated Body Fat</span>
               <span className="text-5xl font-bold tracking-tighter text-[#7C3AED]">{res.bf.toFixed(1)}%</span>
            </div>
        )
    },
    "Age Calculator": {
        icon: "Calendar",
        inputs: [
            { name: "year", label: "Birth Year (YYYY)" },
            { name: "month", label: "Birth Month (1-12)" },
            { name: "day", label: "Birth Day (1-31)" }
        ],
        calculate: (v) => {
            const y = Number(v.year);
            const m = Number(v.month);
            const d = Number(v.day);
            if (!y || !m || !d || y < 1900 || m > 12 || d > 31) return null;
            
            const birthDate = new Date(y, m - 1, d);
            const today = new Date();
            
            if (birthDate > today) return null; // Prevent future dates
            
            let years = today.getFullYear() - birthDate.getFullYear();
            let months = today.getMonth() - birthDate.getMonth();
            let days = today.getDate() - birthDate.getDate();

            if (days < 0) {
                months--;
                const prevMonthDays = new Date(today.getFullYear(), today.getMonth(), 0).getDate();
                days += prevMonthDays;
            }

            if (months < 0) {
                years--;
                months += 12;
            }
            
            const diffTime = Math.abs(today - birthDate);
            const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
            
            return { years, months, days, totalDays: diffDays };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
               <span className="text-sm font-semibold tracking-widest text-[#7C3AED] uppercase">exact age</span>
               <div className="flex items-baseline justify-end flex-wrap mt-1">
                   <span className="text-gray-500 mr-2 text-lg">You are</span>
                   <span className="text-5xl font-bold tracking-tighter text-[#7C3AED] leading-none">{res.years}</span>
                   <span className="text-lg font-medium text-gray-500 mx-1.5">years,</span>
                   <span className="text-3xl font-bold tracking-tight text-[#7C3AED] leading-none">{res.months}</span>
                   <span className="text-lg font-medium text-gray-500 mx-1.5">months,</span>
                   <span className="text-3xl font-bold tracking-tight text-[#7C3AED] leading-none">{res.days}</span>
                   <span className="text-lg font-medium text-gray-500 ml-1.5">days</span>
               </div>
               <div className="h-px bg-[#7C3AED]/20 my-2" />
               <div className="flex justify-between items-center text-[15px]">
                  <span className="text-gray-500 font-medium tracking-wide">Total Days Alive:</span>
                  <span className="font-bold text-[#7C3AED]">{res.totalDays.toLocaleString()} days</span>
               </div>
            </div>
        )
    },
    "Period / Cycle": {
        icon: "Heart",
        inputs: [
            { name: "lastDate", label: "Last Period Date", type: "date" },
            { name: "cycle", label: "Cycle Length (Days)", placeholder: "e.g., 28" }
        ],
        calculate: (v) => {
            if (!v.lastDate || !v.cycle) return null;
            const cycleDays = Number(v.cycle);
            if (cycleDays <= 0 || isNaN(cycleDays)) return null;
            
            const last = new Date(v.lastDate);
            if (isNaN(last.getTime())) return null;

            const next = new Date(last.getTime() + (cycleDays * 24 * 60 * 60 * 1000));
            const formatOpt = { weekday: 'short', month: 'short', day: 'numeric' };
            
            return { nextDate: next.toLocaleDateString(undefined, formatOpt) };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
               <span className="text-sm font-semibold tracking-widest text-[#7C3AED] uppercase">Next Expected Date</span>
               <span className="text-4xl font-bold tracking-tighter text-[#7C3AED]">{res.nextDate}</span>
            </div>
        )
    },
    Albumin: {
        icon: "Activity",
        inputs: [{ name: "level", label: "Albumin Level", suffix: "g/dL" }],
        calculate: (v) => {
            const l = Number(v.level);
            if (!l) return null;
            let status = "Normal"; let color = "text-green-500";
            if (l < 3.4) { status = "Low"; color = "text-yellow-500"; }
            else if (l > 5.4) { status = "High"; color = "text-red-500"; }
            return { status, color, l };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
               <span className="text-sm font-semibold tracking-widest text-[#7C3AED] uppercase">Albumin Level</span>
               <span className={`text-4xl font-bold tracking-tighter ${res.color}`}>{res.status}</span>
               <div className="text-gray-500 text-xs mt-1">Ref: 3.4 - 5.4 g/dL</div>
            </div>
        )
    },
    Calcium: {
        icon: "Activity",
        inputs: [{ name: "level", label: "Calcium Level", suffix: "mg/dL" }],
        calculate: (v) => {
            const l = Number(v.level);
            if (!l) return null;
            let status = "Normal"; let color = "text-green-500";
            if (l < 8.5) { status = "Low"; color = "text-yellow-500"; }
            else if (l > 10.2) { status = "High"; color = "text-red-500"; }
            return { status, color, l };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
               <span className="text-sm font-semibold tracking-widest text-[#7C3AED] uppercase">Calcium Level</span>
               <span className={`text-4xl font-bold tracking-tighter ${res.color}`}>{res.status}</span>
               <div className="text-gray-500 text-xs mt-1">Ref: 8.5 - 10.2 mg/dL</div>
            </div>
        )
    },
    Cholesterol: {
        icon: "Activity",
        inputs: [{ name: "level", label: "Total Cholesterol", suffix: "mg/dL" }],
        calculate: (v) => {
            const l = Number(v.level);
            if (!l) return null;
            let status = "Normal"; let color = "text-green-500";
            if (l >= 200 && l <= 239) { status = "Borderline High"; color = "text-yellow-500"; }
            else if (l >= 240) { status = "High"; color = "text-red-500"; }
            return { status, color, l };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
               <span className="text-sm font-semibold tracking-widest text-[#7C3AED] uppercase">Cholesterol</span>
               <span className={`text-4xl font-bold tracking-tighter ${res.color}`}>{res.status}</span>
               <div className="text-gray-500 text-xs mt-1">Ref: &lt; 200 mg/dL</div>
            </div>
        )
    },
    Creatinine: {
        icon: "Activity",
        inputs: [
            { name: "level", label: "Creatinine", suffix: "mg/dL" },
            { name: "gender", label: "Gender (1 = Male, 2 = Female)" }
        ],
        calculate: (v) => {
            const l = Number(v.level);
            const g = Number(v.gender);
            if (!l || (g !== 1 && g !== 2)) return null;
            let status = "Normal"; let color = "text-green-500";
            const min = g === 1 ? 0.74 : 0.59;
            const max = g === 1 ? 1.35 : 1.04;
            if (l < min) { status = "Low"; color = "text-yellow-500"; }
            else if (l > max) { status = "High"; color = "text-red-500"; }
            return { status, color, l, min, max };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
               <span className="text-sm font-semibold tracking-widest text-[#7C3AED] uppercase">Creatinine</span>
               <span className={`text-4xl font-bold tracking-tighter ${res.color}`}>{res.status}</span>
               <div className="text-gray-500 text-xs mt-1">Ref: {res.min} - {res.max} mg/dL</div>
            </div>
        )
    },
    Ferritin: {
        icon: "Activity",
        inputs: [
            { name: "level", label: "Ferritin", suffix: "mcg/L" },
            { name: "gender", label: "Gender (1 = Male, 2 = Female)" }
        ],
        calculate: (v) => {
            const l = Number(v.level);
            const g = Number(v.gender);
            if (!l || (g !== 1 && g !== 2)) return null;
            let status = "Normal"; let color = "text-green-500";
            const min = g === 1 ? 24 : 11;
            const max = g === 1 ? 336 : 307;
            if (l < min) { status = "Low"; color = "text-yellow-500"; }
            else if (l > max) { status = "High"; color = "text-red-500"; }
            return { status, color, l, min, max };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
               <span className="text-sm font-semibold tracking-widest text-[#7C3AED] uppercase">Ferritin</span>
               <span className={`text-4xl font-bold tracking-tighter ${res.color}`}>{res.status}</span>
               <div className="text-gray-500 text-xs mt-1">Ref: {res.min} - {res.max} mcg/L</div>
            </div>
        )
    },
    Enzymes: {
        icon: "Activity",
        inputs: [{ name: "level", label: "ALT / SGPT Enzyme", suffix: "U/L" }],
        calculate: (v) => {
            const l = Number(v.level);
            if (!l) return null;
            let status = "Normal"; let color = "text-green-500";
            if (l < 7) { status = "Low"; color = "text-yellow-500"; }
            else if (l > 55) { status = "High"; color = "text-red-500"; }
            return { status, color, l };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
               <span className="text-sm font-semibold tracking-widest text-[#7C3AED] uppercase">ALT Level</span>
               <span className={`text-4xl font-bold tracking-tighter ${res.color}`}>{res.status}</span>
               <div className="text-gray-500 text-xs mt-1">Ref: 7 - 55 U/L</div>
            </div>
        )
    },
    Glucose: {
        icon: "Activity",
        inputs: [{ name: "level", label: "Fasting Glucose", suffix: "mg/dL" }],
        calculate: (v) => {
            const l = Number(v.level);
            if (!l) return null;
            let status = "Normal"; let color = "text-green-500";
            if (l < 70) { status = "Low (Hypoglycemia)"; color = "text-yellow-500"; }
            else if (l > 99 && l <= 125) { status = "Prediabetes"; color = "text-orange-500"; }
            else if (l > 125) { status = "Diabetes"; color = "text-red-500"; }
            return { status, color, l };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
               <span className="text-sm font-semibold tracking-widest text-[#7C3AED] uppercase">Fasting Glucose</span>
               <span className={`text-4xl font-bold tracking-tighter ${res.color}`}>{res.status}</span>
               <div className="text-gray-500 text-xs mt-1">Ref: 70 - 99 mg/dL</div>
            </div>
        )
    },
    Hemoglobin: {
        icon: "Activity",
        inputs: [
            { name: "level", label: "Hemoglobin", suffix: "g/dL" },
            { name: "gender", label: "Gender (1 = Male, 2 = Female)" }
        ],
        calculate: (v) => {
            const l = Number(v.level);
            const g = Number(v.gender);
            if (!l || (g !== 1 && g !== 2)) return null;
            let status = "Normal"; let color = "text-green-500";
            const min = g === 1 ? 13.8 : 12.1;
            const max = g === 1 ? 17.2 : 15.1;
            if (l < min) { status = "Low (Anemia)"; color = "text-yellow-500"; }
            else if (l > max) { status = "High"; color = "text-red-500"; }
            return { status, color, l, min, max };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
               <span className="text-sm font-semibold tracking-widest text-[#7C3AED] uppercase">Hemoglobin</span>
               <span className={`text-4xl font-bold tracking-tighter ${res.color}`}>{res.status}</span>
               <div className="text-gray-500 text-xs mt-1">Ref: {res.min} - {res.max} g/dL</div>
            </div>
        )
    },
    Urea: {
        icon: "Activity",
        inputs: [{ name: "level", label: "BUN / Urea", suffix: "mg/dL" }],
        calculate: (v) => {
            const l = Number(v.level);
            if (!l) return null;
            let status = "Normal"; let color = "text-green-500";
            if (l < 7) { status = "Low"; color = "text-yellow-500"; }
            else if (l > 20) { status = "High"; color = "text-red-500"; }
            return { status, color, l };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
               <span className="text-sm font-semibold tracking-widest text-[#7C3AED] uppercase">BUN Level</span>
               <span className={`text-4xl font-bold tracking-tighter ${res.color}`}>{res.status}</span>
               <div className="text-gray-500 text-xs mt-1">Ref: 7 - 20 mg/dL</div>
            </div>
        )
    }
};
