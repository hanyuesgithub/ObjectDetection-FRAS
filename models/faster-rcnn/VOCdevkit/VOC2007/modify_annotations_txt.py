# import glob
# import string  

# txt_list = glob.glob('./label_2/*.txt')

# def show_category(txt_list):
#     category_list = []
#     for item in txt_list:
#         try:
#             with open(item) as tdf:
#                 for each_line in tdf:
#                     labeldata = each_line.strip().split(' ')
#                     category_list.append(labeldata[0])
#         except IOError as ioerr:
#             print('File error:' + str(ioerr))
#     print(set(category_list))

# def merge(line):
#     each_line = ' '.join(line) + '\n'
#     return each_line

# print('before modify categories are:\n')
# show_category(txt_list)

# for item in txt_list:
#     new_txt = []
#     try:
#         with open(item, 'r') as r_tdf:
#             for each_line in r_tdf:
#                 labeldata = each_line.strip().split(' ')
#                 if labeldata[0] in ['Pedestrian', 'Person_sitting', 'Cyclist']:
#                     labeldata[0] = 'person'
#                 elif labeldata[0] in ['Tram', 'Misc', 'DontCare']:
#                     continue
#                 new_txt.append(labeldata)
#         with open(item, 'w+') as w_tdf:
#             for temp in new_txt:
#                 w_tdf.write(merge(temp))
#     except IOError as ioerr:
#         print('File error:' + str(ioerr))

# print('\nafter modify categories are:\n')
# show_category(txt_list)



import glob
import string  

txt_list = glob.glob('./label_2/*.txt')  

def show_category(txt_list):
    category_list = set()
    for item in txt_list:
        try:
            with open(item) as tdf:
                for each_line in tdf:
                    labeldata = each_line.strip().split(' ')
                    category_list.add(labeldata[0])
        except IOError as ioerr:
            print('File error:' + str(ioerr))
    print(category_list)

def merge(line):
    each_line = ' '.join(line) + '\n'
    return each_line

print('before modify categories are:\n')
show_category(txt_list)

for item in txt_list:
    new_txt = []
    try:
        with open(item, 'r') as r_tdf:
            for each_line in r_tdf:
                labeldata = each_line.strip().split(' ')
                if labeldata[0] in ['Person_sitting', 'Cyclist', 'Pedestrian']:
                    labeldata[0] = 'person'
                if labeldata[0] in ['Car', 'Van', 'Truck']:
                    labeldata[0] = labeldata[0].lower()
                if labeldata[0] in ['Tram', 'DontCare', 'Misc']:
                    continue
                new_txt.append(labeldata)
        with open(item, 'w+') as w_tdf:
            for temp in new_txt:
                w_tdf.write(merge(temp))
    except IOError as ioerr:
        print('File error:' + str(ioerr))

print('\nafter modify categories are:\n')
show_category(txt_list)