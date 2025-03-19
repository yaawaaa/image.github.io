// script.js
async function recognizeImage() {
    const input = document.getElementById('imageInput');
    const result = document.getElementById('result');
    const previewImage = document.getElementById('previewImage');

    if (input.files.length === 0) {
        result.textContent = "Please upload an image.";
        return;
    }

    const file = input.files[0];
    const imgURL = URL.createObjectURL(file);

    // Display the image
    previewImage.src = imgURL;

    try {
        result.textContent = "Loading model...";

        // Load the MobileNet model
        const model = await mobilenet.load();
        result.textContent = "Analyzing image...";

        // Wait for the image to load before processing
        previewImage.onload = async () => {
            // Make a prediction
            const predictions = await model.classify(previewImage);

            // Display the top prediction
            if (predictions.length > 0) {
                result.textContent = `Prediction: ${predictions[0].className} 
                (Confidence: ${(predictions[0].probability * 100).toFixed(2)}%)`;
            } else {
                result.textContent = "No prediction found.";
            }
        };
    } catch (error) {
        console.error(error);
        result.textContent = "Error loading the model.";
    }
}
