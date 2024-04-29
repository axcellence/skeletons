/**
 * @typedef {Object} Options
 * @property {element} target - Target to render the skeleton
 * @property {number} minLineHeight - Minimum line height of the text in pixels
 */

export class Skeleton {
  /**
   * Creates an instance of Skeleton.
   * @param {Options} options - Options to render the skeleton
   */
  constructor(options) {
    /**
     * @type {element}
     */
    this.target = options.target;

    /**
     * @type {boolean}
     * @description - Check if the target has image
     * @default false
     */
    this.hasImage = this.target.hasAttribute("data-skeleton-image");

    /**
     * @type {boolean}
     * @description - Check if the target has text
     * @default false
     */
    this.hasText = this.target.hasAttribute("data-skeleton-text");

    /**
     * @type {boolean}
     * @description - Check if the target has bar chart
     * @default false
     */
    this.hasBarChart = this.target.hasAttribute("data-skeleton-bar-chart");

    /**
     * @type {number}
     * @description - Number of text lines to generate
     * @default 1
     */
    this.numberOfTextLines =
      this.target.dataset.skeletonText === ""
        ? 1
        : this.target.dataset.skeletonText;

    /**
     * @type {number}
     * @description - Number of images to generate
     * @default 1
     */
    this.numberOfImages =
      this.target.dataset.skeletonImage === ""
        ? 1
        : this.target.dataset.skeletonImage;

    /**
     * @type {string}
     * @description - Aspect ratio of the image
     * @default 3/2
     */
    this.imageAspectRatio = this.target.dataset.skeletonImageAspectRatio;

    /**
     * @type {number}
     * @description - Minimum line height of the text in pixels
     * @default 14
     */
    this.minLineHeight = options.minLineHeight;
  }

  /**
   * Generate text elements
   * @param {number} numberOfTextLines - Number of text to generate
   */
  generateText(numberOfTextLines = 1) {
    const textDiv = document.createElement("div");
    textDiv.classList.add("skeleton-text");
    textDiv.style.setProperty("--_skeleton-lines", numberOfTextLines);

    if (this.minLineHeight) {
      textDiv.style.setProperty(
        "--_skeleton-base-line-height",
        `${this.minLineHeight}px`
      );
    }
    this.target.append(textDiv);
  }

  /**
   * Generate image elements
   * @param {number} numberOfImages - Number of images to generate
   * @param {string} imageAspectRatio - Aspect ratio of the image
   */
  generateImage(numberOfImages, imageAspectRatio = "3/2") {
    Array(Number(numberOfImages))
      .fill(0)
      .forEach((_image) => {
        const imageEl = document.createElement("div");
        imageEl.classList.add("skeleton-image");
        if (numberOfImages === 1) {
          imageEl.style.setProperty(
            "--_skeleton-image-aspect",
            imageAspectRatio
          );
        }

        this.target.append(imageEl);
      });
    if (numberOfImages > 1) {
      this.target.classList.add("skeleton-images");
      this.target.style.setProperty(
        "--_skeleton-image-aspect",
        imageAspectRatio
      );
      this.target.style.setProperty("--_skeleton-images", numberOfImages);
    }
  }

  /**
   * Generate chart elements
   */
  generateBarChart() {
    const chartEl = document.createElement("div");
    chartEl.classList.add("skeleton-bar-chart");
    Array(Number(8))
      .fill(0)
      .forEach((_item) => {
        const chartElItem = document.createElement("div");
        chartElItem.classList.add("skeleton-bar-chart-item");
        chartElItem.style.setProperty(
          "--_skeleton-bar-chart-height",
          `${Math.floor(Math.random() * 100)}%`
        );
        chartEl.append(chartElItem);
      });

    this.target.append(chartEl);
  }

  /**
   * Clear the skeleton
   */
  clear() {
    this.target.innerHTML = "";
    this.target.classList.remove("skeleton-loaded");
  }

  /**
   * Make sure to call this method after setting the options
   * @returns {void}
   */
  render() {
    this.clear();

    if (this.hasText) {
      this.generateText(this.numberOfTextLines);
    }
    if (this.hasImage) {
      this.generateImage(this.numberOfImages, this.imageAspectRatio);
    }

    if (this.hasBarChart) {
      this.generateBarChart();
    }

    this.target.classList.add("skeleton-loaded");
  }
}
