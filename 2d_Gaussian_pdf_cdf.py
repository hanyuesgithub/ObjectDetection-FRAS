# import scipy.stats as stats
# import numpy as np

# def calculate_2d_cdf_value(x_interval, y_interval, x, y):
#     """
#     计算给定区间和特定值的二维高斯分布 CDF 值。
    
#     参数:
#     x_interval (tuple): 包含两个元素的元组，表示 x 变量的区间 (min, max)。
#     y_interval (tuple): 包含两个元素的元组，表示 y 变量的区间 (min, max)。
#     x (float): 需要计算 CDF 值的 x 特定值。
#     y (float): 需要计算 CDF 值的 y 特定值。
    
#     返回:
#     float: 特定值 (x, y) 对应的 CDF 值。
#     """
#     # 确定区间的起始和结束值
#     min_x, max_x = x_interval
#     min_y, max_y = y_interval
    
#     # 计算均值和标准差
#     mu_x = (min_x + max_x) / 2
#     sigma_x = (max_x - min_x) / 6
#     mu_y = (min_y + max_y) / 2
#     sigma_y = (max_y - min_y) / 6
    
#     # 创建二维高斯分布
#     rv = stats.multivariate_normal(mean=[mu_x, mu_y], cov=[[sigma_x**2, 0], [0, sigma_y**2]])
    
#     # 计算 (x, y) 对应的 CDF 值
#     cdf_value = rv.cdf([x, y])
    
#     return cdf_value

# # 示例使用
# x_interval = (0, 40000)
# y_interval = (0, 10)
# x = 10000
# y = 4
# cdf_value = calculate_2d_cdf_value(x_interval, y_interval, x, y)
# print(f"The CDF value of (x={x}, y={y}) in the intervals {x_interval} and {y_interval} is: {cdf_value:.4f}")


import scipy.stats as stats
import numpy as np

def calculate_2d_cdf_value(x_interval, y_interval, x, y):
    """
    计算给定区间和特定值的二维高斯分布 CDF 值。
    1
    参数:
    x_interval (tuple): 包含两个元素的元组，表示 x 变量的区间 (min, max)。
    y_interval (tuple): 包含两个元素的元组，表示 y 变量的区间 (min, max)。
    x (float): 需要计算 CDF 值的 x 特定值。
    y (float): 需要计算 CDF 值的 y 特定值。
    
    返回:
    float: 特定值 (x, y) 对应的 CDF 值。
    """
    # 确定区间的起始和结束值
    min_x, max_x = x_interval
    min_y, max_y = y_interval
    
    # 计算均值和标准差
    mu_x = (min_x + max_x) / 2
    sigma_x = (max_x - min_x) / 6
    mu_y = (min_y + max_y) / 2
    sigma_y = (max_y - min_y) / 6
    
    # 创建二维高斯分布
    rv = stats.multivariate_normal(mean=[mu_x, mu_y], cov=[[sigma_x**2, 0], [0, sigma_y**2]])
    
    # 计算 (x, y) 对应的 CDF 值
    cdf_value = rv.cdf([x, y])
    
    return cdf_value

# 示例使用
x_interval = (750, 3000)
y_interval = (2, 6)
x = 1750
y = 4
cdf_value = calculate_2d_cdf_value(x_interval, y_interval, x, y)
print(f"The CDF value of (x={x}, y={y}) in the intervals {x_interval} and {y_interval} is: {cdf_value:.8f}")
