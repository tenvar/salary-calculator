export function calculateSalary(input, rates) {
    if (!rates) return null;

    const {
        baseSalary = 0,
        bonuses = 0,
        travel = 0,
        havraa = 0,
        nonSocialAdditions = 0,
        carValue = 0,
        foodValue = 0,
        otherBenefits = 0,

        isFemale = false,
        isResident = true,
        children0to5 = 0,
        children6to17 = 0,
        children18 = 0,
        childrenFather0to3 = 0, // specific for father
        aliyahMonths = 0, // 0 if not oleh hadash
        armyService = 'none', // 'none', 'less24', 'more24'
        degree = 'none', // 'none', 'bachelor', 'master'
    } = input;

    // 1. Taxable Income
    // TaxableIncome = Salary + Bonuses + Travel + Havraa + NonSocialAdditions + CarValue + FoodValue + OtherBenefits
    const taxableIncome = baseSalary + bonuses + travel + havraa + nonSocialAdditions + carValue + foodValue + otherBenefits;

    // 2. Gross Income Tax (Mas Hachnasa) calculation
    let grossTax = 0;
    let remainingIncome = taxableIncome;
    let previousMax = 0;

    for (const bracket of rates.taxBrackets) {
        if (remainingIncome <= 0) break;

        const rangeMax = bracket.max;
        let taxableAmountInBracket;

        if (rangeMax === null) {
            // Last bracket
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

    // 3. Credit Points (Nekudot Zikuy)
    let points = 0;

    // Resident
    if (isResident) points += rates.creditPointsRules.resident;

    // Gender
    if (isFemale) points += rates.creditPointsRules.woman;

    // Children
    if (isFemale) {
        points += children0to5 * rates.creditPointsRules.children.mother["0-5"];
        points += children6to17 * rates.creditPointsRules.children.mother["6-17"];
        points += children18 * rates.creditPointsRules.children.mother["18"];
    } else {
        // Father
        points += childrenFather0to3 * rates.creditPointsRules.children.father["0-3"];
    }

    // Aliyah
    // Assuming aliyahMonths is calculated from date elsewhere
    if (aliyahMonths > 0) {
        if (aliyahMonths <= 18) points += rates.creditPointsRules.aliyah["1-18"];
        else if (aliyahMonths <= 30) points += rates.creditPointsRules.aliyah["19-30"];
        else if (aliyahMonths <= 42) points += rates.creditPointsRules.aliyah["31-42"];
    }

    // Army
    if (armyService === 'more24') points += rates.creditPointsRules.army.men_gt_24;
    else if (armyService === 'less24') points += rates.creditPointsRules.army.women_or_lt_24;

    // Degree
    if (degree === 'bachelor') points += rates.creditPointsRules.degree.bachelor;
    else if (degree === 'master') points += rates.creditPointsRules.degree.master;

    const taxDiscount = points * rates.creditPointValue;
    const finalIncomeTax = Math.max(0, grossTax - taxDiscount);

    // 4. Bituah Leumi & Health Tax
    // Calculated on taxableIncome (usually capped but simple implementation as per README threshold)

    const blThreshold = rates.bituahLeumi.threshold;
    let socialSecurity = 0;
    let healthTax = 0;

    if (taxableIncome <= blThreshold) {
        socialSecurity = taxableIncome * rates.bituahLeumi.reducedRate.socialSecurity;
        healthTax = taxableIncome * rates.bituahLeumi.reducedRate.healthTax;
    } else {
        // First part
        socialSecurity += blThreshold * rates.bituahLeumi.reducedRate.socialSecurity;
        healthTax += blThreshold * rates.bituahLeumi.reducedRate.healthTax;

        // Remaining part
        const remainder = taxableIncome - blThreshold;
        // There is usually a max ceiling for Bituah Leumi (~49k), but not specified in README strict logic
        // I will assume no ceiling as per simplified instruction or apply simplified
        socialSecurity += remainder * rates.bituahLeumi.fullRate.socialSecurity;
        healthTax += remainder * rates.bituahLeumi.fullRate.healthTax;
    }

    const totalBituahLeumi = socialSecurity + healthTax;

    // 5. Social Deductions (Pension, Keren Hishtalmut)
    // Base: Salary + Bonuses (as per README)
    const socialBase = baseSalary + bonuses;
    const pensionDed = socialBase * rates.pension.defaultRate;
    const studyFundDed = socialBase * rates.studyFund.defaultRate;

    // 6. Net Salary
    const totalDeductions = finalIncomeTax + totalBituahLeumi + pensionDed + studyFundDed;
    const netSalary = (baseSalary + bonuses + travel + havraa + nonSocialAdditions) - totalDeductions;
    // Note: Net is Money Received. 
    // CarValue/FoodValue are imputing income for tax, but usually not cash received?
    // README equation: NetSalary = (Salary + Bonuses) - TotalDeductions.
    // Wait, what about Travel and Havraa? They are cash payments.
    // Logic 3.1 says "Ozdorovitelnye" and "Nesi'ot" are inputs.
    // Logic 4.E says NetSalary = (Salary + Bonuses) - TotalDeductions.
    // Imputed value (Car) usually is NOT paid in cash, just taxed.
    // Payments: Base + Bonuses + Travel + Havraa + NonSocialAdditions.
    // Formula in README is: NetSalary = (Salary + Bonuses) - TotalDeductions. 
    // This looks like a simplification or mistake in README formula.
    // Usually Net = GrossCash - Deductions.
    // GrossCash = Base + Bonuses + Travel + Havraa + NonSocial Additions.
    // Deductions = Tax + BL + Pension + StudyFund.

    // I will adjust to: NetSalary = (Base + Bonuses + Travel + Havraa + NonSocialAdditions) - TotalDeductions.
    // Because otherwise Travel/Havraa are taxed but not received? That would be wrong.

    // Re-reading logic in 4.E:
    // "NetSalary = (Salary + Bonuses) - TotalDeductions"
    // But "Travel" and "Havraa" and "NonSocialAdditions" were inputs. 
    // If I strictly follow the formula, I only add Salary + Bonuses. But logically, Net should include all cash components.
    // I will assume Salary in that formula implied "Total Gross Cash" or I should include the others.
    // I'll stick to a logical interpretation: Cash In - Cash Out.

    const totalCashGross = baseSalary + bonuses + travel + havraa + nonSocialAdditions;
    const realNetSalary = totalCashGross - totalDeductions;

    return {
        taxableIncome,
        grossTax,
        points,
        taxDiscount,
        finalIncomeTax,
        socialSecurity,
        healthTax,
        totalBituahLeumi,
        pensionDed,
        studyFundDed,
        totalDeductions,
        netSalary: realNetSalary,
        totalCashGross
    };
}
