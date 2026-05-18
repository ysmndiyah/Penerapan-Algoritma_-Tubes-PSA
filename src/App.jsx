import { useState } from "react";
import { motion } from "framer-motion";


import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

function App() {
  const [totalBelanja, setTotalBelanja] = useState("");
  const [uangBayar, setUangBayar] = useState("");
  const [hasil, setHasil] = useState([]);
  const [langkah, setLangkah] = useState([]); 
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [kembalian, setKembalian] = useState(0);

  const chartData = hasil.map((item) => ({
  name: `Rp${item.nominal / 1000}K`,
  jumlah: item.jumlah,
}));

  const hitungGreedy = () => {
    const total = parseInt(totalBelanja);
    const bayar = parseInt(uangBayar);

    if (bayar < total) {
      alert("Uang bayar tidak cukup!");
      return;
    }

    let sisa = bayar - total;

    setKembalian(sisa);

    const pecahan = [
      100000,
      50000,
      20000,
      10000,
      5000,
      2000,
      1000,
    ];

    let result = [];
    let stepList = [];

    for (let i = 0; i < pecahan.length; i++) {
      let jumlah = Math.floor(sisa / pecahan[i]);

      if (jumlah > 0) {

      stepList.push({
      ambil: pecahan[i],
      jumlah: jumlah,
      sisaSebelum: sisa,
      sisaSesudah: sisa % pecahan[i],
  });

  result.push({
    nominal: pecahan[i],
    jumlah: jumlah,
  });

  sisa = sisa % pecahan[i];
}
}

    setHasil(result);
    setLangkah(stepList);
    setHistory((prev) => [
      {
        total,
        bayar,
        kembali: bayar - total,
        waktu: new Date().toLocaleTimeString(),
      },
      ...prev,
    ]);
  };

const products = [
  { nama: "Indomie Goreng", harga: 3500 },
  { nama: "Indomie Soto", harga: 3200 },
  { nama: "Indomilk", harga: 6000 },
  { nama: "Ultra Milk", harga: 7000 },
  { nama: "Teh Botol", harga: 5000 },
  { nama: "Aqua", harga: 4000 },
  { nama: "Pocari Sweat", harga: 9000 },
  { nama: "Mie Sedaap", harga: 3000 },
  { nama: "Beras Ramos", harga: 68000 },
  { nama: "Gula Pasir", harga: 15000 },
];

const filteredProducts = products.filter((product) =>
  product.nama.toLowerCase().includes(search.toLowerCase())
);

const bubbleSortHarga = () => {

  let arr = [...products];

  for (let i = 0; i < arr.length; i++) {

    for (let j = 0; j < arr.length - i - 1; j++) {

      if (arr[j].harga > arr[j + 1].harga) {

        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;

      }

    }

  }

  setSortedProducts(arr);
};

  return (
   <div className="min-h-screen bg-zinc-950 text-white overflow-hidden">
      
      {/* Background Glow */}
      <div className="absolute top-0 left-0 pointer-events-none w-72 h-72 bg-emerald-500/20 blur-3xl rounded-full" />
      <div className="absolute bottom-0 right-0 pointer-events-none w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full" />

      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-10 py-6 border-b border-white/10">
        <h1 className="text-2xl font-bold">
          WarungPOS Greedy
        </h1>

        <div className="px-4 py-2 rounded-xl bg-emerald-500/20 border border-emerald-400/30 text-emerald-300">
          PSA Project
        </div>
      </nav>

      {/* Hero */}
      <motion.section
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center py-20 px-6"
      >
      <h1 className="text-5xl md:text-7xl font-black leading-tight">
        WarungPOS
        <span className="block text-emerald-400">
          Algorithm Simulator
        </span>
      </h1>

      <p className="mt-6 text-zinc-400 max-w-2xl mx-auto text-lg">
        Menentukan kombinasi pecahan uang paling efisien
        menggunakan strategi greedy algorithm.
      </p>
    </motion.section>

{/* Statistics */}
<section className="relative z-10 max-w-6xl mx-auto px-6 mb-10">
  
  <div className="grid grid-cols-1 md:grid-cols-4 gap-5">

    {/* Card 1 */}
    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
      <p className="text-zinc-400 mb-2">
        Total Kembalian
      </p>

      <h2 className="text-3xl font-black text-emerald-400">
        Rp{kembalian.toLocaleString("id-ID")}
      </h2>
    </div>

    {/* Card 2 */}
    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
      <p className="text-zinc-400 mb-2">
        Total Pecahan
      </p>

      <h2 className="text-3xl font-black text-cyan-400">
        {hasil.length}
      </h2>
    </div>

    {/* Card 3 */}
    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
      <p className="text-zinc-400 mb-2">
        Langkah Greedy
      </p>

      <h2 className="text-3xl font-black text-purple-400">
        {langkah.length}
      </h2>
    </div>

    {/* Card 4 */}
    <div className="p-6 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
      <p className="text-zinc-400 mb-2">
        Kompleksitas
      </p>

      <h2 className="text-3xl font-black text-yellow-400">
        O(n)
      </h2>
    </div>

  </div>
</section>


{/* Searching Produk */}
<section className="relative z-10 max-w-6xl mx-auto px-6 mb-10">

  <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">
    
    <h2 className="text-3xl font-bold mb-6">
      Searching Produk
    </h2>

    <p className="text-zinc-400 mb-6">
      Implementasi Linear Search 
    </p>

    {/* Input Search */}
    <input
      type="text"
      placeholder="Cari produk..."
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="w-full p-4 rounded-2xl bg-zinc-900 border border-white/10 outline-none focus:border-cyan-400"
    />

    {/* Statistik */}
    <div className="mt-5 p-4 rounded-2xl bg-cyan-500/10 border border-cyan-400/20">
      <p className="text-cyan-300 font-semibold">
        Produk ditemukan: {filteredProducts.length}
      </p>
    </div>

    {/* Result */}
    <div className="mt-6 grid gap-4">

      {filteredProducts.map((product, index) => (
        <div
          key={index}
          className="p-5 rounded-2xl bg-white/5 border border-white/10"
        >
          <h3 className="text-xl font-bold">
            {product.nama}
          </h3>

        </div>
      ))}

      {search && filteredProducts.length === 0 && (
        <div className="p-5 rounded-2xl bg-red-500/10 border border-red-400/20">
          <p className="text-red-300 font-semibold">
            Produk tidak ditemukan
          </p>
        </div>
      )}

    </div>
  </div>
</section>

{/* Sorting Produk */}
<section className="relative z-10 max-w-6xl mx-auto px-6 mb-10">

  <div className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl">

    <div className="flex items-center justify-between flex-wrap gap-4 mb-6">

      <div>
        <h2 className="text-3xl font-bold">
          Sorting Produk
        </h2>

        <p className="text-zinc-400 mt-2">
          Implementasi Bubble Sort
        </p>
      </div>

      <button
        onClick={bubbleSortHarga}
        className="px-6 py-3 rounded-2xl bg-purple-500 hover:bg-purple-400 transition-all duration-300 font-bold"
      >
        Sort Harga
      </button>

    </div>

    <div className="grid gap-4">

      {sortedProducts.map((product, index) => (
        <div
          key={index}
          className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-between"
        >
          <div>
            <h3 className="text-xl font-bold">
              {product.nama}
            </h3>

            <p className="text-zinc-400 mt-2">
              Bubble Sort
            </p>
          </div>

          <h3 className="text-2xl font-black text-purple-400">
            Rp{product.harga.toLocaleString("id-ID")}
          </h3>
        </div>
      ))}

    </div>

  </div>
</section>

      {/* Main Card */}
      <section className="relative z-10 max-w-4xl mx-auto px-6 pb-20">
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl"
        >
          
          <h2 className="text-3xl font-bold mb-8">
            Simulasi Kembalian
          </h2>
        
          {/* Input */}
          <div className="grid md:grid-cols-2 gap-6">
            
            <div>
              <label className="block mb-3 text-zinc-300">
                Total Belanja
              </label>

              <input
                type="number"
                placeholder="Masukkan total belanja"
                value={totalBelanja}
                onChange={(e) => setTotalBelanja(e.target.value)}
                className="w-full p-4 rounded-2xl bg-zinc-900 border border-white/10 outline-none focus:border-emerald-400"
              />
            </div>

            <div>
              <label className="block mb-3 text-zinc-300">
                Uang Bayar
              </label>

              <input
                type="number"
                placeholder="Masukkan uang bayar"
                value={uangBayar}
                onChange={(e) => setUangBayar(e.target.value)}
                className="w-full p-4 rounded-2xl bg-zinc-900 border border-white/10 outline-none focus:border-emerald-400"
              />
            </div>
          </div>

          {/* Button */}
          <button
            onClick={hitungGreedy}
            className="mt-8 w-full py-4 rounded-2xl bg-emerald-500 hover:bg-emerald-400 transition-all duration-300 font-bold text-lg"
          >
            Hitung Kembalian
          </button>

          {/* Result */}
          {hasil.length > 0 && (
            <div className="mt-10">
              
              <div className="p-6 rounded-2xl bg-emerald-500/10 border border-emerald-400/20 mb-6">
                <h3 className="text-xl font-bold text-emerald-300">
                  Total Kembalian
                </h3>

                <p className="text-4xl font-black mt-3">
                  Rp{kembalian.toLocaleString("id-ID")}
                </p>
              </div>

              <div className="grid gap-4">
                {hasil.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-5 rounded-2xl bg-white/5 border border-white/10"
                  >
                    <div>
                      <p className="text-zinc-400">
                        Pecahan
                      </p>

                      <h4 className="text-2xl font-bold">
                        Rp{item.nominal.toLocaleString("id-ID")}
                      </h4>
                    </div>

                    <div className="text-right">
                      <p className="text-zinc-400">
                        Jumlah
                      </p>

                      <h4 className="text-3xl font-black text-emerald-400">
                        x{item.jumlah}
                      </h4>
                    </div>
                  </div>
                ))}
              </div>

{/* Langkah Greedy */}
<div className="mt-8">
  
  <h3 className="text-2xl font-bold mb-5">
    Langkah Algoritma Greedy
  </h3>

  <div className="space-y-4">
    {langkah.map((step, index) => (
      <div
        key={index}
        className="p-5 rounded-2xl bg-white/5 border border-white/10"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          
          <div>
            <p className="text-zinc-400">
              Langkah {index + 1}
            </p>

            <h4 className="text-2xl font-bold text-emerald-400">
              Ambil Rp{step.ambil.toLocaleString("id-ID")}
            </h4>
          </div>

          <div className="text-right">
            <p className="text-zinc-400">
              Sisa Kembalian
            </p>

            <h4 className="text-xl font-bold">
              Rp{step.sisaSesudah.toLocaleString("id-ID")}
            </h4>
          </div>

        </div>
      </div>
    ))}
  </div>
</div>

{/* Chart Visualization */}
<div className="mt-10 p-6 rounded-3xl bg-white/5 border border-white/10">

  <h3 className="text-2xl font-bold mb-6">
    Visualisasi Pecahan Uang
  </h3>

  <div className="h-80">
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={chartData}>
        
        <XAxis dataKey="name" stroke="#a1a1aa" />
        <YAxis stroke="#a1a1aa" />

        <Tooltip />

        <Bar
          dataKey="jumlah"
          radius={[10, 10, 0, 0]}
        />
      </BarChart>
    </ResponsiveContainer>
  </div>
</div>

{/* History */}
<div className="mt-10">
  
  <h3 className="text-2xl font-bold mb-5">
    Riwayat Simulasi
  </h3>

  <div className="space-y-4">
    
    {history.map((item, index) => (
      <div
        key={index}
        className="p-5 rounded-2xl bg-white/5 border border-white/10"
      >
        <div className="flex items-center justify-between flex-wrap gap-4">
          
          <div>
            <p className="text-zinc-400">
              Transaksi #{history.length - index}
            </p>

            <h4 className="text-xl font-bold">
              Rp{item.total.toLocaleString("id-ID")}
            </h4>
          </div>

          <div>
            <p className="text-zinc-400">
              Bayar
            </p>

            <h4 className="font-bold text-cyan-400">
              Rp{item.bayar.toLocaleString("id-ID")}
            </h4>
          </div>

          <div>
            <p className="text-zinc-400">
              Kembalian
            </p>

            <h4 className="font-bold text-emerald-400">
              Rp{item.kembali.toLocaleString("id-ID")}
            </h4>
          </div>

          <div>
            <p className="text-zinc-400">
              Waktu
            </p>

            <h4 className="font-bold">
              {item.waktu}
            </h4>
          </div>

        </div>
      </div>
    ))}

  </div>
</div>


              {/* Complexity */}
              <div className="mt-8 p-6 rounded-2xl bg-cyan-500/10 border border-cyan-400/20">
                <h3 className="text-xl font-bold text-cyan-300 mb-3">
                  Kompleksitas Algoritma
                </h3>

                <div className="text-4xl font-black">
                  O(n)
                </div>

                <p className="mt-3 text-zinc-400">
                  Algoritma hanya melakukan iterasi pada
                  daftar pecahan uang.
                </p>
              </div>
            </div>
          )}

        
            </motion.div>
    </section>
  </div>
);
}

export default App;