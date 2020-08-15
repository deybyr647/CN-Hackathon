#![allow(dead_code)]

use notify_rust::Notification;

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
	Notification::new()
	    .summary(title)
	    .body(body)
	    .icon(icon)
		.show()
		.unwrap();
}

fn get_face () -> String {
	let img_output = call_python_string("../python/cameracapture.py");
	format!("data:image/jpg;base64,{}", img_output)
}

fn main() {
}