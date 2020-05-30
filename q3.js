//method1 為同步進行的 function
// 所以運作的步驟為
// 1. Run delay_print_callback (第1個)
// 2. Run delay_print_callback (第2個)
// 3. 第一步驟和第二步驟的程序同時進行
// 4. Run console.log(1); 或 console.log(2);（看誰先做完）
// 5. Run console.log(1); 或 console.log(2);（看誰後做完）
function method1() {
	console.log("method1 為同步進行的 function");
	console.log("所以運作的步驟為:");
	console.log("Run delay_print_callback (第1個)");
	delay_print_callback(() => {
		console.log(1);
	});
	console.log("Run delay_print_callback (第2個)");
	delay_print_callback(() => { 
		console.log(2);
	}); 
}

function delay_print_callback(callback) {
	//這裡的程式會影響 method1內的完成先後順序
	callback();
}

// method2 為非同步進行的 function
// 程式內可使用await進行等待
// 所以運作的步驟為
// 1. Run delay_print_promise
// 2. 等待第1步的Promise resolve
// 3. Run console.log(1);
// 4. Run delay_print_promise
// 5. 等待第4步的Promise resolve
// 6. Run console.log(2);
async function method2() { 
	console.log("method2 為非同步進行的 function");
	console.log("程式內可使用await進行等待");
	console.log("所以運作的步驟為:");
	console.log("1. Run 第1個 delay_print_promise");
	console.log("2. 等待第1步的Promise resolve");
	await delay_print_promise(); 
	console.log(1);
	console.log("4. Run 第2個 delay_print_promise");
	console.log("5. 等待第4步的Promise resolve");
	await delay_print_promise(); 
	console.log(2);
}

function delay_print_promise(){
	return new Promise((resolve, reject) => {
		resolve();
	})
}