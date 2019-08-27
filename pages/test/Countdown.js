export const TRAINING_MODE_READ = "read";
export const TRAINING_MODE_WRITE = "write";

const Preparation = ({ currentTime, mode }) => {
  switch (currentTime) {
    case -3:
      switch (mode) {
        case TRAINING_MODE_READ:
          return "Use keys '-' and '.' to write";
        case TRAINING_MODE_WRITE:
          return "Use the usual letter keys for translating the morse";
        default:
          return null;
      }
    case -2:
      return "Ready...";

    case -1:
      return "Steady...";

    case 0:
      return "Go!";

    default:
      return null;
  }
};

export default Preparation;
