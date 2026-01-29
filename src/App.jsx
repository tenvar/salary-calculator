import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { calculateSalary } from './utils/calculate';
import { locales } from './utils/locales';

// SVG Icons
const Icons = {
    Calculator: () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="16" height="20" x="4" y="2" rx="2" /><line x1="8" x2="16" y1="6" y2="6" /><line x1="16" x2="16" y1="14" y2="18" /><path d="M16 10h.01" /><path d="M12 10h.01" /><path d="M8 10h.01" /><path d="M12 14h.01" /><path d="M8 14h.01" /><path d="M12 18h.01" /><path d="M8 18h.01" /></svg>,
    Moon: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" /></svg>,
    Sun: () => <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
};

const InputField = ({ label, value, onChange, type = "number", min = 0, step = 1 }) => (
    <div className="input-group">
        <label>{label}</label>
        <input
            type={type}
            value={value}
            onChange={(e) => onChange(type === 'number' ? Number(e.target.value) : e.target.value)}
            min={min}
            step={step}
        />
    </div>
);

const SelectField = ({ label, value, onChange, options }) => (
    <div className="input-group">
        <label>{label}</label>
        <select value={value} onChange={(e) => onChange(e.target.value)}>
            {options.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
        </select>
    </div>
);

function App() {
    const [lang, setLang] = useState('ru');
    const [rates, setRates] = useState(null);
    const [isDark, setIsDark] = useState(false); // Simplified dark mode toggle

    const [input, setInput] = useState({
        baseSalary: 10000,
        bonuses: 0,
        travel: 0,
        havraa: 0,
        nonSocialAdditions: 0,
        carValue: 0,
        foodValue: 0,
        otherBenefits: 0,

        isFemale: false, // false = male, true = female (simplification) - but better to use select
        gender: 'male',
        isResident: true,
        residentStatus: 'regular',

        children0to5: 0,
        children6to17: 0,
        children18: 0,
        childrenFather0to3: 0,

        aliyahMonths: 0,
        armyService: 'none',
        degree: 'none'
    });

    useEffect(() => {
        fetch('/rates.json')
            .then(res => res.json())
            .then(setRates)
            .catch(err => console.error("Failed to load rates", err));
    }, []);

    const t = locales[lang];
    const isRtl = lang === 'he';

    const updateInput = (field, value) => {
        setInput(prev => {
            const newData = { ...prev, [field]: value };
            // Side effects for derived booleans
            if (field === 'gender') newData.isFemale = value === 'female';
            if (field === 'residentStatus') {
                newData.isResident = value !== 'non-resident'; // Assuming non-resident option logic if needed
                if (value !== 'oleh') newData.aliyahMonths = 0;
            }
            return newData;
        });
    };

    const result = useMemo(() => calculateSalary(input, rates), [input, rates]);

    const formatCurrency = (val) => {
        return new Intl.NumberFormat(lang === 'he' ? 'he-IL' : lang === 'ru' ? 'ru-RU' : 'en-IL', {
            style: 'currency',
            currency: 'ILS',
            maximumFractionDigits: 0
        }).format(val || 0);
    };

    // Derived logic for inputs visibility
    const showFatherKids = input.gender === 'male';
    const showMotherKids = input.gender === 'female';
    const showAliyah = input.residentStatus === 'oleh';

    return (
        <div className={`app-container ${isRtl ? 'rtl' : 'ltr'}`} dir={isRtl ? 'rtl' : 'ltr'}
            style={{ minHeight: '100vh', paddingBottom: '3rem', transition: 'background 0.3s' }}>

            {/* Header */}
            <header style={{
                background: 'var(--color-card-bg)',
                borderBottom: '1px solid var(--color-border)',
                padding: '1rem 0'
            }}>
                <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                        <div style={{ color: 'var(--color-primary)' }}><Icons.Calculator /></div>
                        <div>
                            <h1 style={{ fontSize: '1.25rem' }}>{t.title}</h1>
                            <span style={{ fontSize: '0.85rem', color: 'gray' }}>{t.subtitle}</span>
                        </div>
                    </div>

                    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                        {/* Language Switcher */}
                        <select
                            value={lang}
                            onChange={(e) => setLang(e.target.value)}
                            style={{ padding: '0.5rem', borderRadius: '6px' }}
                        >
                            <option value="ru">Русский</option>
                            <option value="en">English</option>
                            <option value="he">עברית</option>
                        </select>

                        {/* Dark Mode Toggle - just for fun/polish */}
                        {/* <button onClick={() => setIsDark(!isDark)} style={{ background: 'none', border: 'none', color: 'var(--color-text)' }}>
               {isDark ? <Icons.Sun /> : <Icons.Moon />}
             </button> */}
                    </div>
                </div>
            </header>

            {/* Main Content */}
            <main className="container grid grid-2" style={{ marginTop: '2rem', alignItems: 'start' }}>

                {/* INPUTS COLUMN */}
                <div className="card">
                    <h2 style={{ marginBottom: '1.5rem', color: 'var(--color-primary)' }}>{t.sections.financial}</h2>

                    <InputField label={t.labels.baseSalary} value={input.baseSalary} onChange={v => updateInput('baseSalary', v)} />
                    <InputField label={t.labels.bonuses} value={input.bonuses} onChange={v => updateInput('bonuses', v)} />
                    <InputField label={t.labels.travel} value={input.travel} onChange={v => updateInput('travel', v)} />
                    <InputField label={t.labels.havraa} value={input.havraa} onChange={v => updateInput('havraa', v)} />

                    {/* Accordion or secondary section could be nice, but simple for now */}
                    <div style={{ padding: '1rem', background: 'var(--color-bg)', borderRadius: '8px', marginTop: '1rem' }}>
                        <h4 style={{ marginBottom: '1rem', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{t.labels.otherBenefits}</h4>
                        <InputField label={t.labels.carValue} value={input.carValue} onChange={v => updateInput('carValue', v)} />
                        <InputField label={t.labels.foodValue} value={input.foodValue} onChange={v => updateInput('foodValue', v)} />
                        <InputField label={t.labels.nonSocial} value={input.nonSocialAdditions} onChange={v => updateInput('nonSocialAdditions', v)} />
                    </div>

                    <h2 style={{ margin: '2rem 0 1.5rem', color: 'var(--color-secondary)' }}>{t.sections.personal}</h2>

                    <div className="grid grid-2" style={{ gridTemplateColumns: '1fr 1fr' }}>
                        <SelectField
                            label={t.labels.gender}
                            value={input.gender}
                            onChange={v => updateInput('gender', v)}
                            options={[
                                { value: 'male', label: t.labels.male },
                                { value: 'female', label: t.labels.female }
                            ]}
                        />
                        <SelectField
                            label={t.labels.resident}
                            value={input.residentStatus}
                            onChange={v => updateInput('residentStatus', v)}
                            options={[
                                { value: 'regular', label: t.labels.regular },
                                { value: 'oleh', label: t.labels.oleh }
                            ]}
                        />
                    </div>

                    {showAliyah && (
                        <InputField label={t.labels.aliyahMonths} value={input.aliyahMonths} onChange={v => updateInput('aliyahMonths', v)} />
                    )}

                    <div style={{ marginTop: '1rem' }}>
                        <label style={{ marginBottom: '0.5rem', display: 'block' }}>{t.labels.children}</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
                            {showMotherKids && (
                                <>
                                    <InputField label={t.labels.children05} value={input.children0to5} onChange={v => updateInput('children0to5', v)} />
                                    <InputField label={t.labels.children617} value={input.children6to17} onChange={v => updateInput('children6to17', v)} />
                                    <InputField label={t.labels.children18} value={input.children18} onChange={v => updateInput('children18', v)} />
                                </>
                            )}
                            {showFatherKids && (
                                <InputField label={t.labels.childrenFather03} value={input.childrenFather0to3} onChange={v => updateInput('childrenFather0to3', v)} />
                            )}
                            {/* Always show some generic if desired, but sticking to requested logic */}
                        </div>
                    </div>

                    <div style={{ marginTop: '1rem' }}>
                        <SelectField
                            label={t.labels.army}
                            value={input.armyService}
                            onChange={v => updateInput('armyService', v)}
                            options={[
                                { value: 'none', label: t.labels.none },
                                { value: 'less24', label: t.labels.less24 },
                                { value: 'more24', label: t.labels.more24 }
                            ]}
                        />
                        <SelectField
                            label={t.labels.degree}
                            value={input.degree}
                            onChange={v => updateInput('degree', v)}
                            options={[
                                { value: 'none', label: t.labels.noDegree },
                                { value: 'bachelor', label: t.labels.bachelor },
                                { value: 'master', label: t.labels.master }
                            ]}
                        />
                    </div>
                </div>

                {/* RESULTS COLUMN */}
                <div style={{ position: 'sticky', top: '2rem' }}>
                    {!rates ? (
                        <div className="card">Loading rates...</div>
                    ) : (
                        <motion.div
                            className="card"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            key={lang} // simple remount on lang change for simplicity
                        >
                            <h2 style={{ marginBottom: '1.5rem' }}>{t.sections.results}</h2>

                            <div className="result-row">
                                <span>{t.results.taxableIncome}</span>
                                <span className="result-value">{formatCurrency(result.taxableIncome)}</span>
                            </div>

                            <div style={{ margin: '1rem 0', padding: '1rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '8px' }}>
                                <div className="result-row" style={{ border: 'none', fontSize: '0.9rem' }}>
                                    <span>{t.results.points} (x{formatCurrency(rates.creditPointValue)})</span>
                                    <span className="result-value">{result.points.toFixed(2)}</span>
                                </div>
                            </div>

                            <div className="result-row">
                                <span>{t.results.grossTax}</span>
                                <span className="result-value" style={{ color: 'orange' }}>{formatCurrency(result.grossTax)}</span>
                            </div>
                            <div className="result-row">
                                <span>{t.results.pointsValue}</span>
                                <span className="result-value" style={{ color: 'green' }}>-{formatCurrency(result.taxDiscount)}</span>
                            </div>
                            <div className="result-row" style={{ fontWeight: 'bold' }}>
                                <span>{t.results.finalTax}</span>
                                <span className="result-value" style={{ color: 'red' }}>-{formatCurrency(result.finalIncomeTax)}</span>
                            </div>

                            <div className="result-row">
                                <span>{t.results.totalBituahLeumi}</span>
                                <span className="result-value" style={{ color: 'red' }}>-{formatCurrency(result.totalBituahLeumi)}</span>
                            </div>

                            <div className="result-row">
                                <span>{t.results.pension} + {t.results.studyFund}</span>
                                <span className="result-value" style={{ color: 'red' }}>-{formatCurrency(result.pensionDed + result.studyFundDed)}</span>
                            </div>

                            <div className="net-salary">
                                <span>{t.results.netSalary}</span>
                                <motion.span
                                    key={result.netSalary}
                                    initial={{ scale: 1.2, color: '#22c55e' }}
                                    animate={{ scale: 1, color: '#22c55e' }}
                                >
                                    {formatCurrency(result.netSalary)}
                                </motion.span>
                            </div>
                            <div style={{ textAlign: 'right', fontSize: '0.8rem', color: 'gray', marginTop: '0.5rem' }}>
                                {Math.round((result.netSalary / result.totalCashGross) * 100)}% of Gross
                            </div>

                        </motion.div>
                    )}
                </div>

            </main>
        </div>
    );
}

export default App;
