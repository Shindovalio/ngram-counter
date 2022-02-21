export default function getNgram(body, ngram, case_sensitive, length) {

    // Default values
    body = body.replace(/ /g, '');
    ngram = ngram || 1;
    length = length || 100;

    if (!case_sensitive) {
        body = body.toUpperCase();
    }

    let ngramsArray = [];

    // Create the ngram array
    for (let i = 0; i < body.length - (ngram - 1); i++) {
        let subNgramsArray = "";

        for (let j = 0; j < ngram; j++) {
            subNgramsArray = subNgramsArray + body[i + j];
        }

        ngramsArray.push(subNgramsArray);
    }

    // Count the ngrams and sort by descending order
    let finalArray = [];
    while (ngramsArray.length != 0) {
        let duplicateCount = 0;

        for (let j = 0; j < ngramsArray.length; j++) {
            if (ngramsArray[0] == ngramsArray[j]) duplicateCount++;
        }
        let subDict = { count: duplicateCount, ngram: ngramsArray[0] };
        finalArray.push(subDict);
        ngramsArray = ngramsArray.filter(a => a !== ngramsArray[0]);
    }

    finalArray.sort((a, b) => b.count - a.count)

    return finalArray.slice(0, length);
}