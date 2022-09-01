const Message = require('../models/messageModel')


// @desc new Message
// @params POST /api/v1/messages/
// @access PUBLIC

exports.newMessage = async (req,res) =>{
    try {
        const {name, email, subject, message} = req.body
        const newMessage = await Message.create({
            name, email, subject, message, date: Date()})
        res.json(newMessage)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}

// @desc get Message list
// @params GET /api/v1/messages/
// @access PRIVATE admin

exports.getMessages = async (req,res) =>{
    try {
        const messageList = await Message.find()
        res.json(messageList)
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}

// @desc delete Message by ID
// @params DELETE /api/v1/messages/:id
// @access PRIVATE admin

exports.deleteMessage = async (req,res) =>{
    try {
        await Message.findByIdAndDelete(req.params.id)
        res.json({success:true})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}

// @desc update Message by ID
// @params PUT /api/v1/messages/:id
// @access PRIVATE admin

exports.updateMessage = async (req,res) =>{
    try {
        await Message.findByIdAndUpdate(req.params.id,{...req.body})
        res.json({success:true})
    } catch (error) {
        console.log(error)
        res.status(500).json({msg:'something went wrong'})
    }
}