const Laporan = require('../models/Laporan');

exports.createLaporan = async (req, res) => {
  try {
    const { nama_merk, npwpd, alamat, hasil_pemeriksaan, foto } = req.body;
    if (!nama_merk || !npwpd || !alamat || !hasil_pemeriksaan) {
      return res.status(400).json({ msg: 'Semua field wajib diisi' });
    }
    const laporan = new Laporan({
      nama_merk,
      npwpd,
      alamat,
      hasil_pemeriksaan,
      user: req.user.id,
      foto
    });
    await laporan.save();
    res.status(201).json(laporan);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getUserLaporan = async (req, res) => {
  try {
    const laporan = await Laporan.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(laporan);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getAllLaporan = async (req, res) => {
  try {
    const laporan = await Laporan.find().populate('user', 'nama username jabatan').sort({ createdAt: -1 });
    res.json(laporan);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.getLaporanById = async (req, res) => {
  try {
    const laporan = await Laporan.findById(req.params.id).populate('user', 'nama username jabatan');
    if (!laporan) return res.status(404).json({ msg: 'Laporan tidak ditemukan' });
    res.json(laporan);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

exports.updateStatusLaporan = async (req, res) => {
  try {
    const { status } = req.body;
    if (!['Belum Dicek', 'Disetujui', 'Ditolak'].includes(status)) {
      return res.status(400).json({ msg: 'Status tidak valid' });
    }
    const laporan = await Laporan.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );
    if (!laporan) return res.status(404).json({ msg: 'Laporan tidak ditemukan' });
    res.json(laporan);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
}; 