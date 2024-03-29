var databuku = []

databuku = [
    {
        'id' : 3657848524,
        'judul_buku':'Front-End Web Developer',
        'pengarang_buku':'Dicoding',
        'tahun_buku':'2022',
        'kategori_buku':'frontend-dev',
        'deskripsi_buku':'Kurikulum disusun oleh Dicoding dan pelaku industri di bidang Web Development. Siswa dipersiapkan untuk menjadi Front-End Web Developer sesuai standar kebutuhan industri.',
        'status_buku':'0'
    },
    {
        'id' : 3657848535,
        'judul_buku':'Android Developer',
        'pengarang_buku':'Dicoding',
        'tahun_buku':'2020',
        'kategori_buku':'android-dev',
        'deskripsi_buku':'Kurikulum didesain dengan persetujuan dari Tim Google Android untuk mempersiapkan developer Android standar Global. Dicoding adalah Google Developer Authorized Training Partner.',
        'status_buku':'0'
    },
    {
        'id' : 3657848546,
        'judul_buku':'iOS Developer',
        'pengarang_buku':'Dicoding',
        'tahun_buku':'2021',
        'kategori_buku':'ios-dev',
        'deskripsi_buku':'Kurikulum disusun oleh Dicoding dan pelaku industri di bidang iOS Development. Siswa dipersiapkan untuk menjadi iOS Developer sesuai standar kebutuhan industri.',
        'status_buku':'0'
    },
    {
        'id' : 3657848557,
        'judul_buku':'Multi-Platform App Developer',
        'pengarang_buku':'Dicoding',
        'tahun_buku':'2021',
        'kategori_buku':'multiapp-dev',
        'deskripsi_buku':'Kurikulum disusun oleh Dicoding bersama Google beserta pelaku industri Multi-Platform App Development. Siswa dipersiapkan untuk menjadi Multi-Platform App Developer sesuai standar kebutuhan industri.',
        'status_buku':'0'
    },
]

// set awal data ke local storage
let storageKey = 'localStorageDataBuku';
if(localStorage.getItem('localStorageDataBuku') == null)
{
    localStorage.setItem(storageKey, JSON.stringify(databuku));
}

