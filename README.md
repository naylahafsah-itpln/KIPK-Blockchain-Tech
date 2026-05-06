# KIPK-Blockchain-Tech

## Deskripsi Proyek
Proyek ini bertujuan untuk menganalisis dan merancang sistem transparansi seleksi penerima KIP Kuliah berbasis teknologi blockchain menggunakan platform Ethereum dan bahasa Solidity.

## Latar Belakang
Sistem seleksi KIP Kuliah saat ini masih bersifat terpusat dan memiliki keterbatasan dalam transparansi serta potensi manipulasi data. Oleh karena itu, blockchain digunakan sebagai solusi karena sifatnya yang immutable, transparan, dan terdesentralisasi.

## Fitur Utama
- Pendaftaran pendaftar menggunakan hash identitas
- Verifikasi data secara terbuka
- Pengumuman hasil seleksi secara on-chain
- Dashboard statistik berbasis data blockchain

## Teknologi yang Digunakan
- Solidity (Smart Contract)
- Ethereum (Sepolia Testnet)
- Ethers.js
- HTML, CSS, JavaScript
- MetaMask

## Struktur Folder
- `contracts/` : Berisi smart contract Solidity
- `frontend/` : Antarmuka pengguna (UI)
- `scripts/` : Script pendukung (jika ada)
- `docs/` : Dokumentasi tambahan

## Smart Contract
Smart contract utama bernama **KIPSeleksi.sol** yang memiliki fungsi:
- registerApplicant
- verifyApplicant
- announceResult
- getResult
- getApplicantCount

## Status Proyek
Proyek ini masih dalam tahap perancangan dan belum di-deploy ke jaringan blockchain publik.
