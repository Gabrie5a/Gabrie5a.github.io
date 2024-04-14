//source: https://medium.com/@anthony.vdo/how-to-create-a-subscription-form-with-vanilla-javascript-and-supabase-for-free-3f5f992c87ff
const supabaseKey = 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhd3pqaHZkbG5sZXByeGRia2ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA2MTAwMDUsImV4cCI6MjAyNjE4NjAwNX0.AXRmAAexLyynucrQ591jo4MJkqMgp-_2C_mCg4XNuSc';

const supabaseUrl = 'https://eawzjhvdlnleprxdbkfl.supabase.co';

const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
console.log(_supabase);

let signup = document.querySelector("#signup");
signup.addEventListener("click", async(e)=>{
    e.preventDefault();
    let first_name = document.querySelector("#first_name").value;
    // console.log(first_name);
    let last_name = document.querySelector("#last_name").value;
    let email = document.querySelector("#inputEmail14").value;
    let table_id = 0;
    if(first_name != "" && last_name != "" && email != ""){
        const {data, error} = await _supabase
        .from("newsletter_subs")
        .insert({
            first_name: first_name,
            last_name: last_name,
            email: email,
        }).select();
        table_id = data[0].id;
        console.log(table_id);
        alert("You have been added to our Newsletter!");
    }
    else{
        console.log("Unable to add to database");
        alert("We were unable to add you ;(\nMake sure to fill out all your information!");
    }
    
 });

