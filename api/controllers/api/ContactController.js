module.exports = {

  create: async (req, res) => {
    try {
      const { name, email, phone, content } = req.body;
      await Contact.create({ name, email, phone, content, success: true });

      req.flash('form', 'success');
      res.redirect('/contact');
    } catch (e) {
      res.serverError(e);
    }
  },
}
