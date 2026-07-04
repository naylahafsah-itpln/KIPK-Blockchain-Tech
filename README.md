# KIPK-Blockchain-Tech

## Deskripsi Proyek
KIPK-Blockchain-Tech merupakan aplikasi berbasis blockchain yang dikembangkan untuk meningkatkan transparansi proses seleksi penerima Kartu Indonesia Pintar Kuliah (KIP Kuliah). Sistem memanfaatkan smart contract berbasis Ethereum sehingga proses pendaftaran, pengumuman hasil, dan verifikasi data dapat dilakukan secara transparan, aman, dan terdokumentasi pada blockchain.

## Latar Belakang
Proses seleksi KIP Kuliah masih menghadapi tantangan berupa keterbatasan transparansi dan potensi manipulasi data oleh pihak tertentu. Melalui implementasi blockchain, setiap transaksi dicatat secara permanen (immutable), dapat diaudit oleh publik, serta menjaga privasi data peserta menggunakan hash identitas.

## Fitur Utama
- Registrasi peserta menggunakan hash identitas (Keccak-256)
- Pengumuman hasil seleksi secara on-chain
- Verifikasi status peserta secara publik
- Dashboard monitoring berbasis blockchain
- Integrasi MetaMask sebagai wallet pengguna
- Audit transaksi melalui Sepolia Testnet

## Teknologi yang Digunakan
- Solidity
- Ethereum Sepolia Testnet
- Ethers.js
- MetaMask
- HTML
- CSS
- JavaScript
- Remix IDE

## Struktur Folder
contracts/   -> Smart Contract Solidity
frontend/    -> Antarmuka pengguna (UI)
scripts/     -> Script deployment/testing
docs/        -> Dokumentasi proyek

## Smart Contract
Smart contract utama bernama **KIPSeleksi.sol** yang memiliki fungsi:
- registerApplicant()
- announceResult()
- verifyApplicant()
- getResult()
- getApplicantCount()
- changeAdmin()

## Deployment

Network:

**Ethereum Sepolia Testnet**

Contract Address:

```
0x6Dd13276e1F60894e4A3FaAa132341B53cf5c55f
```

Transaction Hash Deployment:

```
0x3a29573b1bf21da7fae5953b4a1c16b34c1a6aeeebba3f53765e6197af3cfc69
```

## Integrasi Frontend

Frontend terhubung dengan smart contract menggunakan Ethers.js serta mendukung autentikasi transaksi melalui MetaMask. Seluruh transaksi write akan meminta persetujuan pengguna melalui wallet sebelum dikirim ke jaringan blockchain.

## Status Proyek

✅ Final Project Mata Kuliah Teknologi Blockchain

Fitur utama telah berhasil diimplementasikan meliputi smart contract, deployment pada Sepolia Testnet, integrasi MetaMask, frontend berbasis web, serta pengujian fungsional sesuai kebutuhan sistem.
