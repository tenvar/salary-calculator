// EMBEDDED DATA & LOGIC

// 1. RATES (Replaced rates.json)
const rates = {
    "creditPointValue": 253,
    "taxBrackets": [
        { "rate": 0.10, "max": 7010, "accumulatedMax": 701 },
        { "rate": 0.14, "max": 10060, "accumulatedMax": 1128 },
        { "rate": 0.20, "max": 16150, "accumulatedMax": 2346 },
        { "rate": 0.31, "max": 22440, "accumulatedMax": 4296 },
        { "rate": 0.35, "max": 46690, "accumulatedMax": 12783 },
        { "rate": 0.47, "max": null, "accumulatedMax": null }
    ],
    "bituahLeumi": {
        "threshold": 7522,
        "reducedRate": { "socialSecurity": 0.0040, "healthTax": 0.0310 },
        "fullRate": { "socialSecurity": 0.0700, "healthTax": 0.0500 },
        "employer": { "reducedRate": 0.0355, "fullRate": 0.0760 }
    },
    "pension": {
        "defaultRate": 0.06,
        "employerRate": 0.065,
        "severanceRate": 0.0833,
        "taxCreditRate": 0.35,
        "eligibleSalaryCap": 9700
    },
    "studyFund": {
        "defaultRate": 0.025,
        "employerRate": 0.075,
        "ceiling": 15712
    },
    "creditPointsRules": {
        "resident": 2.25,
        "woman": 0.5,
        "singleParent": 1.0,
        "alimony": 1.0,
        "children": {
            "bornThisYear": 1.5,
            "ages1to5": 2.5,
            "ages6to18": 1.0,
            "age18": 0.5,
            "toddlerFather": 2.5
        },
        "aliyah": {
            "1-18": 0.25,
            "19-30": 0.1666,
            "31-42": 0.0833
        },
        "army": {
            "men_gt_24": 2.0,
            "women_or_lt_24": 1.0
        },
        "degree": {
            "bachelor": 1.0,
            "master": 0.5
        }
    },
    "settlementDiscount": []
};

// 2. SETTLEMENTS
const settlements = [
    { value: "", labelHe: "בחר ישוב", labelEn: "Select Settlement" },
    { value: "2600", labelHe: "אילת", labelEn: "Eilat", rate: 0.10, ceiling: 279720 },
    { value: "7600", labelHe: "עכו", labelEn: "Acre", rate: 0.07, ceiling: 177600 },
    { value: "1031", labelHe: "שדרות", labelEn: "Sderot", rate: 0.20, ceiling: 279720 },
    { value: "2800", labelHe: "קריית שמונה", labelEn: "Qiryat Shemona", rate: 0.20, ceiling: 279720 },
    { value: "31", labelHe: "אופקים", labelEn: "Ofakim", rate: 0.20, ceiling: 279720 },
    { value: "26", labelHe: "ראש פינה", labelEn: "Rosh Pinna", rate: 0.07, ceiling: 177600 },
    { value: "6700", labelHe: "טבריה", labelEn: "Tiberias", rate: 0.07, ceiling: 177600 },
    { value: "812", labelHe: "שלומי", labelEn: "Shlomi", rate: 0.20, ceiling: 279720 },
    { value: "70", labelHe: "נתיבות", labelEn: "Netivot", rate: 0.20, ceiling: 279720 },
    { value: "831", labelHe: "ירוחם", labelEn: "Yeruham", rate: 0.18, ceiling: 207360 },
    { value: "246", labelHe: "נתיבות", labelEn: "Netivot (Check ID)", rate: 0.16, ceiling: 198240 },
    { value: "1139", labelHe: "כרמיאל", labelEn: "Karmiel", rate: 0.07, ceiling: 151560 }
];

// 3. LOCALES
const hasHebrew = true; // Use this flag to ensure font loading if needed
const en = {
    title: "Israel Salary Calculator",
    subtitle: "Estimate your net salary for 2025/2026",
    sections: {
        financial: "Financial Data",
        personal: "Personal Details",
        social: "Social Deductions",
        results: "Results"
    },
    labels: {
        baseSalary: "Base Salary (Brutto)",
        overtime: "Global Overtime",
        bonuses: "Bonuses / Commissions",
        shonot: "Additions",
        travel: "Travel",
        havraa: "Recuperation (Havra'a)",
        carValue: "Car Value (Shovi Rechev)",
        otherBenefits: "Meals Value (Shovi)",
        workDays: "Work Days",
        calcByDays: "Calc by Days",
        dailyRate: "Daily Rate",
        hourlyRate: "Hourly Rate",
        monthlyTotal: "Monthly Total",
        hoursPerDay: "Hours / Day",
        monthlySalary: "Monthly (Global)",
        dailySalary: "Daily Basis",
        hourlySalary: "Hourly Basis",

        gender: "Gender",
        male: "Male",
        female: "Female",

        maritalStatus: "Marital Status",
        single: "Single",
        married: "Married",
        divorced: "Divorced",
        widower: "Widower",
        spouseWorks: "Spouse Works?",
        isAlimony: "Paying Alimony?",

        resident: "Residency Status",
        regular: "Resident",
        oleh: "New Immigrant (Oleh Hadash)",

        childrenHeader: "Children (By Age)",
        children0: "Born this year (0)",
        children1to5: "Ages 1-5",
        children6to17: "Ages 6-17",
        children18: "Age 18",

        aliyahMonths: "Months since Aliyah",

        army: "Military Service",
        none: "None / Not Served",
        less24: "Less than 24 months (or Woman)",
        more24: "More than 24 months (Man)",

        degree: "Academic Degree",
        noDegree: "None",
        bachelor: "Bachelor's Degree",
        master: "Master's Degree",

        settlement: "Settlement Discount",
        settlementName: "Settlement Name",
        settlementRate: "Discount Rate (%)",

        advancedHeader: "Advanced (Aliyah, Degree, Army)",

        // Socials
        pensionEnabled: "Pension Fund?",
        pensionRate: "Pension Rate (%)",
        studyFundEnabled: "Keren Hishtalmut?",
        studyFundRate: "Study Fund Rate (%)"
    },
    results: {
        taxableIncome: "Taxable Income",
        grossTax: "Gross Income Tax",
        points: "Credit Points",
        pointsValue: "Points Value",
        settlementDiscount: "Settlement Disc.",
        pensionBenefit: "Pension Tax Benefit",
        finalTax: "Final Income Tax",
        bituahLeumi: "Bituah Leumi",
        healthTax: "Health Tax",
        pension: "Pension",
        studyFund: "Keren Hishtalmut",
        totalDeductions: "Total Deductions",
        netSalary: "Net Salary",
        employerCost: "Total Employer Cost (Est.)",
        imputedStudyFund: "Imputed Income (Study Fund)",
        employerPension: "Pension (Employer)",
        employerSeverance: "Severance (Pitzuim)",
        employerStudyFund: "Study Fund (Employer)",
        employerBituahLeumi: "Bituah Leumi (Employer)"
    },
    footerDisclaimer: "This site may contain errors and is not legal or tax advice. Results are estimates and do not reflect your exact net salary."
};

const he = {
    title: "מחשבון שכר ישראל",
    subtitle: "חישוב משוער של שכר נטו לשנת 2025/2026",
    sections: {
        financial: "נתונים כספיים",
        personal: "פרטים אישיים",
        social: "הפרשות סוציאליות",
        results: "תוצאות"
    },
    labels: {
        baseSalary: "שכר יסוד (ברוטו)",
        overtime: "שעות נוספות גלובליות",
        bonuses: "בונוסים / עמלות",
        shonot: "תוספות",
        travel: "נסיעות",
        havraa: "דמי הבראה",
        carValue: "שווי רכב",
        otherBenefits: "שווי ארוחות",
        workDays: "ימי עבודה",
        calcByDays: "חישוב יומי",
        dailyRate: "תעריף יומי",
        hourlyRate: "תעריף שעתי",
        monthlyTotal: "סה\"כ חודשי",
        hoursPerDay: "שעות ליום",
        monthlySalary: "חודשי (גלובלי)",
        dailySalary: "יומי",
        dailySalary: "יומי",
        hourlySalary: "שעתי",

        gender: "מין",
        male: "זכר",
        female: "נקבה",

        maritalStatus: "מצב משפחתי",
        single: "רווק/ה",
        married: "נשוי/ה",
        divorced: "גרוש/ה",
        widower: "אלמן/ה",

        spouseWorks: "בן/בת זוג עובד/ת?",
        isAlimony: "משלם מזונות?",

        resident: "תושבות",
        regular: "תושב",
        oleh: "עולה חדש",

        childrenHeader: "ילדים (לפי גיל)",
        children0: "נולדו השנה (0)",
        children1to5: "גילאי 1-5",
        children6to17: "גילאי 6-17",
        children18: "גיל 18",

        aliyahMonths: "חודשים מאז העלייה",

        army: "שירות צבאי",
        none: "לא שירת/ה",
        less24: "פחות מ-24 חודשים (או אישה)",
        more24: "יותר מ-24 חודשים (גבר)",

        degree: "תואר אקדמי",
        noDegree: "ללא",
        bachelor: "תואר ראשון",
        master: "תואר שני",

        settlement: "זיכוי ישוב",
        settlementName: "שם הישוב",
        settlementRate: "שיעור ההנחה (%)",

        advancedHeader: "מתקדם (עלייה, תואר, צבא)",

        // Socials
        pensionEnabled: "הפרשה לפנסיה?",
        pensionRate: "אחוז הפרשה לפנסיה (%)",
        studyFundEnabled: "קרן השתלמות?",
        studyFundRate: "אחוז הפרשה לקה\"ש (%)"
    },
    results: {
        taxableIncome: "הכנסה חייבת",
        grossTax: "מס הכנסה (גולמי)",
        points: "נקודות זיכוי",
        pointsValue: "שווי נקודות",
        settlementDiscount: "זיכוי ישוב",
        pensionBenefit: "זיכוי מס פנסיה (הטבה)",
        finalTax: "מס הכנסה לתשלום",
        bituahLeumi: "ביטוח לאומי",
        healthTax: "מס בריאות",
        pension: "פנסיה (עובד)",
        studyFund: "קרן השתלמות (עובד)",
        totalDeductions: "סך הכל ניכויים",
        netSalary: "שכר נטו",
        employerCost: "עלות מעביד (משוער)",
        imputedStudyFund: "זקיפת שווי קה\"ש מעסיק",
        employerPension: "פנסיה (מעסיק)",
        employerSeverance: "פיצויים",
        employerStudyFund: "קרן השתלמות (מעסיק)",
        employerBituahLeumi: "ביטוח לאומי (מעסיק)"
    },
    footerDisclaimer: "האתר עלול להכיל טעויות ואינו ייעוץ משפטי או מס. התוצאות הן הערכות ואינן משקפות את שכר הנטו המדויק שלך."
};

const ru = {
    title: "Калькулятор Зарплаты Израиль",
    subtitle: "Расчет чистой зарплаты (нетто) на 2025/2026 год",
    sections: {
        financial: "Финансовые данные",
        personal: "Личные данные",
        social: "Социальные отчисления",
        results: "Результаты"
    },
    labels: {
        baseSalary: "Базовая зарплата (Брутто)",
        overtime: "Глобальные сверхурочные",
        bonuses: "Бонусы / Комиссионные",
        shonot: "Добавки",
        travel: "Проезд",
        havraa: "Оздоровительные",
        carValue: "Стоимость авто (Shovi)",
        otherBenefits: "Стоимость питания (Shovi)",
        workDays: "Рабочих дней",
        calcByDays: "По дням",
        dailyRate: "Тариф в день",
        hourlyRate: "Почасовой тариф",
        monthlyTotal: "Всего в месяц",
        hoursPerDay: "Часов в день",
        monthlySalary: "Помесячно (Глобал)",
        dailySalary: "Поденно",
        hourlySalary: "Почасово",

        gender: "Пол",
        male: "Мужской",
        female: "Женский",

        maritalStatus: "Семейное положение",
        single: "Холост/Не замужем",
        married: "Женат/Замужем",
        divorced: "Разведен/а",
        widower: "Вдовец/Вдова",

        spouseWorks: "Супруг(а) работает?",
        isAlimony: "Платите алименты?",

        resident: "Статус резидента",
        regular: "Резидент",
        oleh: "Новый репатриант",

        childrenHeader: "Дети (по возрасту)",
        children0: "Родились в этом году (0)",
        children1to5: "1-5 лет",
        children6to17: "6-17 лет",
        children18: "18 лет",

        aliyahMonths: "Месяцев с репатриации",

        army: "Служба в армии",
        none: "Не служил",
        less24: "< 24 мес (или жен)",
        more24: "> 24 мес (муж)",

        degree: "Образование",
        noDegree: "Нет",
        bachelor: "Бакалавр",
        master: "Магистр",

        settlement: "Льгота поселения",
        settlementName: "Название поселения",
        settlementRate: "Скидка (%)",

        advancedHeader: "Дополнительно (Алия, образование, армия)",

        // Socials
        pensionEnabled: "Пенсионные отчисления?",
        pensionRate: "Взнос (Работник) %",
        studyFundEnabled: "Керен Иштальмут?",
        studyFundRate: "Взнос (Работник) %"
    },
    results: {
        taxableIncome: "Налогооблагаемая база",
        grossTax: "Налог (Gross)",
        points: "Льготные баллы",
        pointsValue: "Скидка за баллы",
        settlementDiscount: "Скидка поселения",
        pensionBenefit: "Льгота за Пенс. Взнос (35%)",
        finalTax: "Итоговый подоходный налог",
        bituahLeumi: "Битуах Леуми",
        healthTax: "Налог на здоровье",
        pension: "Пенсия (Работник)",
        studyFund: "Керен Иштальмут (Работник)",
        totalDeductions: "Всего удержаний",
        netSalary: "Нетто (На руки)",
        employerCost: "Стоимость работодателя (Прим.)",
        imputedStudyFund: "Вмененный доход (Керен Иштальмут)",
        employerPension: "Пенсия (Работодатель)",
        employerSeverance: "Компенсация (Пицуим)",
        employerStudyFund: "Керен Иштальмут (Работодатель)",
        employerBituahLeumi: "Битуах Леуми (Работодатель)"
    },
    footerDisclaimer: "Сайт может содержать ошибки и не является юридической или налоговой консультацией. Результаты — ориентировочные и не отражают точную зарплату на руки."
};

const locales = { en, he, ru };

// 4. CALCULATION LOGIC
function calculateSalary(input, rates) {
    if (!rates) return null;

    const {
        baseSalary = 0,
        shonot = 0,
        bonus = 0,
        carValue = 0,
        otherBenefitValue = 0,
        isPensionEnabled = true,
        pensionRate = rates.pension.defaultRate,
        isStudyFundEnabled = true,
        studyFundRate = rates.studyFund.defaultRate,
        isResident = true,
        gender = 'male',
        maritalStatus = 'single',
        children0 = 0,
        children1to5 = 0,
        children6to17 = 0,
        children18 = 0,
        aliyahMonths = 0,
        armyService = 'none',
        degree = 'none',
        settlementRate = 0,
        settlementCeiling = 0,
        spouseWorks = false, // Not typically used for calculation but passed for future proofing
        isAlimony = false
    } = input;

    const isFemale = gender === 'female';
    const isSingleParent = (maritalStatus === 'divorced' || maritalStatus === 'widower' || maritalStatus === 'single') && (children0 + children1to5 + children6to17 + children18 > 0);

    const pensionBase = baseSalary;
    const taxableIncome = baseSalary + shonot + bonus + carValue + otherBenefitValue;

    // Gross Tax
    let grossTax = 0;
    let remainingIncome = taxableIncome;
    let previousMax = 0;

    for (const bracket of rates.taxBrackets) {
        if (remainingIncome <= 0) break;
        const rangeMax = bracket.max;
        let taxableAmountInBracket;

        if (rangeMax === null) {
            taxableAmountInBracket = remainingIncome;
        } else {
            const span = rangeMax - previousMax;
            taxableAmountInBracket = Math.min(remainingIncome, span);
        }

        grossTax += taxableAmountInBracket * bracket.rate;
        if (rangeMax !== null) {
            remainingIncome -= taxableAmountInBracket;
            previousMax = rangeMax;
        } else {
            remainingIncome = 0;
        }
    }

    // Credit Points
    let points = 0;
    if (isResident) points += rates.creditPointsRules.resident;
    if (isFemale) points += rates.creditPointsRules.woman;

    if (isFemale) {
        points += children0 * rates.creditPointsRules.children.bornThisYear;
        points += children1to5 * rates.creditPointsRules.children.ages1to5;
        points += children6to17 * rates.creditPointsRules.children.ages6to18;
        points += children18 * rates.creditPointsRules.children.age18;
    } else {
        points += (children0 + children1to5) * rates.creditPointsRules.children.toddlerFather;
    }

    if (aliyahMonths > 0) {
        if (aliyahMonths <= 18) points += rates.creditPointsRules.aliyah["1-18"];
        else if (aliyahMonths <= 30) points += rates.creditPointsRules.aliyah["19-30"];
        else if (aliyahMonths <= 41) points += rates.creditPointsRules.aliyah["31-42"];
    }

    if (armyService === 'more24') points += rates.creditPointsRules.army.men_gt_24;
    else if (armyService === 'less24') points += rates.creditPointsRules.army.women_or_lt_24;

    if (degree === 'bachelor') points += rates.creditPointsRules.degree.bachelor;
    else if (degree === 'master') points += rates.creditPointsRules.degree.master;

    if (isSingleParent) points += rates.creditPointsRules.singleParent;
    if (isAlimony) points += rates.creditPointsRules.alimony;

    const pointsDiscount = points * rates.creditPointValue;

    // Settlement Discount
    let settlementDiscount = 0;
    if (settlementRate > 0) {
        const eligibleIncome = Math.min(taxableIncome, settlementCeiling > 0 ? settlementCeiling : 999999);
        settlementDiscount = eligibleIncome * settlementRate;
    }

    // Social Deductions
    let pensionDed = 0;
    let studyFundDed = 0;
    let pensionTaxBenefit = 0;

    if (isPensionEnabled) {
        pensionDed = pensionBase * pensionRate;
        const eligibleForCredit = Math.min(pensionBase, rates.pension.eligibleSalaryCap);
        const eligibleContribution = eligibleForCredit * pensionRate;
        pensionTaxBenefit = eligibleContribution * rates.pension.taxCreditRate;
    }

    if (isStudyFundEnabled) {
        const studyFundBase = Math.min(pensionBase, rates.studyFund.ceiling);
        studyFundDed = studyFundBase * studyFundRate;
    }

    // Final Tax
    const finalIncomeTax = Math.max(0, grossTax - pointsDiscount - settlementDiscount - pensionTaxBenefit);

    // Bituah Leumi
    const blThreshold = rates.bituahLeumi.threshold;
    let socialSecurity = 0;
    let healthTax = 0;

    if (taxableIncome <= blThreshold) {
        socialSecurity = taxableIncome * rates.bituahLeumi.reducedRate.socialSecurity;
        healthTax = taxableIncome * rates.bituahLeumi.reducedRate.healthTax;
    } else {
        socialSecurity += blThreshold * rates.bituahLeumi.reducedRate.socialSecurity;
        healthTax += blThreshold * rates.bituahLeumi.reducedRate.healthTax;
        const remainder = taxableIncome - blThreshold;
        socialSecurity += remainder * rates.bituahLeumi.fullRate.socialSecurity;
        healthTax += remainder * rates.bituahLeumi.fullRate.healthTax;
    }
    const totalBituahLeumi = socialSecurity + healthTax;

    // Net Salary (gross cash minus all deductions; non-cash benefits like meals/car are in taxable income only)
    const totalDeductions = finalIncomeTax + totalBituahLeumi + pensionDed + studyFundDed;
    const totalCashGross = baseSalary + shonot + bonus;
    const netSalary = Math.round((totalCashGross - totalDeductions) * 100) / 100;

    return {
        taxableIncome,
        grossTax,
        points,
        pointsDiscount,
        settlementDiscount,
        pensionTaxBenefit,
        finalIncomeTax,
        socialSecurity,
        healthTax,
        totalBituahLeumi,
        pensionDed,
        studyFundDed,
        totalDeductions,
        netSalary,
        totalCashGross,
        pensionBase
    };
}

// 5. MAIN LOGIC
const state = {
    lang: 'en',
    baseSalary: 0,
    bonuses: 0,
    travelFixed: 0,
    travelDaily: 0,
    calcTravelByDays: false,
    carValue: 0,
    foodFixed: 0,
    foodDaily: 0,
    calcFoodByDays: false,
    workDays: 22,
    gender: 'male',
    maritalStatus: 'single',
    spouseWorks: false,
    isAlimony: false,
    children0: 0,
    children1to5: 0,
    children6to17: 0,
    children18: 0,
    residentStatus: 'regular',
    aliyahMonths: 0,
    armyService: 'none',
    degree: 'none',
    settlementId: '',
    pensionEnabled: true,
    pensionRate: 6.0,
    studyFundEnabled: true,
    studyFundRate: 2.5
};

const ids = [
    'baseSalary', 'bonuses', 'travelFixed', 'travelDaily', 'calcTravelByDays', 'carValue',
    'foodFixed', 'foodDaily', 'calcFoodByDays', 'workDays',
    'gender', 'maritalStatus', 'spouseWorks', 'isAlimony',
    'children0', 'children1to5', 'children6to17', 'children18',
    'residentStatus', 'aliyahMonths', 'armyService', 'degree',
    'settlementId', 'pensionEnabled', 'pensionRate', 'studyFundEnabled', 'studyFundRate'
];

function init() {
    // Sync baseSalary from DOM (empty on load)
    const baseEl = document.getElementById('baseSalary');
    if (baseEl && baseEl.value === '') state.baseSalary = 0;

    // Bind Events
    ids.forEach(id => {
        const el = document.getElementById(id);
        if (el) {
            el.addEventListener('change', (e) => handleInput(id, e));
            el.addEventListener('input', (e) => handleInput(id, e));
        }
    });

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
    });

    document.querySelectorAll('.collapsible-header').forEach(header => {
        header.addEventListener('click', () => {
            header.parentElement.classList.toggle('open');
            const arrow = header.querySelector('span:last-child');
            arrow.textContent = header.parentElement.classList.contains('open') ? '▲' : '▼';
        });
    });

    // Populate Settlements
    const settlementSelect = document.getElementById('settlementId');
    settlements.forEach(s => {
        if (!s.value) return;
        const opt = document.createElement('option');
        opt.value = s.value;
        opt.textContent = s.labelHe;
        settlementSelect.appendChild(opt);
    });

    setLanguage('en');
    updateVisibility();
    calculateAndRender();
}

function handleInput(id, e) {
    const el = e.target;
    let value;
    if (el.type === 'checkbox') {
        value = el.checked;
    } else if (el.type === 'number') {
        value = parseFloat(el.value) || 0;
    } else {
        value = el.value;
    }
    state[id] = value;
    updateVisibility();
    calculateAndRender();
}

function updateVisibility() {
    document.getElementById('travel-fixed-container').style.display = state.calcTravelByDays ? 'none' : 'block';
    document.getElementById('travel-daily-container').style.display = state.calcTravelByDays ? 'grid' : 'none';
    document.getElementById('food-fixed-container').style.display = state.calcFoodByDays ? 'none' : 'block';
    document.getElementById('food-daily-container').style.display = state.calcFoodByDays ? 'grid' : 'none';
    document.getElementById('workDays-container').style.display = (state.calcTravelByDays || state.calcFoodByDays) ? 'flex' : 'none';
    document.getElementById('aliyahMonths-container').style.display = state.residentStatus === 'oleh' ? 'flex' : 'none';
    document.getElementById('spouseWorks-container').style.display = state.maritalStatus === 'married' ? 'flex' : 'none';

    const settlement = settlements.find(s => s.value === state.settlementId);
    const infoEl = document.getElementById('settlement-info');
    if (settlement && settlement.rate > 0) {
        const t = locales[state.lang].labels;
        infoEl.textContent = `${t.settlementRate}: ${(settlement.rate * 100).toFixed(1)}%`;
    } else {
        infoEl.textContent = '';
    }

    if (state.calcTravelByDays) {
        document.getElementById('travelTotal').textContent = `= ${Math.round(state.travelDaily * state.workDays)}`;
    }
    if (state.calcFoodByDays) {
        document.getElementById('foodTotal').textContent = `= ${Math.round(state.foodDaily * state.workDays)}`;
    }
}

function setLanguage(lang) {
    state.lang = lang;
    const t = locales[lang];
    document.body.dir = (lang === 'he') ? 'rtl' : 'ltr';

    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    document.getElementById('title').textContent = t.title;
    document.getElementById('subtitle').textContent = t.subtitle;
    document.getElementById('section-financial').textContent = t.sections.financial;
    document.getElementById('section-personal').textContent = t.sections.personal;
    document.getElementById('section-social').textContent = t.sections.social;
    document.getElementById('section-results').textContent = t.sections.results;

    updateLabel('label-baseSalary', t.labels.baseSalary);
    updateLabel('label-bonuses', t.labels.bonuses);
    updateLabel('label-travel', t.labels.travel);
    updateLabel('label-calcByDays-travel', t.labels.calcByDays);
    updateLabel('label-dailyRate-travel', t.labels.dailyRate);
    updateLabel('label-otherBenefits', t.labels.otherBenefits);
    updateLabel('label-calcByDays-food', t.labels.calcByDays);
    updateLabel('label-dailyRate-food', t.labels.dailyRate);
    updateLabel('label-workDays', t.labels.workDays);
    updateLabel('label-carValue', t.labels.carValue);

    const travelFixedEl = document.getElementById('travelFixed');
    const foodFixedEl = document.getElementById('foodFixed');
    if (travelFixedEl) travelFixedEl.placeholder = t.labels.monthlyTotal;
    if (foodFixedEl) foodFixedEl.placeholder = t.labels.monthlyTotal;

    updateLabel('label-advancedHeader', t.labels.advancedHeader);

    updateLabel('label-gender', t.labels.gender);
    document.getElementById('opt-male').textContent = t.labels.male;
    document.getElementById('opt-female').textContent = t.labels.female;

    updateLabel('label-maritalStatus', t.labels.maritalStatus);
    document.getElementById('opt-single').textContent = t.labels.single;
    document.getElementById('opt-married').textContent = t.labels.married;
    document.getElementById('opt-divorced').textContent = t.labels.divorced;
    document.getElementById('opt-widower').textContent = t.labels.widower;

    updateLabel('label-spouseWorks', t.labels.spouseWorks);
    updateLabel('label-isAlimony', t.labels.isAlimony);

    document.getElementById('label-childrenHeader').textContent = t.labels.childrenHeader;
    updateLabel('label-children0', t.labels.children0);
    updateLabel('label-children1to5', t.labels.children1to5);
    updateLabel('label-children6to17', t.labels.children6to17);
    updateLabel('label-children18', t.labels.children18);

    updateLabel('label-resident', t.labels.resident);
    document.getElementById('opt-regular').textContent = t.labels.regular;
    document.getElementById('opt-oleh').textContent = t.labels.oleh;
    updateLabel('label-aliyahMonths', t.labels.aliyahMonths);

    updateLabel('label-army', t.labels.army);
    document.getElementById('opt-none').textContent = t.labels.none;
    document.getElementById('opt-less24').textContent = t.labels.less24;
    document.getElementById('opt-more24').textContent = t.labels.more24;

    updateLabel('label-degree', t.labels.degree);
    document.getElementById('opt-noDegree').textContent = t.labels.noDegree;
    document.getElementById('opt-bachelor').textContent = t.labels.bachelor;
    document.getElementById('opt-master').textContent = t.labels.master;

    updateLabel('label-settlement', t.labels.settlement);

    const settlementSelect = document.getElementById('settlementId');
    Array.from(settlementSelect.options).forEach(opt => {
        if (!opt.value) return;
        const s = settlements.find(item => item.value === opt.value);
        if (s) {
            opt.textContent = lang === 'he' ? s.labelHe : s.labelEn;
        }
    });

    updateLabel('label-pensionEnabled', t.labels.pensionEnabled);
    updateLabel('label-pensionRate', t.labels.pensionRate);
    updateLabel('label-studyFundEnabled', t.labels.studyFundEnabled);
    updateLabel('label-studyFundRate', t.labels.studyFundRate);
    updateLabel('label-netSalary', t.results.netSalary);

    const footerEl = document.getElementById('footer-disclaimer');
    if (footerEl) footerEl.textContent = t.footerDisclaimer;

    calculateAndRender();
}

function updateLabel(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}

function calculateAndRender() {
    const settlement = settlements.find(s => s.value === state.settlementId);
    const travelTotal = state.calcTravelByDays ? state.travelDaily * state.workDays : state.travelFixed;
    const foodTotal = state.calcFoodByDays ? state.foodDaily * state.workDays : state.foodFixed;

    const input = {
        baseSalary: state.baseSalary,
        bonus: state.bonuses,
        shonot: travelTotal,
        otherBenefitValue: foodTotal,
        carValue: state.carValue,
        isPensionEnabled: state.pensionEnabled,
        pensionRate: state.pensionRate / 100,
        isStudyFundEnabled: state.studyFundEnabled,
        studyFundRate: state.studyFundRate / 100,
        isResident: state.residentStatus !== 'foreign',
        gender: state.gender,
        maritalStatus: state.maritalStatus,
        children0: state.children0,
        children1to5: state.children1to5,
        children6to17: state.children6to17,
        children18: state.children18,
        aliyahMonths: state.residentStatus === 'oleh' ? state.aliyahMonths : 0,
        armyService: state.armyService,
        degree: state.degree,
        spouseWorks: state.spouseWorks,
        isAlimony: state.isAlimony,
        settlementRate: settlement ? settlement.rate : 0,
        settlementCeiling: settlement ? settlement.ceiling : 0
    };

    const res = calculateSalary(input, rates);
    renderResults(res);
}

function renderResults(res) {
    if (!res) return;
    const t = locales[state.lang].results;
    const container = document.getElementById('results-container');
    container.innerHTML = '';

    const rows = [
        { label: t.taxableIncome, value: res.taxableIncome },
        { label: t.points + ` (${res.points.toFixed(2)})`, value: res.pointsDiscount, isDeduction: false, color: 'var(--color-accent)' },
        { label: t.grossTax, value: res.grossTax },
        { label: t.pensionBenefit, value: res.pensionTaxBenefit, isDeduction: false, color: 'var(--color-accent)' },
        { label: t.finalTax, value: -res.finalIncomeTax, color: '#f87171' },
        { label: t.bituahLeumi, value: -res.socialSecurity, color: '#f87171' },
        { label: t.healthTax, value: -res.healthTax, color: '#f87171' },
        { label: t.pension, value: -res.pensionDed, color: '#f87171' },
        { label: t.studyFund, value: -res.studyFundDed, color: '#f87171' },
    ];

    rows.forEach(r => {
        const div = document.createElement('div');
        div.className = 'result-row';
        div.innerHTML = `
                    <span>${r.label}</span>
                    <span style="color: ${r.color || 'var(--color-text)'}">${formatCurrency(r.value)}</span>
                `;
        container.appendChild(div);
    });

    document.getElementById('value-netSalary').textContent = formatCurrency(res.netSalary);
}

function formatCurrency(num) {
    return new Intl.NumberFormat('he-IL', { style: 'currency', currency: 'ILS', maximumFractionDigits: 0 }).format(num);
}

// INIT
init();
