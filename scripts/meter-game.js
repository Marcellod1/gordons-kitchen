class MeterGame{
    /* Constructor */
    constructor(meterStartOffset, meterEndOffset, rate, acceptRegionSize) {
        this.startOffset = meterStartOffset;
        this.endOffset = meterEndOffset;
        this.offsetRate = rate;
        this.regionSize = acceptRegionSize;

        this.acceptanceRegion = []

        this.currOffset = meterStartOffset;
        this.isPlaying = true;
        this.randomizeAcceptanceRegion();
    }

    /* Increments the "meter-indicator" position each time this is called 
     * Returns the updated offset for the indicator
     */
    update(){
        if(!this.isPlaying){
            return;
        }
        var updateMeterOffset =  this.currOffset + this.offsetRate;

        if(updateMeterOffset > this.endOffset){
            updateMeterOffset = this.endOffset;
        }

        this.currOffset = updateMeterOffset;
        return updateMeterOffset;
    }

    /* Stops the animation. Each subsequent call of this.update() will have no effect */
    stop(){
        this.isPlaying = false;
    }

    /* Starts the animation. Each subsequent call of this.update() will update the animation */
    start(){
        this.isPlaying = true;
    }

    /* Resets the "meter-indicator" position to the starting offset for the animation */
    reset(){
        this.currOffset = this.startOffset;
        this.isPlaying = true;
        this.randomizeAcceptanceRegion();
    }

    /* Randomizes the acceptance region offsets */
    randomizeAcceptanceRegion(){
        const min = this.startOffset + this.meterLength * 0.25;
        const max = this.endOffset - this.regionSize;
        const regionStart = Math.floor(Math.random() * (max - min) + min);

        this.acceptanceRegion = [regionStart, regionStart + this.regionSize];
    }

    /* checks if the currOffset for the indicator is within the acceptance region */
    detectWin(){
        if(this.currOffset <= this.acceptanceRegion[1] &&
           this.currOffset >= this.acceptanceRegion[0])
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    detectEnd(){
        return this.currOffset >= this.endOffset;
    }

    /* calculate the meter's total length and return it as an absolute value */
    get meterLength(){
        return Math.abs(this.endOffset - this.startOffset);
    }
}