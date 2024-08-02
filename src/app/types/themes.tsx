export const lightTheme = [
    ["--base-bg", "#F5F1E1"],
    ["--base-container", "#FFF8E5"],
    ["--base-txt", "#1E1A35"],
    ["--secondary-txt", "#867D64"],
    ["--secondary-txt-lt", "#CDC7AF"],
    ["--subtle-border", "rgba(205, 199, 175, 0.15)"],
    ["--shadow", "rgba(197, 192, 172, 0.3)"]
]
  
export const darkTheme = [
    ["--base-bg", "#1C202C"],
    ["--base-container", "#2C3245"],
    ["--base-txt", "#F6F6F6"],
    ["--secondary-txt", "#616A82"],
    ["--secondary-txt-lt", "#949AAA"],
    ["--subtle-border", "rgba(76, 91, 136, 0.15)"],
    ["--shadow", "rgba(8, 13, 30, 0.2)"]
]

export function setCSSTheme(dresser: any, theme: string) {
    if (theme == "dark") {
        dresser.classList.add("dark-theme");
        darkTheme.forEach(item => {
            document.documentElement.style.setProperty(item[0], item[1]); 
        });

    } else {
        dresser.classList.add("light-theme");
        lightTheme.forEach(item => {
            document.documentElement.style.setProperty(item[0], item[1]); 
        });        
    }
}

export function setCSSAccent(accent: string, color: string) {
  document.documentElement.style.setProperty(('--' + accent), color);
  document.documentElement.style.setProperty(('--' + accent + '-lt'), color.split("%")[0] + "%");
  document.documentElement.style.setProperty(('--' + accent + '-dk'), color.split(",")[0]);

}