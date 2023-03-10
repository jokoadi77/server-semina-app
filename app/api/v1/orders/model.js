const mongoose = require('mongoose');

const orderDetailSchema = new mongoose.Schema({
    ticketCategories: {
        type: {
            type: String,
            required: [true, 'Tipe tiket harus diisi'],
        },
        price: {
            type: Number,
            default: 0,
        },
    },
    sumTicket: {
        type: Number,
        required: true,
    },
});

const orderSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true,
    },
    personalDetail: { 
        firstName: {
            type: String,
            required: [true, 'Nama harus diisi'],
            minlength: 3,
            maxlength: 50,
        },
        lastName: {
            type: String,
            required: [true, 'Nama harus diisi'],
            minlength: 3,
            maxlength: 50,
        },
        email: {
            type: String,
            required: [true, 'Email harus diisi'],
            
        },
        role: {
            type: String,
            default: 'Designer',
            
        },
    },
    status: {
        type: String,
        enum: [ 'pending', 'paid'],
        default: 'pending',
    },
    totalPay: {
        type: Number,
        reqired: true,
    },
    totalOrderTicket: {
        type:Number,
        required: true,
    },
    orderItems: { orderDetailSchema},
    participant: {
        type: mongoose.Types.ObjectId,
        ref: 'Participant',
        required: true,
    },
    payment: {
        type: mongoose.Types.ObjectId,
        ref: 'Payment',
        required: true,
    },
    event: {
        type: mongoose.Types.ObjectId,
        ref: 'Event',
        required: true,
    },
    historyEvent: {
        organizer:  {
            type: mongoose.Types.ObjectId,
            ref: 'Organizer',
            required: true,
    
        },
    }

},
    { timestamps: true }
)

module.exports = mongoose.model('Order', orderSchema)