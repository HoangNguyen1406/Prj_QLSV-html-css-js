
/** @type {HTMLFormElement} */
const form = document.querySelector('#form');
const table = document.querySelector('#tableList').querySelector('tbody');

// --
var btnSave = ()=>{
    document.querySelector('#update').style.display='none';
    document.querySelector('#delete').style.display='none';

    document.querySelector('#save').style.display='block';
    document.querySelector('#cancel').style.display='block';
}

var btnCancel = ()=>{
    document.querySelector('#update').style.display='block';
    document.querySelector('#delete').style.display='block';

    document.querySelector('#save').style.display='none';
    document.querySelector('#cancel').style.display='none';
}

// --
// xử lý thêm dữ HS
var add = ()=>{
    const MaSV = document.querySelector('#MaSV');
    const TenSV = document.querySelector('#TenSV');
    const Email = document.querySelector('#Email');
    const SDT = document.querySelector('#Number');
    const Toan = document.querySelector('#Math');
    const Ly = document.querySelector('#Physic');
    const Hoa = document.querySelector('#Chemistry');

    let toan = parseFloat(Toan.value) || 0.0;
    let ly = parseFloat(Ly.value) || 0.0;
    let hoa = parseFloat(Hoa.value) || 0.0;

    let diemTB = ((toan+ly+hoa)/3).toFixed(1);
    let diem = parseFloat(diemTB);

    if(diemTB < 4)
        var mss = "Yếu";
    else if(diemTB < 7)
            var mss = "Trung bình";
        else if(diemTB < 8)
                var mss = "Khá"
            else var mss = "Giỏi"

    const row = table.insertRow();

    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);
    const cell5 = row.insertCell(4);
    const cell6 = row.insertCell(5);
    const cell7 = row.insertCell(6);
    const cell8 = row.insertCell(7);
    const cell9 = row.insertCell(8);
    const cell10 = row.insertCell(9);

    const input = document.createElement('input');
    input.className = 'checkbox';
    input.type = 'checkbox';

    cell1.appendChild(input);
    cell2.append(MaSV.value);
    cell3.append(TenSV.value);
    cell4.append(Email.value);
    cell5.append(SDT.value);
    cell6.append(toan);
    cell7.append(ly);
    cell8.append(hoa);
    cell9.append(diem);
    cell10.append(mss);
}

// xử lý sửa chuyển dữ liệu sang text
var Values = [];
var update = ()=>{
    const selected = document.querySelectorAll(".checkbox");
    selected.forEach((sl,index) =>{
        if(sl.checked){
            const td = sl.parentElement.parentElement.querySelectorAll('td');
            for(let i=1;i<td.length-2;i++){
                Values[i - 1] = td[i].innerText;
                const input = document.createElement("input");
                input.type="text";
                input.style.width="60px";
                input.value=td[i].innerText;
                td[i].innerText = '';
                td[i].appendChild(input);
            }
        }
    });
}

// xử lý checkbox và xoá
var delete_fnc = ()=>{
    const selected = document.querySelectorAll(".checkbox");

    selected.forEach(sl =>{
        if(sl.checked)
            sl.parentElement.parentElement.remove();
    });
};

//lưu
var save = () => {
    document.querySelectorAll(".checkbox").forEach(sl => {
        if (sl.checked) {
            const td = sl.parentElement.parentElement.querySelectorAll('td');
            const checkbox = document.createElement('input');
            checkbox.type = "checkbox";
            checkbox.className= "checkbox";
            td[0].appendChild(checkbox);
            td[1].innerText = td[1].querySelector('input').value;
            td[2].innerText = td[2].querySelector('input').value;
            td[3].innerText = td[3].querySelector('input').value;
            td[4].innerText = td[4].querySelector('input').value;

            const toanInput = td[5].querySelector('input');
            const lyInput = td[6].querySelector('input');
            const hoaInput = td[7].querySelector('input');

            if (!toanInput || !lyInput || !hoaInput) return;

            const toan = parseFloat(toanInput.value) || 0;
            const ly = parseFloat(lyInput.value) || 0;
            const hoa = parseFloat(hoaInput.value) || 0;

            const diemTB = ((toan + ly + hoa) / 3).toFixed(1);

            let mss = diemTB < 4 ? "Yếu" : diemTB < 7 ? "Trung bình" : diemTB < 9 ? "Khá" : "Giỏi";

            td[8].innerText = diemTB;
            td[9].innerText = mss;

            [5, 6, 7].forEach(i => {
                td[i].innerText = td[i].querySelector('input').value;
            });
            td.forEach(par =>{
                const input = par.querySelector('input');
                if(input)
                    par.querySelector("input").remove();
            })
        }
    });
};
// huỷ
function cancel() {
    document.querySelectorAll(".checkbox").forEach(sl => {
        if (sl.checked) {
            const td = sl.parentElement.parentElement.querySelectorAll('td');

            // Khôi phục dữ liệu ban đầu
            for (let i = 1; i <= 7; i++) {
                const input = td[i].querySelector('input');
                if (input) input.remove();
                td[i].innerText = Values[i - 1]; // Gán lại giá trị cũ
            }

            // Khôi phục điểm trung bình và xếp loại
            const toan = parseFloat(Values[4]) || 0;
            const ly = parseFloat(Values[5]) || 0;
            const hoa = parseFloat(Values[6]) || 0;
            const diemTB = ((toan + ly + hoa) / 3).toFixed(1);

            let mss = diemTB < 4 ? "Yếu" : diemTB < 7 ? "Trung bình" : diemTB < 9 ? "Khá" : "Giỏi";

            td[8].innerText = diemTB;
            td[9].innerText = mss;
        }
    });
}

// add action to button
// thêm
form.addEventListener('submit',(e)=>{
    e.preventDefault();

    if(!form.checkValidity()){
        return;
    }

    add();
    form.reset();
});

// xoá
document.querySelector('#delete').addEventListener('click',()=>{
    const pop = window.confirm('bạn có chắc chắn xoá dữ liệu ?')
    if(pop)
        delete_fnc();
});

// sửa
document.querySelector('#update').addEventListener('click',()=>{
    document.querySelectorAll(".checkbox").forEach(sl=>{
        if(sl.checked){
            update();
            btnSave();
        }
    });
});

//lưu
document.querySelector('#save').addEventListener('click',()=>{
    const pop = window.confirm('bạn có chắc chắn lưu dữ liệu ?')
    if(pop)
        save();
    btnCancel();
})

// huỷ
document.querySelector('#cancel').addEventListener('click',()=>{
    cancel();
    btnCancel();
})