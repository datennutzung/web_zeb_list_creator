import math

def main():
    filename = "zeus.txt"
    month_dict = {}
    skipline = ["Sa", "So", "---"]
    date_range = (3,5)
    time_range = (81,86)
    with open(filename, "r") as f:
        lines = f.readlines()
        for line in lines[8:-10]:
            if any([line.startswith(skip) for skip in skipline]):
                continue
            date = line[date_range[0]:date_range[1]]
            time_str = line[time_range[0]:time_range[1]]
            try:
                float(time_str)
                int(date)
            except:
                continue
            print(line, end="")
            hour = int(time_str[:-3])
            minute = math.ceil(int(time_str[3:])/6)/10
            time = hour + minute
            month_dict[date] = time
    for date in month_dict:
        print(date, ": ", month_dict[date], sep="")

if __name__ == "__main__":
    main()
