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

fn face_data() -> json::JsonValue {
	use std::time::*;
	let time = SystemTime::now().duration_since(SystemTime::UNIX_EPOCH).unwrap().as_secs();
	let prediction = get_pred();
	let active_app = call_python_string("../python/activeapp.py");

	let mut object = json::object! {
		time : 0,
		prediction : "",
		active_app : ""
	};

	object["time"] = time.into();
	object["prediction"] = prediction.replace("\\\"", "\"").into();
	object["active_app"] = active_app.into();

	object
}

fn main() {
	use std::io::*;
	let mut output_file = std::fs::File::create("../output.txt").unwrap();
	let face_data = face_data();
	let mut data = face_data.as_str().unwrap();
	output_file.write(unsafe { data.as_bytes_mut() }).unwrap();
}