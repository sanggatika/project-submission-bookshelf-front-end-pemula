// This file is intentionally blank
// Use this file to add JavaScript to your project

// get data dari local storage
var storageDataBuku = JSON.parse(localStorage.getItem(storageKey));

// console.log(storageDataBuku);
function updateLocalStorage() {
    localStorage.setItem(storageKey, JSON.stringify(storageDataBuku));
}

function resetLocalStorage() {
    localStorage.removeItem(storageKey);
    location.reload();
}

function loadDataHTML()
{
    listBuku();
    listBukuSedangDibaca();
    listBukuSelesaiDibaca();
}

function listBuku()
{
    var filterKategori = document.getElementById('filterKategori').value;
    var filterTahun = document.getElementById('filterTahun').value;
    var filterJudul = document.getElementById('filterJudul').value;

    var dataFilterBuku = storageDataBuku;

    if(filterKategori != '-')
    {
        dataFilterBuku = dataFilterBuku.filter(function(itm){
            return itm.kategori_buku == filterKategori;
        });
    }

    if(filterTahun != '-')
    {
        dataFilterBuku = dataFilterBuku.filter(function(itm){
            return itm.tahun_buku == filterTahun;
        });
    }

    if(filterJudul != '' || filterJudul == ' ')
    {
        dataFilterBuku = dataFilterBuku.filter(function(itm){
            return itm.judul_buku.toLowerCase().includes(filterJudul.toLowerCase());
        });
    }

    document.getElementById('dataListBuku').innerHTML = '';
    var div = document.createElement('div'); //container to append to  

    for (let i = 0; i < dataFilterBuku.length; i++) {
        if(dataFilterBuku[i].status_buku == '0')
        {
            var tmpAssetIMG = assetImageBuku(dataFilterBuku[i].kategori_buku);

            div.innerHTML = '<div class="col-12 col-md-3 mb-2"><div class="card h-100"><!-- Product image--><img class="card-img-top" src="'+tmpAssetIMG+'" alt="logo-buku" /><!-- Product details--><div class="card-body p-4"><div class="text-center"><!-- Product name--><h5 class="fw-bolder">'+dataFilterBuku[i].judul_buku+'</h5><!-- Product price-->'+dataFilterBuku[i].kategori_buku+' - '+dataFilterBuku[i].tahun_buku+'</div></div><!-- Product actions--><div class="card-footer p-4 pt-0 border-top-0 bg-transparent"><div class="text-center"><button type="button" class="btn btn-outline-primary" onclick="detailBuku(\'' + dataFilterBuku[i].judul_buku + '\')">Detail</button> <button type="button" class="btn btn-outline-secondary" onclick="changeStatusBuku(\'' + dataFilterBuku[i].judul_buku + '\',\'' + '1' + '\')">Baca Buku</button> <button type="button" class="btn btn-outline-danger" onclick="removeListBuku(\'' + dataFilterBuku[i].judul_buku + '\')"><i class="bi-x-octagon-fill"></i></button></div></div></div></div>';

            document.getElementById('dataListBuku').appendChild(div.children[0]);
        }        
    }
}

function listBukuSedangDibaca()
{
    var dataFilterBuku = storageDataBuku;

    dataFilterBuku = dataFilterBuku.filter(function(itm){
        return itm.status_buku == '1';
    });

    var jumlahBukuDibaca = dataFilterBuku.length;
    document.getElementById('v_jumlahBukuDibaca').innerHTML = jumlahBukuDibaca;   

    document.getElementById('dataListBukuSedangDibaca').innerHTML = '';
    var div = document.createElement('div'); //container to append to  

    for (let i = 0; i < dataFilterBuku.length; i++) {
        var tmpAssetIMG = assetImageBuku(dataFilterBuku[i].kategori_buku);

        div.innerHTML = '<div class="col-12 col-md-6 mb-2"><div class="card h-100"><!-- Product image--><img class="card-img-top" src="'+tmpAssetIMG+'" alt="logo-buku" /><!-- Product details--><div class="card-body p-4"><div class="text-center"><!-- Product name--><h5 class="fw-bolder">'+dataFilterBuku[i].judul_buku+'</h5><!-- Product price-->'+dataFilterBuku[i].kategori_buku+' - '+dataFilterBuku[i].tahun_buku+'</div></div><!-- Product actions--><div class="card-footer p-4 pt-0 border-top-0 bg-transparent"><div class="text-center"><button type="button" class="btn btn-outline-primary" onclick="detailBuku(\'' + dataFilterBuku[i].judul_buku + '\')">Detail</button> <button type="button" class="btn btn-outline-secondary" onclick="changeStatusBuku(\'' + dataFilterBuku[i].judul_buku + '\',\'' + '2' + '\')">Selesai Baca</button></div></div></div></div>';

        document.getElementById('dataListBukuSedangDibaca').appendChild(div.children[0]);      
    }
}

function listBukuSelesaiDibaca()
{
    var dataFilterBuku = storageDataBuku;

    dataFilterBuku = dataFilterBuku.filter(function(itm){
        return itm.status_buku == '2';
    });


    document.getElementById('dataListBukuSelesaiDibaca').innerHTML = '';
    var div = document.createElement('div'); //container to append to  

    for (let i = 0; i < dataFilterBuku.length; i++) {
        var tmpAssetIMG = assetImageBuku(dataFilterBuku[i].kategori_buku);

        div.innerHTML = '<div class="col-12 col-md-6 mb-2"><div class="card h-100"><!-- Product image--><img class="card-img-top" src="'+tmpAssetIMG+'" alt="logo-buku" /><!-- Product details--><div class="card-body p-4"><div class="text-center"><!-- Product name--><h5 class="fw-bolder">'+dataFilterBuku[i].judul_buku+'</h5><!-- Product price-->'+dataFilterBuku[i].kategori_buku+' - '+dataFilterBuku[i].tahun_buku+'</div></div><!-- Product actions--><div class="card-footer p-4 pt-0 border-top-0 bg-transparent"><div class="text-center"><button type="button" class="btn btn-outline-primary" onclick="detailBuku(\'' + dataFilterBuku[i].judul_buku + '\')">Detail</button> <button type="button" class="btn btn-outline-secondary" onclick="changeStatusBuku(\'' + dataFilterBuku[i].judul_buku + '\',\'' + '0' + '\')">Kembalikan</button></div></div></div></div>';

        document.getElementById('dataListBukuSelesaiDibaca').appendChild(div.children[0]);      
    }
}

function changeStatusBuku (judul_buku, status) {
    
    var titleText = null;
    var btnText = null;
    if(status == 1)
    {
        titleText = 'Apakah Anda Akan Menlist Buku Yang Akan Dibaca ?';
        btnText = 'Baca Buku';
    }

    if(status == 2)
    {
        titleText = 'Apakah Anda Akan Menyimpan Buku Telah Selesai Dibaca ?';
        btnText = 'Selesai Baca Buku';
    }

    if(status == 0)
    {
        titleText = 'Apakah Anda Akan Mengembalikan Buku ?';
        btnText = 'Kembalikan Buku';
    }

    Swal.fire({
        title: titleText,
        icon: 'info',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: btnText,
        denyButtonText: `Don't save`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            for (var i in storageDataBuku) {
                if (storageDataBuku[i].judul_buku == judul_buku) {
                    storageDataBuku[i].status_buku = status;
                    break; //Stop this loop, we found it!
                }
            }
            updateLocalStorage();
            loadDataHTML();
            Swal.fire('Saved!', '', 'success')
        }
    })    
}

function removeListBuku (judul_buku) {
    Swal.fire({
        title: "Apa anda akan mengahapus buku "+judul_buku,
        icon: 'info',
        showDenyButton: false,
        showCancelButton: true,
        confirmButtonText: 'Hapus Buku',
        denyButtonText: `Don't save`,
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            storageDataBuku.splice(storageDataBuku.findIndex(item => item.judul_buku == judul_buku), 1);
            updateLocalStorage();
            loadDataHTML();
            Swal.fire('Saved!', '', 'success')
        }
    }) 
}

function submitTambahData()
{
    var form_JudulBuku = document.getElementById('form_JudulBuku').value;
    var form_pengarangBuku = document.getElementById('form_pengarangBuku').value;
    var form_tahunBuku = document.getElementById('form_tahunBuku').value;
    var form_kategoriBuku = document.getElementById('form_kategoriBuku').value;
    var form_deskripsiBuku = document.getElementById('form_deskripsiBuku').value;

    if(form_JudulBuku == '')
    {
        Swal.fire({
            icon: 'error',
            title: 'Informasi !',
            text: 'Pastikan Judul Buku Diisi, Sesuai dengan buku.',
        })
        return false;
    }

    if(form_pengarangBuku == '')
    {
        Swal.fire({
            icon: 'error',
            title: 'Informasi !',
            text: 'Pengarang Buku Tidak Boleh Kosong.',
        })
        return false;
    }

    if(form_tahunBuku == '-')
    {
        Swal.fire({
            icon: 'error',
            title: 'Informasi !',
            text: 'Tahun Buku Belum Anda Pilih.',
        })
        return false;
    }

    if(form_kategoriBuku == '-')
    {
        Swal.fire({
            icon: 'error',
            title: 'Informasi !',
            text: 'Kategori Buku Belum Anda Pilih.',
        })
        return false;
    }

    if(form_deskripsiBuku == '')
    {
        Swal.fire({
            icon: 'error',
            title: 'Informasi !',
            text: 'Deskripsi Buku Tidak Boleh Kosong.',
        })
        return false;
    }

    var tmpDataBuku = {
        'id':+new Date(),
        'judul_buku':form_JudulBuku,
        'pengarang_buku':form_pengarangBuku,
        'tahun_buku':form_tahunBuku,
        'kategori_buku':form_kategoriBuku,
        'deskripsi_buku':form_deskripsiBuku,
        'status_buku':'0'
    }

    storageDataBuku.push(tmpDataBuku);
    resetTamabahData();

    updateLocalStorage();
    loadDataHTML();

    var myModalEl = document.getElementById('exampleModal');
    var modal = bootstrap.Modal.getInstance(myModalEl)
    modal.hide();
}

function resetTamabahData()
{
    document.getElementById('form_JudulBuku').value='';
    document.getElementById('form_pengarangBuku').value='';
    document.getElementById('form_tahunBuku').value='-';
    document.getElementById('form_kategoriBuku').value='-';
    document.getElementById('form_deskripsiBuku').value='';
}

function detailBuku(judul_buku)
{
    var detailBuku = null;
    for (var i=0; i < storageDataBuku.length; i++) {
        if (storageDataBuku[i].judul_buku == judul_buku) {
            detailBuku = storageDataBuku[i];
        }
    }

    var tmpAssetIMG = assetImageBuku(detailBuku.kategori_buku);
    document.getElementById("modalDetailIMG").src = tmpAssetIMG;

    document.getElementById('modalDetailJudul').innerHTML = detailBuku.judul_buku;
    document.getElementById('modalDetailKagori').innerHTML = detailBuku.kategori_buku;
    document.getElementById('modalDetailDeskripsi').innerHTML = detailBuku.deskripsi_buku;
    document.getElementById('modalDetailAuthor').innerHTML = detailBuku.pengarang_buku+' - '+detailBuku.tahun_buku;

    var myModal = new bootstrap.Modal(document.getElementById("modalDetailBuku"), {});
    myModal.show();
}

function assetImageBuku(kategoriBuku)
{
    var assetImg = 'assets/frontend-dev.png';

    if(kategoriBuku == 'frontend-dev')
    {
        assetImg = 'assets/frontend-dev.png';
    }else if(kategoriBuku == 'android-dev')
    {
        assetImg = 'assets/android-dev.png';
    }else if(kategoriBuku == 'ios-dev')
    {
        assetImg = 'assets/ios-dev.png';
    }else if(kategoriBuku == 'multiapp-dev')
    {
        assetImg = 'assets/multiapp-dev.png';
    }else if(kategoriBuku == 'azure-dev')
    {
        assetImg = 'assets/azure-dev.png';
    }else if(kategoriBuku == 'backend-dev')
    {
        assetImg = 'assets/backend-dev.png';
    }else if(kategoriBuku == 'cloud-dev')
    {
        assetImg = 'assets/cloud-dev.png';
    }else if(kategoriBuku == 'learnning-dev')
    {
        assetImg = 'assets/learnning-dev.png';
    }else{
        assetImg = 'assets/frontend-dev.png';
    }

    return assetImg;
}

loadDataHTML();