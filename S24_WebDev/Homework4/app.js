const supabaseKey = 
'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVhd3pqaHZkbG5sZXByeGRia2ZsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTA2MTAwMDUsImV4cCI6MjAyNjE4NjAwNX0.AXRmAAexLyynucrQ591jo4MJkqMgp-_2C_mCg4XNuSc';

const supabaseUrl = 'https://eawzjhvdlnleprxdbkfl.supabase.co';

const _supabase = supabase.createClient(supabaseUrl, supabaseKey);
console.log(supabase);

let signup = document.querySelector("#signup");
signup.addEventListener("click", async(e)=>{
    alert("Loading...");
    e.preventDefault();
    let first_name = document.querySelector("#first_name").value;
    console.log(first_name);
    let last_name = document.querySelector("#last_name").value;
    let email = document.querySelector("#inputEmail14").value;
    let password = document.querySelector("#inputPassword4").value;

    const res = await _supabase.from("newsletter_subs").insert({
        first_name: first_name,
        last_name: last_name,
        email: email,
        password: password,
    });
    console.log(res);
});

