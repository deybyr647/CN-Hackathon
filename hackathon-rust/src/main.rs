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

fn send_notif(title : &str, body : &str, icon : &str) {
	use notify_rust::Notification;
	Notification::new()
	.summary(title)
	    .body(body)
	    .icon(icon)
		.show()
		.unwrap();
}

fn get_pred () -> String {
	let response = call_node_string("readFace");
	String::from(response.split("|").nth(1).unwrap())
}

struct timestep {
	time : u64,
	prediction : String,
	active_app : String,
}

fn face_data() -> timestep {
	use std::time::*;
	let time = SystemTime::now().duration_since(SystemTime::UNIX_EPOCH).unwrap().as_secs();
	let prediction = get_pred();
	let active_app = call_python_string("../python/activeapp.py");

	timestep {
		time,
		prediction,
		active_app,
	}
}

fn main() {

}