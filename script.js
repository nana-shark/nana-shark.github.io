/**
 * 親の血液型から子供の血液型を予測するJavaScriptファイル
 *
 * ABO式血液型の遺伝法則に基づいています。
 * 遺伝子型（例：A型でもAAとAOがある）を考慮して、可能性のある血液型を算出します。
 */

function predictBloodType() {
    const parent1BloodType = document.getElementById('parent1').value;
    const parent2BloodType = document.getElementById('parent2').value;
    const resultDiv = document.getElementById('result');

    // 親のどちらかがZ型の場合、子供は必ずZ型
    if (parent1BloodType === '荒川型' || parent2BloodType === '荒川型') {
        resultDiv.innerHTML = `おめでとうございます！<br>子供の血液型は<br> <strong>荒川型</strong><br> になります！`;
        resultDiv.style.backgroundColor = '#e8f5e9';
        resultDiv.style.borderColor = '#c8e6c9';
        resultDiv.style.color = '#2e7d32';
        return; // Z型の場合はここで処理を終了
    }

    // 血液型から遺伝子型を推測するヘルパー関数
    // A型 -> [AA, AO]
    // B型 -> [BB, BO]
    // O型 -> [OO]
    // AB型 -> [AB]
    function getGenotypes(bloodType) {
        switch (bloodType) {
            case 'A': return ['AA', 'AO'];
            case 'B': return ['BB', 'BO'];
            case 'O': return ['OO'];
            case 'AB': return ['AB'];
            default: return [];
        }
    }

    // 各血液型の遺伝子表現
    const genotypesMap = {
        'A': ['A', 'A'],
        'B': ['B', 'B'],
        'O': ['O', 'O'],
        'AB': ['A', 'B'],
        'AA': ['A', 'A'],
        'AO': ['A', 'O'],
        'BB': ['B', 'B'],
        'BO': ['B', 'O'],
        'OO': ['O', 'O']
    };

    const possibleParent1Genotypes = getGenotypes(parent1BloodType);
    const possibleParent2Genotypes = getGenotypes(parent2BloodType);

    const possibleChildBloodTypes = new Set();

    // 全ての遺伝子型の組み合わせを試す
    possibleParent1Genotypes.forEach(p1Genotype => {
        const [p1Allele1, p1Allele2] = genotypesMap[p1Genotype];

        possibleParent2Genotypes.forEach(p2Genotype => {
            const [p2Allele1, p2Allele2] = genotypesMap[p2Genotype];

            // 子供の遺伝子型の組み合わせ
            const childAllelePairs = [
                [p1Allele1, p2Allele1],
                [p1Allele1, p2Allele2],
                [p1Allele2, p2Allele1],
                [p1Allele2, p2Allele2]
            ];

            childAllelePairs.forEach(pair => {
                let childBloodType;
                const sortedPair = pair.sort(); // 遺伝子をアルファベット順にソート（例: ['A', 'O'] -> 'AO'）

                if (sortedPair[0] === 'A' && sortedPair[1] === 'A') {
                    childBloodType = 'A';
                } else if (sortedPair[0] === 'A' && sortedPair[1] === 'O') {
                    childBloodType = 'A';
                } else if (sortedPair[0] === 'B' && sortedPair[1] === 'B') {
                    childBloodType = 'B';
                } else if (sortedPair[0] === 'B' && sortedPair[1] === 'O') {
                    childBloodType = 'B';
                } else if (sortedPair[0] === 'O' && sortedPair[1] === 'O') {
                    childBloodType = 'O';
                } else if (sortedPair[0] === 'A' && sortedPair[1] === 'B') {
                    childBloodType = 'AB';
                }
                if (childBloodType) {
                    possibleChildBloodTypes.add(childBloodType);
                }
            });
        });
    });

    const prediction = Array.from(possibleChildBloodTypes).sort().join('型、') + '型';
    
    if (prediction === '') {
        resultDiv.innerHTML = '<strong>エラー: 予測できませんでした。</strong>';
        resultDiv.style.backgroundColor = '#ffebee';
        resultDiv.style.borderColor = '#ffcdd2';
        resultDiv.style.color = '#d32f2f';
    } else {
        resultDiv.innerHTML = `子供の血液型は<br> <strong>${prediction}</strong><br> になる可能性があります。`;
        resultDiv.style.backgroundColor = '#e8f5e9';
        resultDiv.style.borderColor = '#c8e6c9';
        resultDiv.style.color = '#2e7d32';
    }
}
