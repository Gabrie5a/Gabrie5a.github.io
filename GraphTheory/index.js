// RNA RECONSTRUCTION PROBLEM
// fragment string with both enzymes and make separate arrays for each enzyme
function fragmentStrand(strand) {
    let G_fragments = [];
    let UC_fragments = [];
    let newFragment = '';
    for (let i = 0; i < strand.length; i++) {
      if (strand[i] === 'G') { 
        newFragment += 'G';
        G_fragments.push(newFragment);
        newFragment = '';
      }
      else {
        newFragment += strand[i];
        if (i === strand.length - 1) {
          G_fragments.push(newFragment);
          newFragment = '';
        }
      }
    }
    for (let i = 0; i < strand.length; i++) {
      if (strand[i] === 'U' || strand[i] === 'C') {
        newFragment += strand[i];
        UC_fragments.push(newFragment);
        newFragment = '';
      }
      else {
        newFragment += strand[i];
        if (i === strand.length - 1) {
          UC_fragments.push(newFragment);
        }
      }
    }
   return { G_fragments, UC_fragments };
}

//refragment array based on enzyme --> separate with '/'
function refragment(fragments, enzyme) {
    let refragmented = [];
    fragments.forEach(fragment => {
        let newFragment = '';
        for (let i = 0; i < fragment.length; i++) {
            let base = fragment[i];
            if (enzyme === 'G') {
                newFragment += (base === 'G' && i !== fragment.length - 1) ? 'G/' : base;
            } else if (enzyme === 'UC') {
                newFragment += ((base === 'U' || base === 'C') && i !== fragment.length - 1) ? base + '/' : base;
            }
        }
        refragmented.push(newFragment);
    });
    console.log(refragmented)
    return refragmented;
}

//check the number of e.b-s in each fragment to determine type and interiorBases
function getFragmentTypes(refragmentedFragments) {
    let singleFragments = [];
    let nonSingleFragments = []; 
    let interiorBases = [];
    refragmentedFragments.forEach(fragment => {
        if (fragment.split('/').length === 1) {
            singleFragments.push(fragment);
        } else {
            nonSingleFragments.push(fragment);
            fragment.split('/').slice(1, -1).forEach(base => {
                interiorBases.push(base);
            });
        }
    });
    return { singleFragments, nonSingleFragments, interiorBases };
}

// identify beginning and end of RNA strand comparing it to the refragmented arrays
function findEndpoints(refragmented_G_fragments, refragmented_UC_fragments, singleFragments, interiorBases){
    //always two more in singleFragments
    let start = "";
    let finish = "";
    //remove all fragments from singleFragments that match interiorBases
    for (let base of interiorBases){
        if(singleFragments.includes(base)){
            singleFragments.splice(singleFragments.indexOf(base), 1);
        }
    }
    //check start and end base of refragmented arrays to see which singleFragment is start or end
    for (let end in singleFragments){
        let noEqual = 0;
        let equal = 0;
        for (let fragment of refragmented_G_fragments){
            fragment.split('/').slice(0, 1).forEach(base => {
                if (base === singleFragments[end]){
                    equal++;
                    if (refragmented_G_fragments.length === equal){
                        start = singleFragments[end];
                        finish = singleFragments[end === 0 ? 1:0];
                    }
                } 
                else {
                    noEqual++;
                    if (refragmented_G_fragments.length === noEqual){
                        finish = singleFragments[end];
                        start = singleFragments[end === 0 ? 1:0];
                    }
                } 
                
            });
            
        }
    }
    if(!start) {
        for (let end in singleFragments){
            let noEqual = 0;
            let equal = 0;
            for (let fragment of refragmented_G_fragments){
                let bases = fragment.split('/');
                if(bases[bases.length-1] === singleFragments[end]){
                    equal++;
                    if (refragmented_G_fragments.length === noEqual){
                        finish = singleFragments[end];
                        start = singleFragments[end == 0 ? 1:0];
                    }
                }
                else {
                    noEqual++;
                    if (refragmented_G_fragments.length === noEqual){
                        start = singleFragments[end];
                        finish = singleFragments[end === 0 ? 1:0];
                    }
                } 
                 
            }
                
        }
    }
    if(!start) {
        for (let end in singleFragments){
            let noEqual = 0;
            let equal = 0;
            for (let fragment of refragmented_UC_fragments){
                fragment.split('/').slice(0, 1).forEach(base => {
                    if (base === singleFragments[end]){
                        equal++;
                        if (refragmented_UC_fragments.length == equal){
                            start = singleFragments[end];
                            finish = singleFragments[end == 0 ? 1:0];
                        }
                    } 
                    else {
                        noEqual++;
                        if (refragmented_UC_fragments.length == noEqual){
                            finish = singleFragments[end];
                            start = singleFragments[end == 0 ? 1:0];
                        }
                    } 
                });
                
            }
        }
    }
    if(!start) {
        for (let end in singleFragments){
            let noEqual = 0;
            let equal = 0;
            console.log(refragmented_UC_fragments);
            for (let fragment of refragmented_UC_fragments){
                let bases = fragment.split('/');
                if (bases[bases.length-1] === singleFragments[end]){
                    equal++;
                    if (refragmented_UC_fragments.length === equal){
                        finish = singleFragments[end];
                        start = singleFragments[end == 0 ? 1:0];
                    }
                } 
                else {
                    noEqual++;
                    if (refragmented_UC_fragments.length == noEqual){
                        start = singleFragments[end];
                        finish = singleFragments[end == 0 ? 1:0];
                    }
                } 
            }
                
        }
    }
    return {start, end: finish};
    
}

// construct the multidigraph based on the refragmemnted fragments
function constructMultidigraph(refragmentedFragments) {
    let totalFragments = 0;
    let multidigraph = {};
    refragmentedFragments.forEach(fragment => {
        let bases = fragment.split('/');
        let start = bases[0];
        let end = bases[bases.length - 1];
        if (!multidigraph[start]) {
            multidigraph[start] = [];
        }
        // fragments can have the same value, so each fragment will need their own identity
        multidigraph[start].push({ end, fragment, uniqueId: totalFragments });
        totalFragments++;
        
    });
    console.log(totalFragments);
    return {multidigraph, totalFragments};
}

// Use DFS to find Eulerian circuits
function findEulerianCircuits(multidigraph, start, end, totalFragments) {
    let eulerianCircuits = [];
    function dfs(node, path, visitedIds) {
        if (path.length === totalFragments) {
            if (node === end) {
                // console.log(path);
                eulerianCircuits.push(path.join("*"));
            }
            return;
        }
        //check if multidigraph has the current beginning e.b
        if (!multidigraph.hasOwnProperty(node)) return;
        for (let fragmentObj of multidigraph[node]) {
            let nextNode = fragmentObj.end;
            let fragment = fragmentObj.fragment;
            let id = fragmentObj.uniqueId;
            // if the fragment has already been used, skip it
            if (visitedIds.includes(id)) continue;
            // add the fragment to the path
            visitedIds.push(id);
            path.push(fragment);
            // recurse with the next fragment
            dfs(nextNode, path, visitedIds);
            // remove last element to backtrack
            path.pop();
            visitedIds.pop();
        }
    }

    // start DFS from the start e.b
    dfs(start, [], []);
    // remove repeated RNA chains
    eulerianCircuits = [...new Set(eulerianCircuits)];
    return eulerianCircuits;
}


function processString(str) {
    // Remove characters preceding '*' until '/'
    let processedString = str.replace(/[^/]*\*/g, '');
    // Remove remaining '/'
    return processedString.replace(/\//g, '');
}
// ---MAIN---
// CALLS ALL FUNCTIONS WITH GIVEN STRAND
function rnaReconstruction(strand){
    // Fragment strand with both enzymes
    let {G_fragments, UC_fragments} = fragmentStrand(strand);
    // 1. Refragment the arrays with respective enzyme
    let refragmented_G_fragments = refragment(G_fragments, 'UC');
    let refragmented_UC_fragments = refragment(UC_fragments, 'G');
    console.log(refragmented_G_fragments);
    //check if strand is made up of only one charcater
    // if (/^[AUGC]$|^([AUGC])\1+$/.test(strand) === true) 
    //     return {G_fragments, UC_fragments, refragmented_G_fragments, refragmented_UC_fragments, potentialStrands: [strand], multidigraph: null};
    // 2. Identify single fragments, non-single fragment and interior bases
    let { singleFragments: G_single, nonSingleFragments: G_nonsingle, interiorBases: G_interior } = getFragmentTypes(refragmented_G_fragments);
    let { singleFragments: UC_single, nonSingleFragments: UC_nonsingle, interiorBases: UC_interior } = getFragmentTypes(refragmented_UC_fragments);
    let singleFragments = G_single.concat(UC_single);
    let interiorBases = G_interior.concat(UC_interior);
    // 3. Find the ends of the fragment
    let {start, end} = findEndpoints(refragmented_G_fragments, refragmented_UC_fragments, singleFragments, interiorBases);
    let nonSingleFragments = G_nonsingle.concat(UC_nonsingle);
    console.log(nonSingleFragments);
    console.log(start, end);
    // 4. Make multidigraph based on non-single fragments
    let {multidigraph, totalFragments} = constructMultidigraph(nonSingleFragments);
    console.log("Multidigraph: ", multidigraph);
    // 5. Retrieve all Eulerian circuits from multidigraph
    let circuits = findEulerianCircuits(multidigraph, start, end, totalFragments);
    let potentialStrands = [];
    for (let circuit of circuits) {
        // remove '/' and '*' characters
        potentialStrands.push(processString(circuit));
    }
    potentialStrands.forEach(strand => console.log(strand));
    return {G_fragments, UC_fragments, refragmented_G_fragments, refragmented_UC_fragments, potentialStrands, multidigraph};
}

//EVENT LISTENER TO RETRIEVE RNA STRAND AND DISPLAY ON MODAL
$("#submit").click(()=>{
    $("#result").show();
    let regex = /^[AUGC]+$/;
    if($("#text").val() !== "" && regex.test($("#text").val()) === true) {
        let {
            G_fragments, UC_fragments, refragmented_G_fragments, refragmented_UC_fragments, potentialStrands, multidigraph
        } = rnaReconstruction($("#text").val());
        
        $("#g_fragments").text(G_fragments);
        $("#uc_fragments").text(UC_fragments);
        $("#g_uc_fragments").text(refragmented_G_fragments);
        $("#uc_g_fragments").text(refragmented_UC_fragments);
        if (multidigraph !== null){
            for (let key in multidigraph) {
                if (Object.hasOwnProperty.call(multidigraph, key)) {
                    let value = multidigraph[key];
                    $("#multidigraph").append($("<p/>").text(key + ": " + JSON.stringify(value)));
                }
            }
        }
        else ($("#multidigraph").text("N/A"));
        potentialStrands.forEach(strand =>{
            $("#circuits").append($("<li/>").text(strand));
        });
    }
    else if (regex.test($("#select :selected").val()) === true) {
        let {
            G_fragments, UC_fragments, refragmented_G_fragments, refragmented_UC_fragments, potentialStrands, multidigraph
        } = rnaReconstruction($("#select :selected").val());
        $("#g_fragments").text(JSON.stringify(G_fragments, null, 2));
        $("#g_uc_fragments").text(JSON.stringify(refragmented_G_fragments, null, 2));
        $("#uc_fragments").text(JSON.stringify(UC_fragments, null, 2));
        $("#uc_g_fragments").text(JSON.stringify(refragmented_UC_fragments, null, 2));
        for (let key in multidigraph) {
            if (Object.hasOwnProperty.call(multidigraph, key)) {
                let value = multidigraph[key];
                $("#multidigraph").append($("<p/>").text(key + ": " + JSON.stringify(value)));
            }
        }
        
        potentialStrands.forEach(strand =>{
            $("#circuits").append($("<li/>").text(strand));
        });
    }
    else {
        console.log($("#select :selected").val());
        $("#result").hide();
        $("#modal-example h3").text("Invalid RNA strand provided");
    }
});

//Make input field readonly when strand is selected
$("#select").on("change",()=>{
    if ($("#select :selected").val() !== ""){
        $("#text").prop("disabled", true);
        $("#text").prop("placeholder", "Unselect RNA strand to input text");
    }
    if ($("#select :selected").val() === ""){
        $("#text").prop("disabled", false);
        $("#text").prop("placeholder", "Strand must be in all capitals with no spaces (ex: AUCGAUGGA)");
    }
});

//Make select form disabled when input field is used
$("#text").on("change", () =>{
    if($("#text").val() === ""){
        $("#select").prop("disabled", false);
        $("#select :selected").text("Select...");
    }
    else {
        $("#select").prop("disabled", true);
        $("#select :selected").text("Clear input field to select");
    }
});

