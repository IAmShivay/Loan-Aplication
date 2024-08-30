const CallRequest = require("../Models/callRequest");

// Create a new call request
exports.createOrUpdateCallRequest = async (req, res) => {
  try {
    const ApplicantId = req.user._id;
    const {
      bank,
      name,
      email,
      phoneNumber,
      preferredCallTime,
      reasonForCall,
      additionalNotes,
    } = req.body;

    const updatedCallRequest = await CallRequest.findOneAndUpdate(
      { ApplicantId: ApplicantId }, // Find by user ID
      {
        name,
        ApplicantId,
        bank,
        email,
        phoneNumber,
        preferredCallTime,
        reasonForCall,
        additionalNotes,
        user: ApplicantId,
      },
      {
        new: true, // Return the updated document
        upsert: true, // Create a new document if not found
        setDefaultsOnInsert: true, // Apply schema defaults if a new document is created
      }
    );

    res.status(200).json(updatedCallRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getAllCallRequests = async (req, res) => {
  try {
    // Extract the bank name from the query parameters
    const { bank } = req.query;

    // Define the query object
    const query = {};

    // If a bank name is provided, add it to the query object
    if (bank) {
      query.bankName = bank;
    }

    // Fetch call requests based on the query
    const callRequests = await CallRequest.find({ bank: bank }).lean();

    // Send the response with the fetched data
    res.status(200).json(callRequests);
  } catch (err) {
    // Handle any errors that occur during the process
    res.status(500).json({ error: err.message });
  }
};

// Get a single call request by ID
exports.getCallRequestById = async (req, res) => {
  try {
    const callRequest = await CallRequest.findById(req.params.id).populate(
      "user assignedAgent",
      "name email"
    );
    if (!callRequest) {
      return res.status(404).json({ error: "Call request not found" });
    }
    res.status(200).json(callRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update a call request by ID
exports.updateCallRequest = async (req, res) => {
  try {
    const updatedCallRequest = await CallRequest.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    if (!updatedCallRequest) {
      return res.status(404).json({ error: "Call request not found" });
    }
    res.status(200).json(updatedCallRequest);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Delete a call request by ID
exports.deleteCallRequest = async (req, res) => {
  try {
    const deletedCallRequest = await CallRequest.findByIdAndDelete(
      req.params.id
    );
    if (!deletedCallRequest) {
      return res.status(404).json({ error: "Call request not found" });
    }
    res.status(200).json({ message: "Call request deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
