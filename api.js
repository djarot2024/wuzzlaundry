// const tbody = document.querySelector('tbody');
// let usersData = [];

// const loadData = async () => {
//     try {
//         const response = await fetch('http://apklaundry.test/api/cucianku');
//         const result = await response.json();

//         usersData = Array.isArray(result.data) ? result.data : [result.data];

//         loadUserData(usersData);
//     } catch(err) {
//         console.log(err);
//     }
// }

// const loadUserData = (data) => {
//     const output = data.map((cucianku) => {
//         return `
//                     <tr>
//                             <td>${cucianku.nama}</td> 
//                             <td>${cucianku.barang}</td> 
//                             <td>${cucianku.jumlah_kilo}</td> 
//                             <td>${cucianku.kategory}</td> 
//                             <td>${cucianku.jenis}</td> 
//                             <td>${cucianku.pelayanan}</td> 
//                             <td>${cucianku.harga}</td> 
//                             <td>${cucianku.tanggal_masuk}</td> 
//                             <td>${cucianku.tanggal_keluar}</td>
//                             <td>${cucianku.status_pembayaran}</td>
//                             <td>${cucianku.nota}</td>
//                      </tr>
//                      `;
//     }).join('');
//     tbody.innerHTML = output;
// }

// loadData();

const tbody = document.querySelector('tbody');
const searchBtn = document.getElementById('search-btn');
const notaInput = document.getElementById('nota');

const loadDataByNota = async (nota) => {
    try {
        const response = await fetch(`http://apklaundry.test/api/cucianku/${nota}`);
        if (!response.ok) {
            throw new Error('Data tidak ditemukan');
        }

        const result = await response.json();
        loadUserData([result.data]); // Menampilkan data tunggal
    } catch (err) {
        console.log(err);
        tbody.innerHTML = `
            <tr>
                <td colspan="11" class="text-center text-danger">Data tidak ditemukan</td>
            </tr>
        `;
    }
};

const loadUserData = (data) => {
    const output = data.map((cucianku) => {
        return `
            <tr>
                <td>${cucianku.nama}</td>
                <td>${cucianku.barang}</td>
                <td>${cucianku.jumlah_kilo}</td>
                <td>${cucianku.kategory}</td>
                <td>${cucianku.jenis}</td>
                <td>${cucianku.pelayanan}</td>
                <td>${cucianku.harga}</td>
                <td>${cucianku.tanggal_masuk}</td>
                <td>${cucianku.tanggal_keluar}</td>
                <td>${cucianku.status_pembayaran}</td>
                <td>${cucianku.nota}</td>
            </tr>
        `;
    }).join('');
    tbody.innerHTML = output;
};

searchBtn.addEventListener('click', () => {
    const nota = notaInput.value.trim();
    if (nota) {
        loadDataByNota(nota);
    } else {
        alert('Masukkan nomor nota terlebih dahulu');
    }
});

loadDataByNota();