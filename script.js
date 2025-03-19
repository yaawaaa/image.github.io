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

        // Load the model and warm it up
        const model = await mobilenet.load();
        await model.classify(tf.zeros([1, 224, 224, 3])); // Warm-up step

        result.textContent = "Analyzing image...";

        previewImage.onload = async () => {
            // Classify the image
            const predictions = await model.classify(previewImage);

            if (predictions.length > 0) {
                result.innerHTML = `
                    <strong>Prediction:</strong> ${predictions[0].className} <br>
                    <strong>Confidence:</strong> ${(predictions[0].probability * 100).toFixed(2)}%
                `;
            } else {
                result.textContent = "No prediction found.";
            }
        };
    } catch (error) {
        console.error(error);
        result.textContent = "Error loading the model.";
    }
}
