#![allow(dead_code)]

fn call_node<S : AsRef<std::ffi::OsStr>>(script : S) -> Vec<u8> {
	use std::process::Command;
	if cfg!(target_os = "windows") {
		Command::new("cmd")
			.args(&["/C".as_ref(), "npm run".as_ref(), script.as_ref()])
			.output()
			.expect("failed to execute process")
			.stdout
	} else {
		Command::new("sh")
			.arg("-c")
			.arg("npm run")
			.arg(script)
			.output()
			.expect("failed to execute process")
			.stdout
	}
}

fn call_node_string<S : AsRef<std::ffi::OsStr>>(script : S) -> String {
	call_node(script).into_iter().map(|i| i as char).collect::<String>()
}

fn call_python<S : AsRef<std::ffi::OsStr>>(script : S) -> Vec<u8> {
	use std::process::Command;
	if cfg!(target_os = "windows") {
		Command::new("cmd")
			.args(&["/C".as_ref(), "python".as_ref(), script.as_ref()])
			.output()
			.expect("failed to execute process")
			.stdout
	} else {
		Command::new("sh")
			.arg("-c")
			.arg("python")
			.arg(script)
			.output()
			.expect("failed to execute process")
			.stdout
	}
}

fn call_python_string<S : AsRef<std::ffi::OsStr>>(script : S) -> String {
	call_python(script).into_iter().map(|i| i as char).collect::<String>()
}

fn send_notif(title : &str, body : &str) {
	use notify_rust::Notification;
	Notification::new()
	.summary(title)
		.action("disable", "Turn Off MoodCam")
	    .body(body)
		.show()
		.unwrap();
}

fn get_pred() {
	call_node_string("readFace");
}

fn run() {
	let input = std::fs::read_to_string("../data.json").unwrap();
	let json_object = json::parse(input.as_str()).unwrap();
	let results = &json_object["results"];
	println!("{}", results);
}

fn main() {
	run();
}