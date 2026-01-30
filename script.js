const translations = {
    ru: {
        app_title: "Калькулятор Зарплаты Израиль 2025",
        financial_data: "Финансовые данные",
        base_salary: "Базовая зарплата (Брутто)",
        bonuses: "Бонусы / Комиссионные",
        car_value: "Стоимость авто (Шови Рехев)",
        food_value: "Телефон / Еда (Шови)",
        personal_data: "Личные данные",
        gender: "Пол",
        male: "Мужской",
        female: "Женский",
        resident_status: "Статус",
        resident: "Резидент",
        oleh_hadash: "Новый репатриант (Oleh Hadash)",
        aliyah_date: "Дата репатриации",
        children: "Дети",
        age_0_5: "0-5 лет",
        age_6_17: "6-17 лет",
        age_18: "18 лет",
        army_service: "Служба в армии",
        none: "Не служил",
        none_education: "Нет",
        less_24: "< 24 мес",
        more_24: "> 24 мес",
        army_recent: "Закончил службу в последние 36 мес?",
        education: "Образование",
        bachelor: "Бакалавр",
        master: "Магистр",
        results: "Результаты",
        net_salary: "Нетто Зарплата",
        taxable_income: "Налогооблагаемая база",
        income_tax: "Подоходный налог",
        credit_points_value: "Льготные единицы",
        bituah_leumi: "Битуах Леуми",
        health_tax: "Налог на здоровье",
        pension: "Пенсия",
        study_fund: "Керен Иштальмут",
        total_deductions: "Всего вычетов"
    },
    en: {
        app_title: "Salary Calculator Israel 2025",
        financial_data: "Financial Data",
        base_salary: "Base Salary (Brutto)",
        bonuses: "Bonuses / Commissions",
        car_value: "Car Value (Shovi Rechev)",
        food_value: "Phone / Food Value",
        personal_data: "Personal Data",
        gender: "Gender",
        male: "Male",
        female: "Female",
        resident_status: "Status",
        resident: "Resident",
        oleh_hadash: "New Immigrant (Oleh Hadash)",
        aliyah_date: "Aliyah Date",
        children: "Children",
        age_0_5: "0-5 y.o.",
        age_6_17: "6-17 y.o.",
        age_18: "18 y.o.",
        army_service: "Army Service",
        none: "None",
        none_education: "None",
        less_24: "< 24 months",
        more_24: "> 24 months",
        army_recent: "Discharged within last 36 months?",
        education: "Education",
        bachelor: "Bachelor",
        master: "Master",
        results: "Results",
        net_salary: "Net Salary",
        taxable_income: "Taxable Income",
        income_tax: "Income Tax",
        credit_points_value: "Credit Points",
        bituah_leumi: "Bituah Leumi",
        health_tax: "Health Tax",
        pension: "Pension",
        study_fund: "Study Fund",
        total_deductions: "Total Deductions"
    },
    he: {
        app_title: "מחשבון שכר 2025",
        financial_data: "נתונים כספיים",
        base_salary: "שכר בסיס (ברוטו)",
        bonuses: "בונוסים / עמלות",
        car_value: "שווי רכב",
        food_value: "שווי ארוחות / טלפון",
        personal_data: "נתונים אישיים",
        gender: "מין",
        male: "זכר",
        female: "נקבה",
        resident_status: "סטטוס",
        resident: "תושב",
        oleh_hadash: "עולה חדש",
        aliyah_date: "תאריך עלייה",
        children: "ילדים",
        age_0_5: "גיל 0-5",
        age_6_17: "גיל 6-17",
        age_18: "גיל 18",
        army_service: "שירות צבאי",
        none: "לא שירת",
        none_education: "ללא",
        less_24: "פחות מ-24 חודשים",
        more_24: "יותר מ-24 חודשים",
        army_recent: "השתחרר ב-36 החודשים האחרונים?",
        education: "השכלה",
        bachelor: "תואר ראשון",
        master: "תואר שני",
        results: "תוצאות",
        net_salary: "שכר נטו",
        taxable_income: "הכנסה חייבת במס",
        income_tax: "מס הכנסה",
        credit_points_value: "נקודות זיכוי",
        bituah_leumi: "ביטוח לאומי",
        health_tax: "מס בריאות",
        pension: "פנסיה",
        study_fund: "קרן השתלמות",
        total_deductions: "סך הכל ניכויים"
    }
};

let rates = null;
let currentLang = 'ru';

const DEFAULT_RATES = {
  "income_tax": {
    "brackets": [
      { "rate": 0.10, "min": 0, "max": 7010 },
      { "rate": 0.14, "min": 7011, "max": 10060 },
      { "rate": 0.20, "min": 10061, "max": 16150 },
      { "rate": 0.31, "min": 16151, "max": 22440 },
      { "rate": 0.35, "min": 22441, "max": 46690 },
      { "rate": 0.47, "min": 46691, "max": null }
    ],
    "mas_yasef": {
      "threshold": 58000,
      "rate": 0.03
    }
  },
  "credit_points": {
    "value": 242,
    "base": 2.25,
    "gender": {
      "female": 0.5
    },
    "children": {
      "mother": [
        { "min_age": 0, "max_age": 5, "points": 2.5 },
        { "min_age": 6, "max_age": 17, "points": 1.0 },
        { "min_age": 18, "max_age": 18, "points": 0.5 }
      ],
      "father": [
        { "min_age": 0, "max_age": 3, "points": 2.5 }
      ]
    },
    "oleh_hadash": [
      { "min_month": 1, "max_month": 18, "points": 0.25 },
      { "min_month": 19, "max_month": 30, "points": 0.166666667 },
      { "min_month": 31, "max_month": 42, "points": 0.083333333 }
    ],
    "army": {
      "validity_months": 36,
      "male_long": 2.0,
      "female_or_short": 1.0
    },
    "degree": {
      "bachelor": 1.0,
      "master": 0.5
    }
  },
  "bituah_leumi": {
    "threshold": 7522,
    "rates": {
      "low": {
        "insurance": 0.0040,
        "health": 0.0310
      },
      "high": {
        "insurance": 0.0395,
        "health": 0.0500
      }
    }
  },
  "social": {
    "pension_rate": 0.06,
    "study_fund_rate": 0.025,
    "study_fund_limit": 15712
  }
};

async function init() {
    try {
        const response = await fetch('rates.json');
        if (!response.ok) throw new Error('Failed to load rates');
        rates = await response.json();
    } catch (e) {
        console.warn("Failed to load rates.json (likely CORS), using default rates.", e);
        rates = DEFAULT_RATES;
    }

    calculate();
    setupEventListeners();
    updateLanguage('ru');
}

function setupEventListeners() {
    document.querySelectorAll('input, select').forEach(el => {
        el.addEventListener('input', calculate);
    });

    document.querySelectorAll('.lang-switcher button').forEach(btn => {
        btn.addEventListener('click', (e) => updateLanguage(e.target.dataset.lang));
    });

    document.getElementById('residentStatus').addEventListener('change', toggleAliyahDate);
    document.getElementById('armyService').addEventListener('change', toggleArmyCheckbox);
}

function toggleAliyahDate() {
    const status = document.getElementById('residentStatus').value;
    const group = document.getElementById('aliyahDateGroup');
    if (status === 'oleh_hadash') {
        group.classList.remove('hidden');
    } else {
        group.classList.add('hidden');
        document.getElementById('aliyahDate').value = '';
        calculate();
    }
}

function toggleArmyCheckbox() {
    const service = document.getElementById('armyService').value;
    const group = document.getElementById('armyDischargeGroup');
    if (service !== 'none') {
        group.classList.remove('hidden');
    } else {
        group.classList.add('hidden');
        document.getElementById('armyRecent').checked = false;
        calculate();
    }
}

function updateLanguage(lang) {
    currentLang = lang;
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';

    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.dataset.i18n;
        if (translations[lang][key]) {
            if (el.tagName === 'INPUT' && el.type === 'placeholder') {
                el.placeholder = translations[lang][key];
            } else if (el.tagName === 'OPTION') {
                el.innerText = translations[lang][key];
            } else if (el.children.length === 0) {
                 el.innerText = translations[lang][key];
            }
        }
    });

     document.querySelectorAll('span[data-i18n], h1[data-i18n], h2[data-i18n], label[data-i18n], option[data-i18n]').forEach(el => {
          if (translations[lang][el.dataset.i18n]) {
              el.innerText = translations[lang][el.dataset.i18n];
          }
     });


    document.querySelectorAll('.lang-switcher button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });
}

function calculate() {
    if (!rates) return;

    // 1. Get Inputs
    const baseSalary = parseFloat(document.getElementById('baseSalary').value) || 0;
    const bonuses = parseFloat(document.getElementById('bonuses').value) || 0;
    const carValue = parseFloat(document.getElementById('carValue').value) || 0;
    const foodValue = parseFloat(document.getElementById('foodValue').value) || 0;

    const gender = document.getElementById('gender').value;
    const residentStatus = document.getElementById('residentStatus').value;
    const aliyahDateStr = document.getElementById('aliyahDate').value;

    const children0_5 = parseFloat(document.getElementById('children0_5').value) || 0;
    const children6_17 = parseFloat(document.getElementById('children6_17').value) || 0;
    const children18 = parseFloat(document.getElementById('children18').value) || 0;

    const armyService = document.getElementById('armyService').value;
    const armyRecent = document.getElementById('armyRecent').checked;

    const education = document.getElementById('education').value;

    // 2. Taxable Income
    const taxableIncome = baseSalary + bonuses + carValue + foodValue;

    // 3. Income Tax (Gross)
    let grossTax = 0;
    let previousMax = 0;

    for (const bracket of rates.income_tax.brackets) {
        if (taxableIncome > previousMax) {
            const maxForBracket = bracket.max === null ? Infinity : bracket.max;

            const taxableInBracket = Math.min(taxableIncome, maxForBracket) - previousMax;

            if (taxableInBracket > 0) {
                grossTax += taxableInBracket * bracket.rate;
            }
            previousMax = maxForBracket;
        } else {
            break;
        }
    }

    // Mas Yasef (Surtax)
    if (taxableIncome > rates.income_tax.mas_yasef.threshold) {
        grossTax += (taxableIncome - rates.income_tax.mas_yasef.threshold) * rates.income_tax.mas_yasef.rate;
    }

    // 4. Credit Points
    let points = rates.credit_points.base; // 2.25

    if (gender === 'female') {
        points += rates.credit_points.gender.female;
    }

    // Children
    if (gender === 'female') {
        // Mother rules
        points += children0_5 * rates.credit_points.children.mother[0].points;
        points += children6_17 * rates.credit_points.children.mother[1].points;
        points += children18 * rates.credit_points.children.mother[2].points;
    } else {
        // Father rules
        points += children0_5 * rates.credit_points.children.father[0].points;
    }

    // Aliyah
    if (residentStatus === 'oleh_hadash' && aliyahDateStr) {
        const aliyahDate = new Date(aliyahDateStr);
        const today = new Date();
        const monthsDiff = (today.getFullYear() - aliyahDate.getFullYear()) * 12 + (today.getMonth() - aliyahDate.getMonth());

        if (monthsDiff >= 0) {
            for (const rule of rates.credit_points.oleh_hadash) {
                if (monthsDiff + 1 >= rule.min_month && monthsDiff + 1 <= rule.max_month) {
                     points += rule.points;
                     break;
                }
            }
        }
    }

    // Army
    if (armyService !== 'none' && armyRecent) {
        if (gender === 'male' && armyService === 'gt_24') {
             points += rates.credit_points.army.male_long;
        } else {
             points += rates.credit_points.army.female_or_short;
        }
    }

    // Education
    if (education === 'bachelor') {
        points += rates.credit_points.degree.bachelor;
    } else if (education === 'master') {
        points += rates.credit_points.degree.master;
    }

    const creditPointsValue = points * rates.credit_points.value;

    // Final Income Tax
    const finalIncomeTax = Math.max(0, grossTax - creditPointsValue);

    // 5. Bituah Leumi & Health Tax
    let bituahLeumi = 0;
    let healthTax = 0;

    const blThreshold = rates.bituah_leumi.threshold;

    if (taxableIncome <= blThreshold) {
        bituahLeumi += taxableIncome * rates.bituah_leumi.rates.low.insurance;
        healthTax += taxableIncome * rates.bituah_leumi.rates.low.health;
    } else {
        // Lower part
        bituahLeumi += blThreshold * rates.bituah_leumi.rates.low.insurance;
        healthTax += blThreshold * rates.bituah_leumi.rates.low.health;

        // Upper part
        const remainder = taxableIncome - blThreshold;
        bituahLeumi += remainder * rates.bituah_leumi.rates.high.insurance;
        healthTax += remainder * rates.bituah_leumi.rates.high.health;
    }

    // 6. Pension & Study Fund
    const socialBase = baseSalary + bonuses;
    const pension = socialBase * rates.social.pension_rate;
    const studyFund = socialBase * rates.social.study_fund_rate;

    // 7. Netto
    const totalDeductions = finalIncomeTax + bituahLeumi + healthTax + pension + studyFund;
    const netSalary = (baseSalary + bonuses) - totalDeductions;

    // Update UI
    document.getElementById('netSalaryVal').innerText = formatCurrency(netSalary);
    document.getElementById('taxableIncomeVal').innerText = formatCurrency(taxableIncome);
    document.getElementById('incomeTaxVal').innerText = formatCurrency(finalIncomeTax);
    document.getElementById('creditPointsVal').innerText = formatCurrency(creditPointsValue);
    document.getElementById('creditPointsCount').innerText = `(${points.toFixed(2)} pts)`;
    document.getElementById('bituahLeumiVal').innerText = formatCurrency(bituahLeumi);
    document.getElementById('healthTaxVal').innerText = formatCurrency(healthTax);
    document.getElementById('pensionVal').innerText = formatCurrency(pension);
    document.getElementById('studyFundVal').innerText = formatCurrency(studyFund);
    document.getElementById('totalDeductionsVal').innerText = formatCurrency(totalDeductions);
}

function formatCurrency(num) {
    return num.toLocaleString('en-IL', { style: 'currency', currency: 'ILS' });
}

init();
