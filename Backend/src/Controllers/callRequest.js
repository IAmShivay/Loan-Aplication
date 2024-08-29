const CallRequest = require('../Models/callRequest');

// Create a new call request
exports.createCallRequest = async (req, res) => {
  try {
    const newCallRequest = new CallRequest(req.body);
    const savedCallRequest = await newCallRequest.save();
    res.status(201).json(savedCallRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get all call requests
exports.getAllCallRequests = async (req, res) => {
  try {
    const callRequests = await CallRequest.find().populate('user assignedAgent', 'name email');
    res.status(200).json(callRequests);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get a single call request by ID
exports.getCallRequestById = async (req, res) => {
  try {
    const callRequest = await CallRequest.findById(req.params.id).populate('user assignedAgent', 'name email');
    if (!callRequest) {
      return res.status(404).json({ error: 'Call request not found' });
    }
    res.status(200).json(callRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a call request by ID
exports.updateCallRequest = async (req, res) => {
  try {
    const updatedCallRequest = await CallRequest.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCallRequest) {
      return res.status(404).json({ error: 'Call request not found' });
    }
    res.status(200).json(updatedCallRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a call request by ID
exports.deleteCallRequest = async (req, res) => {
  try {
    const deletedCallRequest = await CallRequest.findByIdAndDelete(req.params.id);
    if (!deletedCallRequest) {
      return res.status(404).json({ error: 'Call request not found' });
    }
    res.status(200).json({ message: 'Call request deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
