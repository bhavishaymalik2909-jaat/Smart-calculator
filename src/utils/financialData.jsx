export const financialData = [
    {
        id: "Mortgage",
        icon: "Home",
        inputs: [
            { name: "principal", label: "Principal Amount", prefix: "$" },
            { name: "rate", label: "Interest Rate (Yearly)", suffix: "%" },
            { name: "years", label: "Loan Term (Years)" }
        ],
        calculate: (v) => {
            const p = Number(v.principal);
            const r = Number(v.rate) / 100 / 12;
            const n = Number(v.years) * 12;
            if (!p || !r || !n) return null;
            const monthly = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            return { monthly: monthly, total: monthly * n };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
                <span className="text-sm font-semibold tracking-widest text-primary uppercase">Estimated Monthly Payment</span>
                <span className="text-5xl font-bold tracking-tighter">${res.monthly.toFixed(2)}</span>
                <div className="h-px bg-gray-200 dark:bg-gray-700/50 my-2" />
                <div className="flex justify-between items-center text-[15px]">
                    <span className="text-gray-500 font-medium">Total Committment:</span>
                    <span className="font-bold">${res.total.toFixed(2)}</span>
                </div>
            </div>
        )
    },
    {
        id: "Discount",
        icon: "Tag",
        inputs: [
            { name: "original", label: "Original Price", prefix: "$" },
            { name: "discount", label: "Discount", suffix: "%" }
        ],
        calculate: (v) => {
            const orig = Number(v.original);
            const disc = Number(v.discount);
            if (!orig || (!disc && disc !== 0)) return null;
            const saved = orig * (disc / 100);
            return { raw: orig - saved, saved: saved };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
                <span className="text-sm font-semibold tracking-widest text-primary uppercase">Final Price</span>
                <span className="text-5xl font-bold tracking-tighter">${res.raw.toFixed(2)}</span>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-green-500 font-bold tracking-wide text-sm bg-green-500/10 px-3 py-1 rounded-full">YOU SAVE ${res.saved.toFixed(2)}</span>
                </div>
            </div>
        )
    },
    {
        id: "Salary",
        icon: "Briefcase",
        inputs: [
            { name: "salary", label: "Annual Salary", prefix: "$" }
        ],
        calculate: (v) => {
            const s = Number(v.salary);
            if (!s) return null;
            return { month: s / 12, week: s / 52, day: s / 260 };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-4 text-right">
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">Monthly</span>
                    <span className="text-3xl font-bold text-primary">${res.month.toFixed(2)}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">Weekly</span>
                    <span className="text-3xl font-bold text-primary">${res.week.toFixed(2)}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">Daily (260 active working days)</span>
                    <span className="text-3xl font-bold text-primary">${res.day.toFixed(2)}</span>
                </div>
            </div>
        )
    },
    {
        id: "Percentage",
        icon: "Percent",
        inputs: [
            { name: "percent", label: "Percentage", suffix: "%" },
            { name: "value", label: "Of Value" }
        ],
        calculate: (v) => {
            if (!v.percent || !v.value) return null;
            return { res: Number(v.value) * (Number(v.percent) / 100) };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
                <span className="text-sm font-semibold tracking-widest text-primary uppercase">Result</span>
                <span className="text-5xl font-bold tracking-tighter">{res.res.toLocaleString(undefined, { maximumFractionDigits: 4 })}</span>
            </div>
        )
    },
    {
        id: "VAT",
        icon: "Landmark",
        inputs: [
            { name: "amount", label: "Base Amount / Net Price", prefix: "$" },
            { name: "vat", label: "VAT Rate", suffix: "%" }
        ],
        calculate: (v) => {
            if (!v.amount || !v.vat) return null;
            const a = Number(v.amount);
            const vat = a * (Number(v.vat) / 100);
            return { tax: vat, total: a + vat };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
                <span className="text-sm font-semibold tracking-widest text-primary uppercase">Gross Total</span>
                <span className="text-5xl font-bold tracking-tighter">${res.total.toFixed(2)}</span>
                <div className="h-px bg-gray-200 dark:bg-gray-700/50 my-2" />
                <div className="flex justify-between items-center text-[15px]">
                    <span className="text-gray-500 font-medium">VAT Paid:</span>
                    <span className="font-bold text-red-400">+ ${res.tax.toFixed(2)}</span>
                </div>
            </div>
        )
    },
    {
        id: "Investment",
        icon: "TrendingUp",
        inputs: [
            { name: "initial", label: "Initial Investment", prefix: "$" },
            { name: "monthly", label: "Monthly Contribution", prefix: "$" },
            { name: "rate", label: "Annual Return Rate", suffix: "%" },
            { name: "years", label: "Investment Length (Years)" },
        ],
        calculate: (v) => {
            const p = Number(v.initial || 0);
            const pmt = Number(v.monthly || 0);
            const r = Number(v.rate) / 100 / 12;
            const t = Number(v.years) * 12;
            if (t <= 0 || r <= 0) return null;
            // Compound interest future value
            const futureInvest = p * Math.pow(1 + r, t);
            const futurePmt = pmt * ((Math.pow(1 + r, t) - 1) / r);
            const final = futureInvest + futurePmt;
            return { final: final, totalContrib: p + (pmt * t) };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
                <span className="text-sm font-bold tracking-widest text-primary uppercase">Future Balance</span>
                <span className="text-5xl font-bold tracking-tighter">${res.final.toFixed(2)}</span>
                <div className="h-px bg-gray-200 dark:bg-gray-700/50 my-2" />
                <div className="flex justify-between items-center text-[15px]">
                    <span className="text-gray-500 font-medium">Profit Earned:</span>
                    <span className="font-bold text-green-500">+ ${(res.final - res.totalContrib).toFixed(2)}</span>
                </div>
            </div>
        )
    },
    {
        id: "Sales Tax",
        icon: "ShoppingCart",
        inputs: [
            { name: "price", label: "Price before tax", prefix: "$" },
            { name: "rate", label: "Tax Rate", suffix: "%" }
        ],
        calculate: (v) => {
            const p = Number(v.price);
            const r = Number(v.rate);
            if (!p || (!r && r !== 0)) return null;
            const tax = p * (r / 100);
            return { tax, total: p + tax };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
                <span className="text-sm font-semibold tracking-widest text-primary uppercase">Total Price</span>
                <span className="text-5xl font-bold tracking-tighter">${res.total.toFixed(2)}</span>
                <div className="flex justify-between items-center text-[15px] mt-2">
                    <span className="text-gray-500 font-medium">Sales Tax Amount:</span>
                    <span className="font-bold text-red-500">+ ${res.tax.toFixed(2)}</span>
                </div>
            </div>
        )
    },
    {
        id: "Shopping Total",
        icon: "ShoppingCart",
        inputs: [
            { name: "price1", label: "Item 1 Price", prefix: "$" },
            { name: "price2", label: "Item 2 Price", prefix: "$" },
            { name: "price3", label: "Item 3 Price", prefix: "$" },
            { name: "discount", label: "Overall Discount", suffix: "%" }
        ],
        calculate: (v) => {
            const p1 = Number(v.price1 || 0);
            const p2 = Number(v.price2 || 0);
            const p3 = Number(v.price3 || 0);
            const d = Number(v.discount || 0);
            const sub = p1 + p2 + p3;
            if (sub <= 0) return null;
            const saved = sub * (d / 100);
            return { sub, saved, total: sub - saved };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
                <span className="text-sm font-semibold tracking-widest text-primary uppercase">Final Total</span>
                <span className="text-5xl font-bold tracking-tighter">${res.total.toFixed(2)}</span>
                <div className="flex justify-between items-center mt-2">
                    <span className="text-green-500 font-bold tracking-wide text-sm bg-green-500/10 px-3 py-1 rounded-full">YOU SAVE ${res.saved.toFixed(2)}</span>
                </div>
            </div>
        )
    },
    {
        id: "Savings",
        icon: "Wallet",
        inputs: [
            { name: "goal", label: "Savings Goal", prefix: "$" },
            { name: "monthly", label: "Monthly Deposit", prefix: "$" }
        ],
        calculate: (v) => {
            const g = Number(v.goal);
            const m = Number(v.monthly);
            if (!g || !m) return null;
            return { months: Math.ceil(g / m), years: (g / m / 12) };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
                <span className="text-sm font-semibold tracking-widest text-primary uppercase">Time to Goal</span>
                <span className="text-5xl font-bold tracking-tighter">{res.months.toFixed(0)} <span className="text-2xl">Months</span></span>
                <span className="text-xl font-bold text-gray-500">~ {res.years.toFixed(1)} years</span>
            </div>
        )
    },
    {
        id: "Interest",
        icon: "Percent",
        inputs: [
            { name: "principal", label: "Principal", prefix: "$" },
            { name: "rate", label: "Interest Rate", suffix: "%" },
            { name: "time", label: "Time (Years)" }
        ],
        calculate: (v) => {
            const p = Number(v.principal);
            const r = Number(v.rate);
            const t = Number(v.time);
            if (!p || !r || !t) return null;
            const interest = (p * r * t) / 100;
            return { interest, total: p + interest };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
                <span className="text-sm font-semibold tracking-widest text-primary uppercase">Total Value (Simple)</span>
                <span className="text-5xl font-bold tracking-tighter">${res.total.toFixed(2)}</span>
                <div className="flex justify-between items-center text-[15px] mt-2">
                    <span className="text-gray-500 font-medium">Interest Earned:</span>
                    <span className="font-bold text-green-500">+ ${res.interest.toFixed(2)}</span>
                </div>
            </div>
        )
    },
    {
        id: "Loan",
        icon: "Landmark",
        inputs: [
            { name: "amount", label: "Loan Amount", prefix: "$" },
            { name: "rate", label: "Annual Rate", suffix: "%" },
            { name: "months", label: "Duration (Months)" }
        ],
        calculate: (v) => {
            const p = Number(v.amount);
            const r = Number(v.rate) / 100 / 12;
            const n = Number(v.months);
            if (!p || !r || !n) return null;
            const monthly = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
            return { monthly: monthly, total: monthly * n };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
                <span className="text-sm font-semibold tracking-widest text-primary uppercase">Monthly Payment</span>
                <span className="text-5xl font-bold tracking-tighter">${res.monthly.toFixed(2)}</span>
            </div>
        )
    },
    {
        id: "GST",
        icon: "Landmark",
        inputs: [
            { name: "amount", label: "Amount", prefix: "$" },
            { name: "rate", label: "GST Rate", suffix: "%" }
        ],
        calculate: (v) => {
            const p = Number(v.amount);
            const r = Number(v.rate);
            if (!p || !r) return null;
            const tax = p * (r / 100);
            return { tax, total: p + tax };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
                <span className="text-sm font-semibold tracking-widest text-primary uppercase">Net Total (Inc. GST)</span>
                <span className="text-5xl font-bold tracking-tighter">${res.total.toFixed(2)}</span>
            </div>
        )
    },
    {
        id: "EMI",
        icon: "CreditCard",
        inputs: [
            { name: "amount", label: "Amount", prefix: "$" },
            { name: "rate", label: "Interest Rate (Yearly)", suffix: "%" },
            { name: "months", label: "Months" }
        ],
        calculate: (v) => {
            const p = Number(v.amount);
            const r = Number(v.rate) / 100 / 12;
            const n = Number(v.months);
            if (!p || !r || !n) return null;
            const emi = p * r * (Math.pow(1 + r, n) / (Math.pow(1 + r, n) - 1));
            return { emi };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
                <span className="text-sm font-semibold tracking-widest text-primary uppercase">Equated Monthly Installment</span>
                <span className="text-5xl font-bold tracking-tighter">${res.emi.toFixed(2)}</span>
            </div>
        )
    },
    {
        id: "Compound Interest",
        icon: "TrendingUp",
        inputs: [
            { name: "principal", label: "Principal Amount", prefix: "$" },
            { name: "rate", label: "Annual Rate", suffix: "%" },
            { name: "years", label: "Time in Years" },
            { name: "freq", label: "Compound Freq (times/yr)", placeholder: "e.g., 12" }
        ],
        calculate: (v) => {
            const p = Number(v.principal);
            const r = Number(v.rate) / 100;
            const t = Number(v.years);
            const n = Number(v.freq);
            if (!p || (!r && r !== 0) || !t || !n) return null;
            const a = p * Math.pow((1 + r / n), n * t);
            return { total: a, interest: a - p };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
                <span className="text-sm font-semibold tracking-widest text-primary uppercase">Total Value</span>
                <span className="text-5xl font-bold tracking-tighter">${res.total.toFixed(2)}</span>
                <div className="flex justify-between items-center text-[15px] mt-2">
                    <span className="text-gray-500 font-medium">Interest Earned:</span>
                    <span className="font-bold text-green-500">+ ${res.interest.toFixed(2)}</span>
                </div>
            </div>
        )
    },
    {
        id: "ROI",
        icon: "Percent",
        inputs: [
            { name: "invested", label: "Amount Invested", prefix: "$" },
            { name: "returned", label: "Amount Returned", prefix: "$" }
        ],
        calculate: (v) => {
            const current = Number(v.returned);
            const invested = Number(v.invested);
            if (!current || !invested) return null;
            const roi = ((current - invested) / invested) * 100;
            return { roi, profit: current - invested };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
                <span className="text-sm font-semibold tracking-widest text-primary uppercase">Return on Investment</span>
                <span className={`text-5xl font-bold tracking-tighter ${res.roi >= 0 ? 'text-green-500' : 'text-red-500'}`}>{res.roi.toFixed(2)}%</span>
                <div className="text-gray-500 text-xs mt-1">Profit/Loss: ${res.profit.toFixed(2)}</div>
            </div>
        )
    },
    {
        id: "Retirement",
        icon: "Briefcase",
        inputs: [
            { name: "current", label: "Current Age" },
            { name: "retire", label: "Retirement Age" },
            { name: "monthly", label: "Monthly Savings", prefix: "$" },
            { name: "rate", label: "Return Rate", suffix: "%" }
        ],
        calculate: (v) => {
            const ageC = Number(v.current);
            const ageR = Number(v.retire);
            const m = Number(v.monthly);
            const r = Number(v.rate) / 100;
            if (!ageC || !ageR || !m || !r || ageR <= ageC) return null;
            const years = ageR - ageC;
            const months = years * 12;
            const rateM = r / 12;
            const total = m * ((Math.pow(1 + rateM, months) - 1) / rateM);
            return { total };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
                <span className="text-sm font-semibold tracking-widest text-primary uppercase">Retirement Cache</span>
                <span className="text-5xl font-bold tracking-tighter">${res.total.toFixed(2)}</span>
            </div>
        )
    },
    {
        id: "Service Tax",
        icon: "Landmark",
        inputs: [
            { name: "amount", label: "Base Service Amount", prefix: "$" },
            { name: "tax", label: "Service Tax Rate", suffix: "%" }
        ],
        calculate: (v) => {
            const a = Number(v.amount);
            const t = Number(v.tax);
            if (!a || (!t && t !== 0)) return null;
            const taxPaid = a * (t / 100);
            return { taxPaid, total: a + taxPaid };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
                <span className="text-sm font-semibold tracking-widest text-primary uppercase">Total Billed</span>
                <span className="text-5xl font-bold tracking-tighter">${res.total.toFixed(2)}</span>
                <div className="text-gray-500 text-xs mt-1">Tax Amount: ${res.taxPaid.toFixed(2)}</div>
            </div>
        )
    },
    {
        id: "Stock Return",
        icon: "TrendingUp",
        inputs: [
            { name: "shares", label: "Number of Shares" },
            { name: "buyP", label: "Buy Price", prefix: "$" },
            { name: "sellP", label: "Sell Price", prefix: "$" }
        ],
        calculate: (v) => {
            const s = Number(v.shares);
            const b = Number(v.buyP);
            const p = Number(v.sellP);
            if (!s || !b || !p) return null;
            const cost = s * b;
            const rev = s * p;
            const profit = rev - cost;
            const roi = (profit / cost) * 100;
            return { profit, roi };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
                <span className="text-sm font-semibold tracking-widest text-primary uppercase">Net Stock Return</span>
                <span className={`text-5xl font-bold tracking-tighter ${res.profit >= 0 ? 'text-green-500' : 'text-red-500'}`}>${res.profit.toFixed(2)}</span>
                <div className="text-gray-500 text-xs mt-1">ROI: {res.roi.toFixed(2)}%</div>
            </div>
        )
    },
    {
        id: "Tip",
        icon: "Percent",
        inputs: [
            { name: "bill", label: "Bill Total", prefix: "$" },
            { name: "tip", label: "Tip Percentage", suffix: "%", placeholder: "e.g., 15" },
            { name: "split", label: "Split count (people)", placeholder: "e.g., 1" }
        ],
        calculate: (v) => {
            const b = Number(v.bill);
            const t = Number(v.tip);
            const s = Number(v.split) || 1;
            if (!b || (!t && t !== 0) || !s) return null;
            const tipAmt = b * (t / 100);
            const total = b + tipAmt;
            return { total, perPerson: total / s, tipAmt };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
                <span className="text-sm font-semibold tracking-widest text-primary uppercase">Total Bill</span>
                <span className="text-4xl font-bold tracking-tighter">${res.total.toFixed(2)}</span>
                <div className="text-primary font-bold mt-1 tracking-widest text-sm uppercase">Per Person: ${res.perPerson.toFixed(2)}</div>
                <div className="text-gray-500 text-xs mt-1">Tip Amount: ${res.tipAmt.toFixed(2)}</div>
            </div>
        )
    },
    {
        id: "CAGR",
        icon: "TrendingUp",
        inputs: [
            { name: "initial", label: "Initial Value", prefix: "$" },
            { name: "final", label: "Final Value", prefix: "$" },
            { name: "years", label: "Years" }
        ],
        calculate: (v) => {
            const i = Number(v.initial);
            const f = Number(v.final);
            const y = Number(v.years);
            if (!i || !f || !y) return null;
            const cagr = (Math.pow(f / i, 1 / y) - 1) * 100;
            return { cagr };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
                <span className="text-sm font-semibold tracking-widest text-primary uppercase">CAGR</span>
                <span className="text-5xl font-bold tracking-tighter">{res.cagr.toFixed(2)}%</span>
            </div>
        )
    },
    {
        id: "Car Loan",
        icon: "Banknote",
        inputs: [
            { name: "price", label: "Car Price", prefix: "$" },
            { name: "down", label: "Down Payment", prefix: "$" },
            { name: "rate", label: "Interest Rate", suffix: "%" },
            { name: "months", label: "Term (Months)" }
        ],
        calculate: (v) => {
            const p = Number(v.price) - Number(v.down || 0);
            const r = Number(v.rate) / 100 / 12;
            const m = Number(v.months);
            if (p <= 0 || !r || !m) return null;
            const emi = p * r * (Math.pow(1 + r, m) / (Math.pow(1 + r, m) - 1));
            return { emi, totalInterst: (emi * m) - p };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
                <span className="text-sm font-semibold tracking-widest text-primary uppercase">Monthly Payment</span>
                <span className="text-5xl font-bold tracking-tighter">${res.emi.toFixed(2)}</span>
                <div className="text-gray-500 text-xs mt-1">Total Interest Paid: ${res.totalInterst.toFixed(2)}</div>
            </div>
        )
    },
    {
        id: "Present Value",
        icon: "Clock",
        inputs: [
            { name: "fv", label: "Future Value", prefix: "$" },
            { name: "rate", label: "Discount Rate", suffix: "%" },
            { name: "years", label: "Years" }
        ],
        calculate: (v) => {
            const f = Number(v.fv);
            const r = Number(v.rate) / 100;
            const y = Number(v.years);
            if (!f || !r || !y) return null;
            const pv = f / Math.pow(1 + r, y);
            return { pv };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
                <span className="text-sm font-semibold tracking-widest text-primary uppercase">Present Value</span>
                <span className="text-5xl font-bold tracking-tighter">${res.pv.toFixed(2)}</span>
            </div>
        )
    },
    {
        id: "Future Value",
        icon: "Clock",
        inputs: [
            { name: "pv", label: "Present Value", prefix: "$" },
            { name: "rate", label: "Return Rate", suffix: "%" },
            { name: "years", label: "Years" }
        ],
        calculate: (v) => {
            const p = Number(v.pv);
            const r = Number(v.rate) / 100;
            const y = Number(v.years);
            if (!p || !r || !y) return null;
            const fv = p * Math.pow(1 + r, y);
            return { fv };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
                <span className="text-sm font-semibold tracking-widest text-primary uppercase">Future Value</span>
                <span className="text-5xl font-bold tracking-tighter">${res.fv.toFixed(2)}</span>
            </div>
        )
    },
    {
        id: "Electric Bill",
        icon: "Zap",
        inputs: [
            { name: "watts", label: "Power Usage", suffix: "Watts" },
            { name: "hours", label: "Hours per Day" },
            { name: "cost", label: "Cost per kWh", prefix: "$" }
        ],
        calculate: (v) => {
            const w = Number(v.watts);
            const h = Number(v.hours);
            const c = Number(v.cost);
            if (!w || !h || !c) return null;
            const kWhPerDay = (w * h) / 1000;
            const costPerDay = kWhPerDay * c;
            return { d: costPerDay, m: costPerDay * 30, y: costPerDay * 365 };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-4 text-right">
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">Monthly</span>
                    <span className="text-3xl font-bold text-primary">${res.m.toFixed(2)}</span>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs font-bold tracking-widest text-gray-500 uppercase">Yearly</span>
                    <span className="text-3xl font-bold text-primary">${res.y.toFixed(2)}</span>
                </div>
            </div>
        )
    },
    {
        id: "SIP",
        icon: "TrendingUp",
        inputs: [
            { name: "investment", label: "Monthly Investment", prefix: "$" },
            { name: "rate", label: "Expected Return Rate", suffix: "%" },
            { name: "years", label: "Time Period (Years)" }
        ],
        calculate: (v) => {
            const p = Number(v.investment);
            const r = Number(v.rate);
            const y = Number(v.years);
            if (!p || (!r && r !== 0) || !y) return null;

            const i = r / 100 / 12; // monthly rate
            const n = y * 12; // total months

            const maturity = p * ((Math.pow(1 + i, n) - 1) / i) * (1 + i);
            const totalInvested = p * n;

            return { maturity, totalInvested, profit: maturity - totalInvested };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
                <span className="text-sm font-semibold tracking-widest text-primary uppercase">Maturity Amount</span>
                <span className="text-5xl font-bold tracking-tighter">${res.maturity.toFixed(2)}</span>
                <div className="flex flex-col text-xs text-gray-500 mt-2 gap-1">
                    <span>Amount Invested: ${res.totalInvested.toFixed(2)}</span>
                    <span className="text-green-500 font-bold">Wealth Gained: +${res.profit.toFixed(2)}</span>
                </div>
            </div>
        )
    },
    {
        id: "SWP",
        icon: "Banknote",
        inputs: [
            { name: "principal", label: "Total Investment", prefix: "$" },
            { name: "withdrawal", label: "Monthly Withdrawal", prefix: "$" },
            { name: "rate", label: "Expected Return Rate", suffix: "%" },
            { name: "years", label: "Time Period (Years)" }
        ],
        calculate: (v) => {
            const p = Number(v.principal);
            const w = Number(v.withdrawal);
            const r = Number(v.rate);
            const y = Number(v.years);
            if (!p || (!r && r !== 0) || !w || !y) return null;

            const i = r / 100 / 12;
            const n = y * 12;

            // FV of investment - FV of withdrawals
            // Balance = P(1+i)^n - W[((1+i)^n - 1) / i]
            const balance = (p * Math.pow(1 + i, n)) - (w * ((Math.pow(1 + i, n) - 1) / i));
            const totalWithdrawn = w * n;

            return { balance, totalWithdrawn };
        },
        formatResult: (res) => (
            <div className="flex flex-col gap-2 text-right">
                <span className="text-sm font-semibold tracking-widest text-primary uppercase">Final Balance</span>
                <span className={`text-4xl font-bold tracking-tighter ${res.balance < 0 ? 'text-red-500' : 'text-primary'}`}>
                    {res.balance < 0 ? '-$' + Math.abs(res.balance).toFixed(2) : '$' + res.balance.toFixed(2)}
                </span>
                <div className="text-gray-500 text-xs mt-1">Total Withdrawn: ${res.totalWithdrawn.toFixed(2)}</div>
                {res.balance < 0 && <span className="text-[10px] text-red-500 mt-1 uppercase font-bold">Funds Depleted Before Term</span>}
            </div>
        )
    }
];