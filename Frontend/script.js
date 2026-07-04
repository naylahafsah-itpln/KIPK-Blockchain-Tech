const contractAddress = "0x6Dd13276e1F60894e4A3FaAa132341B53cf5c55f";

const contractABI = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "oldAdmin",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "newAdmin",
				"type": "address"
			}
		],
		"name": "AdminChanged",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "identityHash",
				"type": "bytes32"
			},
			{
				"internalType": "bool",
				"name": "isApproved",
				"type": "bool"
			}
		],
		"name": "announceResult",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "identityHash",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "uint8",
				"name": "score",
				"type": "uint8"
			}
		],
		"name": "ApplicantRegistered",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "newAdmin",
				"type": "address"
			}
		],
		"name": "changeAdmin",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "identityHash",
				"type": "bytes32"
			},
			{
				"internalType": "uint8",
				"name": "eligibilityScore",
				"type": "uint8"
			}
		],
		"name": "registerApplicant",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "bytes32",
				"name": "identityHash",
				"type": "bytes32"
			},
			{
				"indexed": false,
				"internalType": "bool",
				"name": "isApproved",
				"type": "bool"
			}
		],
		"name": "ResultAnnounced",
		"type": "event"
	},
	{
		"inputs": [],
		"name": "admin",
		"outputs": [
			{
				"internalType": "address",
				"name": "",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "applicantCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getApplicantCount",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "identityHash",
				"type": "bytes32"
			}
		],
		"name": "getResult",
		"outputs": [
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			},
			{
				"internalType": "uint8",
				"name": "score",
				"type": "uint8"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bytes32",
				"name": "identityHash",
				"type": "bytes32"
			}
		],
		"name": "verifyApplicant",
		"outputs": [
			{
				"internalType": "bool",
				"name": "registered",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "approved",
				"type": "bool"
			},
			{
				"internalType": "uint8",
				"name": "score",
				"type": "uint8"
			},
			{
				"internalType": "bool",
				"name": "announced",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

let provider;
let signer;
let contract;


async function connectWallet(){

    if(window.ethereum){

        provider = new ethers.BrowserProvider(window.ethereum);

        await provider.send(
            "eth_requestAccounts",
            []
        );

        signer = await provider.getSigner();


        contract = new ethers.Contract(
            contractAddress,
            contractABI,
            signer
        );

        const address = await signer.getAddress();
        isWalletConnected = true;
        userAddress = address;

        document.getElementById("walletBtnText").textContent = userAddress.substring(0, 6) + "..." + userAddress.substring(userAddress.length - 4);
        document.getElementById('walletBtn').className = "bg-slate-800 border border-slate-700 text-brand-accent px-5 py-2.5 rounded-xl text-sm font-mono shadow-md flex items-center space-x-2";

        document.getElementById("adminWallet").textContent =
            "Akun Admin: " + address.slice(0, 6) + "..." + address.slice(-4);
        document.getElementById('adminWallet').className = "text-slate-800 font-bold font-mono";

        document.getElementById('adminAuthLock').classList.add('hidden');
        document.getElementById('adminWorkspace').classList.remove('hidden');

        showToast("MetaMask berhasil terhubung sebagai Admin", "success");
        logToAdminInteractive("MetaMask Connected", `Wallet admin ${userAddress.substring(0, 6)}...${userAddress.slice(-4)} tersambung`);
    } else {

        alert("Install MetaMask dulu");

    }

}
// Core State of VisiKULIAH Local-Blockchain Simulation
let isWalletConnected = false;
let userAddress = "";
let mockBlockNumber = 5462891;
let mockTxCount = 3672;

// Hard-Aligned Database Concept: Matching exactly with solidity functions state
// Mapping elements: bytes32 identityHash -> applicant data
const initialOnChainState = [
    { applicantId: "KIP-2026-0001", hash: "0xec299b9cf98b8b0e8b0e4179e00ec6e2eef29fa139efef92ef2d80d2bc4a9e9e", score: 85, status: "Diterima", txHash: "0x49da9fa330a10bcfe881d89fe6ef41334ef8b7a12", date: "25 Apr 2026, 09:55", registered: true, announced: true },
    { applicantId: "KIP-2026-0002", hash: "0x918cbef9efefbd9cfeb219bfef290bca2d8fdfdfbfeefd9b8e8f8e8feef88111", score: 45, status: "Ditolak", txHash: "0x91bc8600d8cb2dcd75dfdfbe81efd812290af101", date: "25 Apr 2026, 10:18", registered: true, announced: true },
    { applicantId: "KIP-2026-0003", hash: "0x6ab129fefbc9d3ef120bfeeff200fcb28dfef838deefe8f8eef9a8a8fc4b99cc", score: 92, status: "Diterima", txHash: "0x8fa1df0bc9d3e8eef8afefb738de92bc879a8fc4", date: "24 Apr 2026, 14:32", registered: true, announced: true },
    { applicantId: "KIP-2026-0004", hash: "0x892fbceec299d28cf499292fcb829afdfd399deefefef89a8cdebc89d28ca9de", score: 78, status: "Menunggu Penetapan", txHash: "0x78a1ee11c000ff3b89fa2dcb8dff7e0bfceea0da", date: "25 Apr 2026, 15:40", registered: true, announced: false },
    { applicantId: "KIP-2026-0005", hash: "0xbf309feef290cf83bde99cf2d808cf0bf3ef83bde28cfebdef8cbde28cebd802", score: 81, status: "Menunggu Penetapan", txHash: "0x12bd8feef90900efda38290fbe8f6153728deef2", date: "25 Apr 2026, 16:15", registered: true, announced: false },
];

let applicants = JSON.parse(localStorage.getItem("applicants")) || [];

// ChartJS Globals to update dynamically
let ratioChartInstance = null;
let trendChartInstance = null;

// Custom Toast System (Anti Browser Alert)
function showToast(message, type = 'success') {
    const container = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `transform translate-y-5 opacity-0 transition-all duration-300 p-4 rounded-2xl shadow-xl flex items-center justify-between border ${
        type === 'success' 
            ? 'bg-emerald-50 border-emerald-200 text-emerald-800' 
            : type === 'error'
                ? 'bg-rose-50 border-rose-200 text-rose-800'
                : 'bg-blue-50 border-blue-200 text-blue-800'
    }`;
    
    const icon = type === 'success' 
        ? '<i class="fa-solid fa-circle-check text-emerald-500 mr-3 text-sm"></i>' 
        : type === 'error'
            ? '<i class="fa-solid fa-circle-exclamation text-rose-500 mr-3 text-sm"></i>'
            : '<i class="fa-solid fa-circle-info text-blue-500 mr-3 text-sm"></i>';

    toast.innerHTML = `
        <div class="flex items-center text-xs font-bold font-sans">
            ${icon}
            <span>${message}</span>
        </div>
        <button onclick="this.parentElement.remove()" class="text-slate-400 hover:text-slate-600 ml-4 font-sans text-sm">
            <i class="fa-solid fa-xmark"></i>
        </button>
    `;

    container.appendChild(toast);
    
    // Trigger animation
    setTimeout(() => {
        toast.classList.remove('translate-y-5', 'opacity-0');
    }, 10);

    // Auto-remove
    setTimeout(() => {
        toast.classList.add('translate-y-5', 'opacity-0');
        setTimeout(() => toast.remove(), 300);
    }, 4000);
}

// On Load Initializers
window.onload = function() {
    applicants = JSON.parse(localStorage.getItem("applicants")) || [];
    renderAuditTable();
    renderAdminLists();
    initializeCharts();
    updateBlockchainMetrics();
    
    // Set first page navigation visual state
    document.getElementById('nav-beranda').classList.add('bg-slate-100', 'text-brand-primary');
};

// Tab Switching Mechanism
function switchTab(tabId) {
    document.querySelectorAll('.tab-content').forEach(tab => {
        tab.classList.remove('active');
    });
    const targetTab = document.getElementById('tab-' + tabId);
    if (targetTab) {
        targetTab.classList.add('active');
    }

    // Update Navigation Menu Visual Active State
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('bg-slate-100', 'text-brand-primary');
    });
    const activeLink = document.getElementById('nav-' + tabId);
    if (activeLink) {
        activeLink.classList.add('bg-slate-100', 'text-brand-primary');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Hamburger Menu toggle (Mobile responsive)
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    menu.classList.toggle('hidden');
}

// Wallet connection mock with MetaMask Simulator
function toggleWalletConnection() {
    if (!isWalletConnected) {
        isWalletConnected = true;
        userAddress = "0x76aA7C93f7734De1EdDe00D0B123EFd41334ef8B"; // Admin Address
        document.getElementById('walletBtnText').textContent = userAddress.substring(0, 6) + "..." + userAddress.substring(userAddress.length - 4);
        document.getElementById('walletBtn').className = "bg-slate-800 border border-slate-700 text-brand-accent px-5 py-2.5 rounded-xl text-sm font-mono shadow-md flex items-center space-x-2";
        
        // Indicators Update
        document.getElementById('adminWallet').textContent = userAddress.substring(0, 6) + "..." + userAddress.substring(userAddress.length - 4);
        document.getElementById('adminWallet').className = "text-slate-800 font-bold font-mono";

        // Unlock Admin Panels
        document.getElementById('adminAuthLock').classList.add('hidden');
        document.getElementById('adminWorkspace').classList.remove('hidden');
        showToast("MetaMask Terhubung: " + userAddress.substring(0, 10) + "...", "success");
        logToAdminInteractive("Koneksi Wallet", `Wallet Admin (${userAddress.substring(0, 6)}...${userAddress.slice(-4)}) sukses tersinkronisasi ke browser.`);
    } else {
        isWalletConnected = false;
        userAddress = "";
        document.getElementById('walletBtnText').textContent = "Hubungkan Wallet";
        document.getElementById('walletBtn').className = "bg-brand-primary hover:bg-blue-800 text-white px-5 py-2.5 rounded-xl text-sm font-bold shadow-lg flex items-center space-x-2 animate-pulse";
        
        document.getElementById('adminWallet').textContent = "Akun Admin: Belum Terhubung";
        document.getElementById('adminWallet').className = "font-mono text-slate-700 font-semibold";

        // Lock Admin Panels
        document.getElementById('adminAuthLock').classList.remove('hidden');
        document.getElementById('adminWorkspace').classList.add('hidden');
        showToast("Koneksi Wallet Diputus", "info");
    }
}

// Helper function to print to the professional Admin Logs Panel
function logToAdminInteractive(action, desc) {
    const container = document.getElementById('adminInteractiveLogs');
    if (!container) return;
    const timestamp = new Date().toLocaleTimeString('id-ID', { hour12: false });
    
    // Clean placeholder
    if (container.innerHTML.includes('Menunggu instruksi')) {
        container.innerHTML = '';
    }

    container.innerHTML = `
        <div class="p-3 bg-slate-50 border border-slate-200 rounded-xl space-y-1 mb-2 font-sans">
            <div class="flex items-center justify-between text-[10px] font-mono text-slate-400">
                <span class="flex items-center gap-1 font-bold text-brand-primary uppercase"><i class="fa-solid fa-code"></i> ${action}</span>
                <span>[${timestamp}]</span>
            </div>
            <p class="text-xs text-slate-700 leading-relaxed font-medium">${desc}</p>
        </div>
    ` + container.innerHTML;
}

// Hashing helper to build a valid bytes32 keccak256 payload for the smart contract
function mockKeccak256(text) {
    try {
        return ethers.keccak256(ethers.toUtf8Bytes(text));
    } catch (error) {
        console.error('Hashing error:', error);
        // Fallback for older browsers or unexpected input format
        let hash = 0;
        for (let i = 0; i < text.length; i++) {
            const char = text.charCodeAt(i);
            hash = (hash << 5) - hash + char;
            hash = hash & hash;
        }
        let hex = Math.abs(hash).toString(16).padStart(8, '0');
        return "0x" + hex + "e59f2a89d7010f37be2d80d2bc4a9e9eeef92ef2d80d2bc4a9e9e" + hex.substring(0,2);
    }
}

// Public user clicks list row action to check status instantly
function fillVerificationField(applicantId) {
    switchTab('verifikasi');
    document.getElementById('verifyInput').value = applicantId;
    performVerification();
}

// Performs Public KIPK verification - represents verifyApplicant() view call on KIPSeleksi Solidity contract
function performVerification() {
    const input = document.getElementById('verifyInput').value.trim().toUpperCase();
    if (!input) {
        showToast("Silakan masukkan Nomor Pendaftaran!", "error");
        return;
    }
    
    // Find match by Applicant ID
    const match = applicants.find(app => app.applicantId.toUpperCase() === input);
    const resultCard = document.getElementById('verifyResultCard');
    resultCard.classList.remove('hidden');

    if (match) {
        let statusBadge = "";
        let cardBorders = "";
        let statusHeaderColor = "";
        let statusIcon = "";
        
        // Checking contract results
        if (match.status === "Diterima") {
            statusBadge = `<span class="bg-emerald-500 text-white text-xs px-4 py-1.5 rounded-full font-extrabold uppercase shadow-sm shadow-emerald-500/10 flex items-center gap-1.5 font-sans">Diterima KIP-K</span>`;
            cardBorders = "border-emerald-200 bg-white shadow-emerald-50";
            statusHeaderColor = "text-emerald-600";
            statusIcon = `<i class="fa-solid fa-circle-check text-emerald-500 text-3xl"></i>`;
        } else if (match.status === "Ditolak") {
            statusBadge = `<span class="bg-rose-500 text-white text-xs px-4 py-1.5 rounded-full font-extrabold uppercase shadow-sm shadow-rose-500/10 flex items-center gap-1.5 font-sans">Tidak Diterima</span>`;
            cardBorders = "border-rose-200 bg-white shadow-rose-50";
            statusHeaderColor = "text-rose-600";
            statusIcon = `<i class="fa-solid fa-circle-xmark text-rose-500 text-3xl"></i>`;
        } else {
            statusBadge = `<span class="bg-amber-500 text-white text-xs px-4 py-1.5 rounded-full font-extrabold uppercase shadow-sm shadow-amber-500/10 flex items-center gap-1.5 font-sans">Proses Seleksi</span>`;
            cardBorders = "border-amber-200 bg-white shadow-amber-50";
            statusHeaderColor = "text-amber-600";
            statusIcon = `<i class="fa-solid fa-circle-notch text-amber-500 text-3xl animate-spin"></i>`;
        }

        // Simplified clean UI as requested (No terminals, no blockchain codes visible by default)
        resultCard.innerHTML = `
            <div class="p-8 rounded-3xl border-2 ${cardBorders} mb-8 shadow-md transition-all">
                <!-- Header Status Card -->
                <div class="flex flex-col sm:flex-row sm:items-center justify-between border-b border-slate-100 pb-5 mb-5 gap-3">
                    <div class="flex items-center space-x-3">
                        ${statusIcon}
                        <div>
                            <h4 class="font-extrabold text-slate-900 text-lg flex items-center gap-1.5 font-sans">
                                <span>Status:</span> 
                                <span class="${statusHeaderColor}">${match.status.toUpperCase()}</span>
                            </h4>
                            <p class="text-[11px] text-slate-400 font-bold uppercase tracking-wider mt-0.5">No. Pendaftaran: ${match.applicantId}</p>
                        </div>
                    </div>
                    <div class="self-start sm:self-center">
                        ${statusBadge}
                    </div>
                </div>

                <!-- Main Clean Info for Public -->
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm mb-5 font-sans">
                    <div class="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                        <span class="text-slate-400 text-xs font-semibold block mb-1">Skor Kelayakan Kelulusan</span>
                        <span class="text-slate-800 font-extrabold text-lg">${match.score} <span class="text-slate-400 font-normal text-xs font-sans">dari 100 poin</span></span>
                    </div>
                    <div class="p-4 bg-slate-50 border border-slate-100 rounded-2xl">
                        <span class="text-slate-400 text-xs font-semibold block mb-1 font-sans">Waktu Publikasi On-Chain</span>
                        <span class="text-slate-800 font-extrabold text-sm">${!match.announced ? 'Dalam Proses Penilaian' : match.date}</span>
                    </div>
                </div>

                <!-- Verification Trust Banner -->
                <div class="bg-emerald-50 border border-emerald-100 rounded-2xl p-4 flex items-center gap-3 text-emerald-800 text-xs mb-6 font-sans">
                    <i class="fa-solid fa-shield-halved text-emerald-500 text-lg"></i>
                    <div>
                        <span class="font-bold block">✓ Terverifikasi Blockchain</span>
                        <p class="text-emerald-700 text-[11px] mt-0.5 leading-relaxed">Data seleksi di atas dijamin mutlak valid, tidak dapat dimodifikasi, dan terhubung langsung ke smart contract Sepolia.</p>
                    </div>
                </div>

                <!-- Expandable Technical Details (Strictly Hidden by Default to keep UX clean and non-technical) -->
                <div class="border-t border-slate-100 pt-4 font-sans">
                    <button onclick="toggleExpandableDetails()" class="w-full text-left text-xs font-bold text-slate-500 hover:text-brand-primary flex items-center justify-between py-1">
                        <span id="toggleDetailsBtnText"><i class="fa-solid fa-circle-nodes mr-1.5 text-brand-primary"></i> Lihat Bukti Blockchain</span>
                        <i id="toggleDetailsIcon" class="fa-solid fa-chevron-down text-[10px]"></i>
                    </button>
                    
                    <div id="expandableCryptoDetails" class="hidden mt-4 pt-4 border-t border-slate-50 space-y-3 font-mono text-[10px] text-slate-500">
                        <div class="bg-slate-50 p-3 rounded-xl border border-slate-200/50 space-y-2">
                            <div class="flex justify-between">
                                <span class="font-sans font-bold text-slate-400">Smart Contract:</span>
                                <span class="text-slate-700 font-semibold select-all font-mono">0x76aA7C93f7734De1EdDe00D0B123EFd41334ef8B</span>
                            </div>
                            <div class="flex justify-between">
                                <span class="font-sans font-bold text-slate-400">Caller Wallet Admin:</span>
                                <span class="text-slate-700 font-semibold select-all font-mono">0x76aA...ef8B</span>
                            </div>
                            <div class="flex flex-col gap-1">
                                <span class="font-sans font-bold text-slate-400">Identity Hash (keccak256):</span>
                                <span class="text-slate-600 font-semibold break-all select-all bg-white p-1.5 rounded border border-slate-100">${match.hash}</span>
                            </div>
                            <div class="flex flex-col gap-1">
                                <span class="font-sans font-bold text-slate-400">Transaction ID (Tx Hash):</span>
                                <span class="text-brand-primary font-semibold break-all select-all bg-white p-1.5 rounded border border-slate-100">${match.txHash}</span>
                            </div>
                        </div>
                        <div class="flex items-center justify-between pt-1 font-sans">
                            <span class="text-slate-400">Status Transaksi: <span class="text-brand-success font-bold font-mono">SUCCESS (Confirmed)</span></span>
                            <a href="https://sepolia.etherscan.io" target="_blank" class="text-brand-primary hover:underline font-bold flex items-center gap-1">
                                <span>Buka Etherscan</span>
                                <i class="fa-solid fa-arrow-up-right-from-square text-[9px]"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        `;
        showToast("Informasi status berhasil ditarik dari Smart Contract!", "success");
    } else {
        resultCard.innerHTML = `
            <div class="p-8 rounded-3xl border border-rose-200 bg-rose-50/20 text-center mb-8 font-sans">
                <div class="w-12 h-12 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-3 shadow-inner">
                    <i class="fa-solid fa-circle-exclamation text-xl"></i>
                </div>
                <h4 class="font-extrabold text-rose-800 text-base">Nomor Pendaftaran Tidak Ditemukan</h4>
                <p class="text-xs text-rose-600 mt-1.5 max-w-sm mx-auto leading-relaxed">
                    Nomor Pendaftaran <strong>${input}</strong> tidak terdaftar dalam smart contract KIPSeleksi.sol.
                </p>
            </div>
        `;
        showToast("ID tidak terdaftar di Blockchain!", "error");
    }
}

// Accordion toggle helper
function toggleExpandableDetails() {
    const element = document.getElementById('expandableCryptoDetails');
    const icon = document.getElementById('toggleDetailsIcon');
    const text = document.getElementById('toggleDetailsBtnText');
    element.classList.toggle('hidden');
    
    if (element.classList.contains('hidden')) {
        icon.className = "fa-solid fa-chevron-down text-[10px]";
        text.innerHTML = '<i class="fa-solid fa-circle-nodes mr-1.5 text-brand-primary"></i> Lihat Bukti Blockchain';
    } else {
        icon.className = "fa-solid fa-chevron-up text-[10px]";
        text.innerHTML = '<i class="fa-solid fa-circle-nodes mr-1.5 text-brand-primary"></i> Sembunyikan Detil Teknis';
    }
}

// Reset verifikasi
function clearVerification() {
    document.getElementById('verifyInput').value = "";
    document.getElementById('verifyResultCard').classList.add('hidden');
}

// Dynamic Tables Loading - strictly matching the requested privacy design (Applicant ID, Identity Hash, Score, Status)
function renderAuditTable() {
    const tableBody = document.getElementById('auditTableBody');
    tableBody.innerHTML = "";

    applicants.forEach((app, idx) => {
        let badge = "";
        if (app.status === "Diterima") {
            badge = `<span class="bg-emerald-50 text-emerald-700 px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase"><i class="fa-solid fa-circle text-[6px] mr-1"></i> Diterima</span>`;
        } else if (app.status === "Ditolak") {
            badge = `<span class="bg-rose-50 text-rose-700 px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase">Ditolak</span>`;
        } else {
            badge = `<span class="bg-amber-50 text-amber-700 px-2.5 py-1 rounded-xl text-[10px] font-bold uppercase">Proses</span>`;
        }

        tableBody.innerHTML += `
            <tr class="hover:bg-slate-50 transition border-b border-slate-100 font-mono">
                <td class="px-6 py-4 font-bold text-slate-800 font-sans">${app.applicantId}</td>
                <td class="px-6 py-4 text-slate-400 select-all text-xs" title="${app.hash}">${app.hash.substring(0, 16)}...${app.hash.slice(-8)}</td>
                <td class="px-6 py-4 text-slate-900 font-sans font-semibold">${app.score}</td>
                <td class="px-6 py-4 text-center font-sans">${badge}</td>
                <td class="px-6 py-4 text-right flex justify-end space-x-2 font-sans">
                    <button onclick="copyToClipboard('${app.hash}')" class="text-slate-400 hover:text-brand-primary transition" title="Salin Hash Identitas">
                        <i class="fa-regular fa-copy text-sm"></i>
                    </button>
                    <button onclick="fillVerificationField('${app.applicantId}')" class="text-slate-400 hover:text-brand-primary transition" title="Verifikasi">
                        <i class="fa-solid fa-magnifying-glass text-xs"></i>
                    </button>
                </td>
            </tr>
        `;
    });

    document.getElementById('badgeTotalAudit').textContent = `Total Data: ${applicants.length}`;
}

// Load Lists inside Admin Section (Only maps Applicant ID to keep selection operational)
function renderAdminLists() {
    const container = document.getElementById('pendingListContainer');
    const pending = applicants.filter(app => app.status === "Menunggu Penetapan");
    document.getElementById('badgePendingCount').textContent = `${pending.length} Menunggu`;

    if (pending.length === 0) {
        container.innerHTML = `
            <div class="p-8 text-center text-slate-400 text-xs font-sans">
                <i class="fa-solid fa-circle-check text-2xl text-emerald-500 mb-2 animate-bounce"></i>
                <p class="font-bold">Semua data pendaftaran telah berhasil ditetapkan.</p>
            </div>
        `;
        return;
    }

    container.innerHTML = "";
    pending.forEach(app => {
        container.innerHTML += `
            <div class="p-4 bg-slate-50 border border-slate-150 rounded-2xl flex items-center justify-between text-xs transition hover:border-slate-300">
                <div class="space-y-1 text-left font-sans">
                    <div class="flex items-center space-x-2">
                        <span class="bg-blue-100 text-brand-primary text-[10px] font-mono font-black px-1.5 py-0.5 rounded">${app.applicantId}</span>
                    </div>
                    <span class="block text-[10px] text-slate-400 font-mono truncate max-w-[280px]">Hash (keccak256): ${app.hash}</span>
                    <span class="block text-slate-600 font-sans">Skor Kelayakan: <span class="text-brand-primary font-black font-mono">${app.score}</span></span>
                </div>
                <div class="flex space-x-2 font-sans">
                    <button onclick="changeSelectionStatus('${app.hash}', 'Diterima')" class="bg-brand-success hover:bg-emerald-600 text-white font-bold py-1.5 px-3.5 rounded-lg transition text-[10px] uppercase shadow-sm shadow-emerald-500/10 font-sans">Terima</button>
                    <button onclick="changeSelectionStatus('${app.hash}', 'Ditolak')" class="bg-brand-danger hover:bg-red-600 text-white font-bold py-1.5 px-3.5 rounded-lg transition text-[10px] uppercase shadow-sm shadow-rose-500/10 font-sans">Tolak</button>
                </div>
            </div>
        `;
    });
}

// Transaction confirmation modal and contract write flow
let pendingApprovalCallback = null;

function triggerMetaMaskModal(funcName, hashData, callback) {
    document.getElementById('mmFunctionName').textContent = funcName + "()";
    document.getElementById('mmHashData').textContent = hashData;
    document.getElementById('metaMaskModal').classList.remove('hidden');
    pendingApprovalCallback = callback;
}

async function closeMetaMask(approved) {
    document.getElementById('metaMaskModal').classList.add('hidden');
    if (approved && pendingApprovalCallback) {
        try {
            await pendingApprovalCallback();
        } catch (error) {
            console.error(error);
            showToast("Transaksi gagal: " + (error.message || error), "error");
        }
    } else {
        showToast("Transaksi Ditolak di MetaMask", "error");
    }
    pendingApprovalCallback = null;
}

// Modal Bukti Cetak / Receipt Modal
function showApplicantIdResultModal(applicantId, hash, score, txHash) {
    document.getElementById('receiptApplicantId').textContent = applicantId;
    document.getElementById('receiptHash').textContent = hash;
    document.getElementById('receiptTxHash').textContent = txHash;
    document.getElementById('receiptScore').textContent = score + " / 100";
    document.getElementById('receiptModal').classList.remove('hidden');
}

// Close Receipt Modal
function closeReceiptModal() {
    document.getElementById('receiptModal').classList.add('hidden');
}

// Copy receipt details to clipboard
function copyReceiptInfo() {
    const id = document.getElementById('receiptApplicantId').textContent;
    const hash = document.getElementById('receiptHash').textContent;
    const tx = document.getElementById('receiptTxHash').textContent;
    const textToCopy = `Pendaftaran KIP-K Blockchain Sukses!\nApplicant ID: ${id}\nIdentity Hash (keccak256): ${hash}\nTx Hash: ${tx}`;
    
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = textToCopy;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    showToast("Data pendaftaran disalin ke clipboard!", "success");
}

// Helper function to copy to clipboard
function copyToClipboard(text) {
    const dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    showToast("Disalin ke clipboard!", "success");
}

// Action: Admin registers new student on-chain via registerApplicant(bytes32, uint8)
function handleRegisterOnChain() {
    const nik = document.getElementById('adminInputNik').value.trim();
    const scoreVal = document.getElementById('adminInputScore').value.trim();

    if (!nik || !scoreVal) {
        showToast("NIK dan Skor wajib diisi oleh Admin!", "error");
        return;
    }

    if (nik.length < 8) {
        showToast("Format NIK terlalu pendek!", "error");
        return;
    }

    const score = parseInt(scoreVal);
    if (score < 0 || score > 100) {
        showToast("Skor kelayakan berkisar 0-100", "error");
        return;
    }

    if (!contract) {
        showToast("Hubungkan MetaMask terlebih dahulu sebelum menulis ke blockchain", "error");
        return;
    }

    const finalHash = mockKeccak256(nik);

    if (applicants.find(a => a.hash === finalHash)) {
        showToast("Identitas Hash ini sudah terdaftar di Solidity state!", "error");
        return;
    }

    const totalApplicants = applicants.length;
    const nextIdNumber = totalApplicants + 1;
    const generatedId = `KIP-2026-${String(nextIdNumber).padStart(4, '0')}`;

    logToAdminInteractive("Memanggil registerApplicant()", `Mengenkripsi NIK pendaftar (${nik.substring(0, 4)}***) ke Keccak-256 identityHash: ${finalHash.substring(0, 16)}...`);

    triggerMetaMaskModal("registerApplicant", finalHash, async function() {
        try {
            const tx = await contract.registerApplicant(finalHash, score);
            showToast("Transaksi dikirim ke MetaMask, menunggu konfirmasi...", "success");
            const receipt = await tx.wait();
            const newTxHash = receipt.transactionHash;
            const formattedDate = new Date().toLocaleDateString('id-ID', {
                day: '2-digit', month: 'short', year: 'numeric'
            }) + ", " + new Date().toLocaleTimeString('id-ID', {
                hour: '2-digit', minute: '2-digit'
            });

            applicants.unshift({
                applicantId: generatedId,
                hash: finalHash,
                score: score,
                status: "Menunggu Penetapan",
                txHash: newTxHash,
                date: formattedDate,
                registered: true,
                announced: false
            });

            localStorage.setItem("applicants", JSON.stringify(applicants));

            mockBlockNumber += Math.floor(Math.random() * 4) + 1;
            mockTxCount += 1;

            addTransactionToLog("registerApplicant", `Mendaftarkan Applicant baru (${generatedId})`, newTxHash);
            renderAuditTable();
            renderAdminLists();
            updateBlockchainMetrics();
            updateChartsData();

            logToAdminInteractive("Registrasi Berhasil", `Data peserta berhasil diamankan ke blockchain Sepolia. Applicant ID: ${generatedId} dengan Skor Kelayakan: ${score}. Transaction ID: ${newTxHash}`);

            document.getElementById('adminInputNik').value = "";
            document.getElementById('adminInputScore').value = "";
            showApplicantIdResultModal(generatedId, finalHash, score, newTxHash);
        } catch (error) {
            console.error(error);
            showToast("Gagal melakukan registerApplicant: " + (error.message || error), "error");
        }
    });
}

// Action: Admin signs acceptance/rejection via announceResult(bytes32, bool)
async function changeSelectionStatus(hash, newStatus) {
    logToAdminInteractive("Memanggil announceResult()", `Mengumumkan status baru (${newStatus}) ke blockchain untuk hash: ${hash.substring(0, 12)}...`);

    if (!contract) {
        showToast("Hubungkan MetaMask terlebih dahulu sebelum menulis ke blockchain", "error");
        return;
    }

    const verification = await contract.verifyApplicant(hash);
    const registered = Array.isArray(verification) ? verification[0] : verification.registered;
    if (!registered) {
        showToast("Hash belum terdaftar dalam kontrak. Daftarkan applicant terlebih dahulu.", "error");
        return;
    }

    triggerMetaMaskModal("announceResult", hash, async function() {
        try {
            const isApproved = newStatus === "Diterima";
            const tx = await contract.announceResult(hash, isApproved);
            showToast("Transaksi dikirim ke MetaMask, menunggu konfirmasi...", "success");
            const receipt = await tx.wait();
            const newTxHash = receipt.transactionHash;
            const formattedDate = new Date().toLocaleDateString('id-ID', {
                day: '2-digit', month: 'short', year: 'numeric'
            }) + ", " + new Date().toLocaleTimeString('id-ID', {
                hour: '2-digit', minute: '2-digit'
            });

            const candidate = applicants.find(app => app.hash === hash);
            if (candidate) {
                candidate.status = newStatus;
                candidate.txHash = newTxHash;
                candidate.date = formattedDate;
                candidate.announced = true;

                localStorage.setItem(
                    "applicants", 
                    JSON.stringify(applicants)
                );

                mockBlockNumber += Math.floor(Math.random() * 3) + 1;
                mockTxCount += 1;

                addTransactionToLog("announceResult", `Keputusan kelulusan diumumkan: ${newStatus} (${candidate.applicantId})`, newTxHash);
                renderAuditTable();
                renderAdminLists();
                updateBlockchainMetrics();
                updateChartsData();

                logToAdminInteractive("Hasil Kelulusan Diumumumkan", `Applicant ID ${candidate.applicantId} dinyatakan ${newStatus.toUpperCase()}. Transaction Hash: ${newTxHash}`);

                showToast(`Hasil Seleksi ${candidate.applicantId}: KIPK ${newStatus.toUpperCase()}`, "success");
            }
        } catch (error) {
            console.error(error);
            showToast("Gagal melakukan announceResult: " + (error.message || error), "error");
        }
    });
}

// Live Transaction Logging Feed
function addTransactionToLog(method, desc, txHash) {
    const table = document.getElementById('transactionTableBody');
    const newRowHtml = `
        <tr class="hover:bg-slate-50 transition text-slate-800">
            <td class="px-6 py-3 font-mono font-black text-brand-primary">${method}()</td>
            <td class="px-6 py-3 font-sans">${desc}</td>
            <td class="px-6 py-3 font-mono">${mockBlockNumber.toLocaleString()}</td>
            <td class="px-6 py-3 font-mono text-brand-primary"><a href="https://sepolia.etherscan.io" target="_blank" class="hover:underline">${txHash}</a></td>
        </tr>
    `;
    table.innerHTML = newRowHtml + table.innerHTML;
}

// Dynamic State Metrics
function updateBlockchainMetrics() {
    // Fix: ensure the correct element object lookup after ID typo fix
    const blockEl = document.getElementById('mockBlockNumber');
    const txEl = document.getElementById('mockTxCount');
    if (blockEl) blockEl.textContent = mockBlockNumber.toLocaleString();
    if (txEl) txEl.textContent = mockTxCount.toLocaleString();

    const total = applicants.length;
    const pending = applicants.filter(a => a.status === "Menunggu Penetapan").length;
    const approved = applicants.filter(a => a.status === "Diterima").length;
    const rejected = applicants.filter(a => a.status === "Ditolak").length;

    // Admin panel stats update
    const totalEl = document.getElementById('metricTotal');
    const verifiedEl = document.getElementById('metricVerified');
    const approvedEl = document.getElementById('metricApproved');
    const rejectedEl = document.getElementById('metricRejected');

    if (totalEl) totalEl.textContent = total;
    if (verifiedEl) verifiedEl.textContent = approved + rejected;
    if (approvedEl) approvedEl.textContent = approved;
    if (rejectedEl) rejectedEl.textContent = rejected;

    // Stat tab numbers
    const statApp = document.getElementById('statApproved');
    const statRej = document.getElementById('statRejected');
    const statPen = document.getElementById('statPending');

    if (statApp) statApp.textContent = approved;
    if (statRej) statRej.textContent = rejected;
    if (statPen) statPen.textContent = pending;

    // Initial logs representation if empty
    const table = document.getElementById('transactionTableBody');
    if (table && table.children.length === 0) {
        table.innerHTML = `
            <tr class="hover:bg-slate-50 transition text-slate-800 font-mono">
                <td class="px-6 py-3 font-mono font-black text-brand-primary">registerApplicant()</td>
                <td class="px-6 py-3 font-sans">Mendaftarkan Applicant baru (KIP-2026-0003)</td>
                <td class="px-6 py-3 font-mono">5,462,891</td>
                <td class="px-6 py-3 font-mono text-brand-primary"><a href="https://sepolia.etherscan.io" target="_blank" class="hover:underline">0x8fa1df0bc9d3e8eef8afefb738de92bc879a8fc4</a></td>
            </tr>
            <tr class="hover:bg-slate-50 transition text-slate-800 font-mono">
                <td class="px-6 py-3 font-mono font-black text-brand-primary">announceResult()</td>
                <td class="px-6 py-3 font-sans">Keputusan kelulusan diumumkan: Ditolak (KIP-2026-0002)</td>
                <td class="px-6 py-3 font-mono">5,462,884</td>
                <td class="px-6 py-3 font-mono text-brand-primary"><a href="https://sepolia.etherscan.io" target="_blank" class="hover:underline">0x91bc8600d8cb2dcd75dfdfbe81efd812290af101</a></td>
            </tr>
            <tr class="hover:bg-slate-50 transition text-slate-800 font-mono">
                <td class="px-6 py-3 font-mono font-black text-brand-primary">announceResult()</td>
                <td class="px-6 py-3 font-sans">Keputusan kelulusan diumumkan: Diterima (KIP-2026-0001)</td>
                <td class="px-6 py-3 font-mono">5,462,870</td>
                <td class="px-6 py-3 font-mono text-brand-primary"><a href="https://sepolia.etherscan.io" target="_blank" class="hover:underline">0x49da9fa330a10bcfe881d89fe6ef41334ef8b7a12</a></td>
            </tr>
        `;
    }
}

// Initialize Dynamic Interactive Charts with ChartJS
function initializeCharts() {
    // 1. Ratio Doughnut Chart Setup
    const ctxRatio = document.getElementById('ratioChart').getContext('2d');
    
    const approved = applicants.filter(a => a.status === "Diterima").length;
    const rejected = applicants.filter(a => a.status === "Ditolak").length;
    const pending = applicants.filter(a => a.status === "Menunggu Penetapan").length;

    ratioChartInstance = new Chart(ctxRatio, {
        type: 'doughnut',
        data: {
            labels: ['Diterima', 'Ditolak', 'Proses'],
            datasets: [{
                data: [approved, rejected, pending],
                backgroundColor: ['#10B981', '#EF4444', '#F59E0B'],
                borderWidth: 2,
                borderColor: '#FFFFFF'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            cutout: '75%'
        }
    });

    // 2. Registration Trend Line Chart Setup (7 days back representation)
    const ctxTrend = document.getElementById('trendChart').getContext('2d');
    trendChartInstance = new Chart(ctxTrend, {
        type: 'line',
        data: {
            labels: ['19 Apr', '20 Apr', '21 Apr', '22 Apr', '23 Apr', '24 Apr', '25 Apr'],
            datasets: [{
                label: 'Total Pendaftaran',
                data: [1, 2, 2, 3, 4, 4, applicants.length],
                borderColor: '#2A68F6',
                backgroundColor: 'rgba(42, 104, 246, 0.05)',
                fill: true,
                tension: 0.4,
                borderWidth: 3,
                pointBackgroundColor: '#2A68F6',
                pointHoverRadius: 6
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: { stepSize: 1 }
                }
            }
        }
    });
}

// Live refresh Chart Data points when state modifies
function updateChartsData() {
    if (!ratioChartInstance || !trendChartInstance) return;

    const approved = applicants.filter(a => a.status === "Diterima").length;
    const rejected = applicants.filter(a => a.status === "Ditolak").length;
    const pending = applicants.filter(a => a.status === "Menunggu Penetapan").length;

    // Update Doughnut
    ratioChartInstance.data.datasets[0].data = [approved, rejected, pending];
    ratioChartInstance.update();

    // Update Line
    trendChartInstance.data.datasets[0].data[6] = applicants.length;
    trendChartInstance.update();
}
