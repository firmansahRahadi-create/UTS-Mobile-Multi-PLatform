# LangkahBaik

Aplikasi React Native untuk mencatat kebiasaan positif, menandai rutinitas harian, dan melihat progres selama tujuh hari. Dibuat dengan Expo agar mudah dijalankan di Android atau iOS.

## Menjalankan aplikasi

1. Pasang Node.js versi LTS.
2. Buka folder proyek di terminal, lalu jalankan `npm install`.
3. Jalankan `npx expo start`.
4. Buka aplikasi Expo Go di ponsel dan pindai QR code, atau tekan `a` untuk Android emulator.

## Fitur

- Empat halaman dengan navigasi tab: Hari Ini, Progres, Tambah, dan Profil.
- Daftar kebiasaan dapat dicentang, ditambah dengan nama/kategori/ikon, dan disimpan di perangkat.
- Ringkasan progres harian dan grafik kebiasaan tujuh hari terakhir.
- Data contoh tersedia saat pertama kali aplikasi dibuka.

## Kesesuaian dengan soal UTS

- **Komponen:** `HabitCard`, `StatCard`, `ScreenLayout`, `SectionHeading`, dan `StorageNotice` merupakan komponen yang dapat digunakan kembali.
- **State dan props:** `HabitContext` mengelola state kebiasaan; data dan aksi dikirim ke komponen melalui props.
- **Navigasi:** `@react-navigation/bottom-tabs` menyediakan navigasi antar empat halaman.
- **Hooks:** menggunakan `useState`, `useEffect`, `useContext`, `useMemo`, dan `useCallback`.
- **Tema bermanfaat:** membantu membangun kebiasaan positif dan merawat konsistensi.

## Struktur utama

```text
App.js                         Navigasi dan provider
src/components/                Komponen UI
src/context/HabitContext.js    State, hooks, dan penyimpanan lokal
src/data/initialHabits.js      Data kebiasaan awal
src/screens/                   Empat halaman aplikasi
src/theme.js                   Warna dan jarak UI
```

Untuk pengumpulan, lengkapi identitas pada laporan/tutorial PDF dan rekam presentasi sendiri. Tautan video YouTube serta repositori GitHub harus berasal dari akun mahasiswa.
