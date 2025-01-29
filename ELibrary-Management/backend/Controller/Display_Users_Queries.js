const Contact=require('../Model/Contact');

const Display_Users_Queiries = async (req, res) => {
    try {
        const contacts = await Contact.find();
        return res.status(200).json({ contacts,ok:true });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Error fetching contacts' });
    }
}

module.exports=Display_Users_Queiries;